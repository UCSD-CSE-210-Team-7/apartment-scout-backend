const { Client } = require("pg");
const { client } = require("../../utils/db.js");
const {
  getAllUsers,
  getUserDetails,
  createUser,
  updateUser,
} = require("./index");

describe("User route", function () {
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
    await client.query("DROP TABLE IF EXISTS pg_temp.users");
    await client.query("DROP TABLE IF EXISTS pg_temp.userregion");
    await client.query(
      "CREATE TEMPORARY TABLE users (LIKE users INCLUDING ALL)"
    ); // This will copy constraints also
    await client.query(
      "CREATE TEMPORARY TABLE userregion (LIKE userregion INCLUDING ALL)"
    ); // This will copy constraints also

    // Insert fake data
    const userInsertQuery =
      "INSERT INTO pg_temp.users (email, name, is_scout, calendly_link) VALUES ('test@ucsd.edu', 'Test', FALSE, NULL) RETURNING *";
    const _ = await client.query(userInsertQuery);
  });

  // Drop the temporary table after each test
  afterEach(async () => {
    await client.query("DROP TABLE IF EXISTS pg_temp.users");
    await client.query("DROP TABLE IF EXISTS pg_temp.userregion");
  });

  // Close the mock client after all tests have run
  afterAll(async () => {
    return mockClient.end();
  });

  it("Create user with the details", async function () {
    const user = await createUser({
      email: "abokade@ucsd.edu",
      name: "Ajinkya Bokade",
      calendly_link: null,
      regions: [],
    });
    const rows = await getAllUsers();
    expect(rows).toHaveLength(2);
    expect(user.email).toBe("abokade@ucsd.edu");
    expect(user.name).toBe("Ajinkya Bokade");
    expect(user.is_scout).toBe(false);
    expect(user.calendly_link).toBe(null);
    expect(user.regions).toBe(undefined);
  });

  it("Should get all users", async function () {
    const rows = await getAllUsers();
    expect(rows).toHaveLength(1);
  });

  it("Update user with the details", async function () {
    const updatedUser = await updateUser({
      email: "test@ucsd.edu",
      name: "Test Update",
      is_scout: true,
      calendly_link: "test@calendly.com",
      regions: [],
    });
    const rows = await getAllUsers();
    expect(rows).toHaveLength(1);
    expect(updatedUser.email).toBe("test@ucsd.edu");
    expect(updatedUser.name).toBe("Test Update");
    expect(updatedUser.calendly_link).toBe("test@calendly.com");
  });

  it("Update user with the details and regions", async function () {
    const updatedUser = await updateUser({
      email: "test@ucsd.edu",
      name: "Test Update",
      is_scout: true,
      calendly_link: "test@calendly.com",
      regions: [9999, 8888],
    });
    const rows = await getAllUsers();
    expect(rows).toHaveLength(1);
    expect(updatedUser.email).toBe("test@ucsd.edu");
    expect(updatedUser.name).toBe("Test Update");
    expect(updatedUser.calendly_link).toBe("test@calendly.com");
    expect(updatedUser.regions).toHaveLength(2);
  });

  it("Should get user details", async function () {
    const rows = await getUserDetails("test@ucsd.edu");
    expect(rows).not.toBe(null);
    expect(rows.email).toBe("test@ucsd.edu");
    expect(rows.name).toBe("Test");
    expect(rows.is_scout).toBe(false);
    expect(rows.calendly_link).toBe(null);
  });
});
