const { Client } = require("pg");
const { client } = require("../../utils/db.js");
const {
  getToursByUser,
  getTourById,
  createTour,
  updateTour,
} = require("./index");

describe("Tour route", function () {
  let tour_id;
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
    await client.query("DROP TABLE IF EXISTS pg_temp.tours");
    await client.query(
      "CREATE TEMPORARY TABLE tours (LIKE tours INCLUDING ALL)"
    ); // This will copy constraints also

    // Insert fake data
    const tourInsertQuery =
      "INSERT INTO pg_temp.tours (tour_address, requested_by, scouted_by) VALUES ('Gilman Dr', 'abokade@ucsd.edu', 'test@ucsd.edu') RETURNING *";
    const tour = await client.query(tourInsertQuery);
    tour_id = tour.rows[0].tour_id;
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

  it("Create tour with the details", async function () {
    const tour = await createTour({
      tour_address: "Lebon Dr",
      requested_by: "Ajinkya",
      scouted_by: "Scout123",
    });
    expect(tour).not.toBe(null);
    expect(tour.tour_address).toBe("Lebon Dr");
    expect(tour.requested_by).toBe("Ajinkya");
    expect(tour.scouted_by).toBe("Scout123");
    expect(tour.status).toBe("PLANNED");
  });

  it("Get tours by requester", async function () {
    const tour = await getToursByUser({
      type: "requester",
      user: "abokade@ucsd.edu",
    });
    expect(tour).toHaveLength(1);
    expect(tour[0]).not.toBe(null);
    expect(tour[0].tour_address).toBe("Gilman Dr");
    expect(tour[0].requested_by).toBe("abokade@ucsd.edu");
    expect(tour[0].scouted_by).toBe("test@ucsd.edu");
    expect(tour[0].status).toBe("PLANNED");
  });

  it("Get tours by scout", async function () {
    const tour = await getToursByUser({
      type: "scout",
      user: "test@ucsd.edu",
    });
    expect(tour).toHaveLength(1);
    expect(tour[0]).not.toBe(null);
    expect(tour[0].tour_address).toBe("Gilman Dr");
    expect(tour[0].requested_by).toBe("abokade@ucsd.edu");
    expect(tour[0].scouted_by).toBe("test@ucsd.edu");
    expect(tour[0].status).toBe("PLANNED");
  });

  it("Get tours by id", async function () {
    const tour = await getTourById({
      tour_id,
    });
    expect(tour).not.toBe(null);
    expect(tour.tour_address).toBe("Gilman Dr");
    expect(tour.requested_by).toBe("abokade@ucsd.edu");
    expect(tour.scouted_by).toBe("test@ucsd.edu");
    expect(tour.status).toBe("PLANNED");
  });

  it("Update tour", async function () {
    const tour = await updateTour({
      tour_id: tour_id,
      status: "COMPLETED",
      tour_summary: "tour summary",
      tour_review_text: "tour review text",
      tour_review_stars: 6,
    });
    expect(tour.status).toBe("COMPLETED");
    expect(tour.tour_summary).toBe("tour summary");
    expect(tour.tour_review_text).toBe("tour review text");
    expect(tour.tour_review_stars).toBe(6);
  });
});
