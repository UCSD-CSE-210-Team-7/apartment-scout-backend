const { Client } = require("pg");
const { client } = require("../../utils/db.js");
const { getLastMessage, getAllMessages, createMessage } = require("./index");

describe("Messages route", function () {
  let conversation_id;
  beforeAll(async () => {
    // Create a new pool with a connection limit of 1
    const mockClient = new Client({
      host: "localhost",
      port: 5432,
      database: "apartment_scout_db",
      user: "admin",
      password: "admin",
      max: 1, // Reuse the connection to make sure we always hit the same temporal schema
      idleTimeoutMillis: 0, // Disable auto-disconnection of idle clients to make sure we always hit the same temporal schema
    });

    await mockClient.connect().then(() => console.log("db connected"));
    // Mock the query function to always return a connection from the pool we just created
    client.query = (query) => {
      return mockClient.query(query);
    };
    client.query = (query, args) => {
      return mockClient.query(query, args);
    };
  });

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

  afterEach(async () => {
    await client.query("DROP TABLE IF EXISTS pg_temp.messages");
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
