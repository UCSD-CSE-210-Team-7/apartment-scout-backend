const { Client } = require("pg");
const { client } = require("../../utils/db.js");
const { getLastMessage, getAllMessages, createMessage } = require("./index");

describe("Messages route", function () {
  let mockClient;

  // Set up a mock client and a temporary table before running the tests
  beforeAll(async () => {
    // Create a new pool with a connection limit of 1
    mockClient = new Client({
      host: "localhost",
      port: 5432,
      database: "apartment_scout_db",
      user: "admin",
      password: "admin",
      max: 1, // Reuse the connection to make sure we always hit the same temporal schema
      idleTimeoutMillis: 0, // Disable auto-disconnection of idle clients to make sure we always hit the same temporal schema
    });

    await mockClient.connect();
    // Mock the query function to always return a connection from the pool we just created
    client.query = (query) => {
      return mockClient.query(query);
    };
    client.query = (query, args) => {
      return mockClient.query(query, args);
    };
  });

  // Set up a temporary table and insert fake data before each test
  beforeEach(async () => {
    await client.query("DROP TABLE IF EXISTS pg_temp.messages");
    await client.query(
      "CREATE TEMPORARY TABLE messages (LIKE messages INCLUDING ALL)"
    ); // This will copy constraints also

    // Insert fake data
    const messageInsertQuery =
      "INSERT INTO Messages (msg_text, sender, conversation_id) VALUES ('hello', 'person_a', 12) RETURNING *";
    const _ = await client.query(messageInsertQuery);
  });

  // Drop the temporary table after each test
  afterEach(async () => {
    await client.query("DROP TABLE IF EXISTS pg_temp.messages");
  });

  // Close the mock client after all tests have run
  afterAll(async () => {
    return mockClient.end();
  });

  it("Create message", async function () {
    const message = await createMessage({
      msg_text: "Hello Ajinkya",
      sender: "Joe",
      conversation: 123,
    });
    expect(message).not.toBe(null);
    expect(message.msg_text).toBe("Hello Ajinkya");
    expect(message.sender).toBe("Joe");
    expect(message.conversation_id).toBe(123);
  });

  it("Get all messages", async function () {
    const messages = await getAllMessages(12);
    expect(messages).not.toBe(null);
    expect(messages).toHaveLength(1);
  });

  it("Get last message", async function () {
    const messageInsertQuery =
      "INSERT INTO Messages (msg_text, sender, conversation_id) VALUES ('hi', 'person_a', 12) RETURNING *";
    const _ = await client.query(messageInsertQuery);
    const message = await getLastMessage(12);
    expect(message).not.toBe(null);
    expect(message.msg_text).toBe("hi");
    expect(message.sender).toBe("person_a");
  });
});
