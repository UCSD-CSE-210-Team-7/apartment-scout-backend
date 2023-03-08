const { Client } = require("pg");
const { client } = require("../../utils/db.js");
const { getUsers, getRegions } = require("./index");

describe("Region route", function () {
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
    await client.query("DROP TABLE IF EXISTS pg_temp.userregion");
    await client.query(
      "CREATE TEMPORARY TABLE userregion (LIKE userregion INCLUDING ALL)"
    ); // This will copy constraints also

    // Insert fake data
    const userRegionInsertQuery =
      "INSERT INTO pg_temp.userregion (zipcode, email) VALUES (12324, 'abokade@ucsd.edu') RETURNING *";
    const _ = await client.query(userRegionInsertQuery);
  });

  afterEach(async () => {
    await client.query("DROP TABLE IF EXISTS pg_temp.userregion");
  });

  afterAll(async () => {
    return mockClient.end()
  })

  it("Get users in the region", async function () {
    const users = await getUsers(12324);
    expect(users).not.toBe(null);
    expect(users).toHaveLength(1);
    expect(users[0].email).toBe("abokade@ucsd.edu");
  });

  it("Get regions of the users", async function () {
    const regions = await getRegions("abokade@ucsd.edu");
    // console.log(regions);
    expect(regions).not.toBe(null);
    expect(regions).toHaveLength(1);
    expect(regions[0].zipcode).toBe(12324);
  });
});
