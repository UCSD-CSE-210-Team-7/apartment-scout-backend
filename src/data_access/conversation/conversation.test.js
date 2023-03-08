const { Client } = require("pg");
const { client } = require("../../utils/db.js");
const {
  getConversationById,
  getConversations,
  createConversation,
} = require("./index");

describe("Conversation route", function () {
  let conversation_id;
  let mockClient; 

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

    await mockClient.connect()
    // Mock the query function to always return a connection from the pool we just created
    client.query = (query) => {
      return mockClient.query(query);
    };
    client.query = (query, args) => {
      return mockClient.query(query, args);
    };
  });

  beforeEach(async () => {
    await client.query("DROP TABLE IF EXISTS pg_temp.conversations");
    await client.query(
      "CREATE TEMPORARY TABLE conversations (LIKE conversations INCLUDING ALL)"
    ); // This will copy constraints also

    // Insert fake data
    const conversationInsertQuery =
      "INSERT INTO Conversations(person_a, person_b) VALUES ('person_a', 'person_b') RETURNING *";
    const conversation = await client.query(conversationInsertQuery);
    conversation_id = conversation.rows[0].conversation_id;
  });

  afterEach(async () => {
    await client.query("DROP TABLE IF EXISTS pg_temp.conversations");
  });

  afterAll(async () => {
    return mockClient.end()
  })

  it("Insert conversation in the region", async function () {
    const conversation = await createConversation({
      person_a: "ajinkya",
      person_b: "joe",
    });
    expect(conversation).not.toBe(null);
    expect(conversation.person_a).toBe("ajinkya");
    expect(conversation.person_b).toBe("joe");
  });

  it("Get conversation by id", async function () {
    const conversation = await getConversationById(conversation_id);
    expect(conversation).not.toBe(null);
    expect(conversation.person_a).toBe("person_a");
    expect(conversation.person_b).toBe("person_b");
  });

  it("Get conversations", async function () {
    const conversationInsertQuery =
      "INSERT INTO Conversations(person_a, person_b) VALUES ('person_b', 'person_a') RETURNING *";
    const _ = await client.query(conversationInsertQuery);
    const conversations = await getConversations("person_a");
    expect(conversations).not.toBe(null);
    expect(conversations).toHaveLength(2);
  });
});
