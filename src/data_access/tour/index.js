const { client } = require("../../utils/db.js");

/**
 * Returns an array of tours based on the user type and email
 *
 * @param {string} type - The type of user ('requester' or 'scout')
 * @param {string} user - The user to retrieve tours for
 * @returns {Array} - An array of tour objects
 */
async function getToursByUser({ type, user }) {
  const query = `SELECT * FROM Tours WHERE ${
    type == "requester" ? "requested_by" : "scouted_by"
  }=$1 `;
  const args = [user];
  const res = await client.query(query, args);
  return res.rows;
}

/**
 * Returns a single tour object based on the tour_id
 *
 * @param {string} tour_id - The ID of the tour to retrieve
 * @returns {Promise<Object>} - The tour object
 */
async function getTourById({ tour_id }) {
  const query = `SELECT * FROM Tours WHERE tour_id=$1`;
  const args = [tour_id];
  const res = await client.query(query, args);
  return res.rows[0];
}
/**
 * Returns an array of tours based on the user type and email and status
 *
 * @param {string} type - The type of user ('requester' or 'scout')
 * @param {string} user - The user to retrieve tours for
 * @param {string} status - The status of the tour ('COMPLETE' or 'PLANNED')
 * @returns {Array} - An array of tour objects
 */
async function getToursByUserAndStatus({role, user, status}){
    const query = `SELECT * FROM Tours WHERE ${role == 'requester' ? 'requested_by' : 'scouted_by'}=$1 and status = $2 `
    const args = [user, status]
    const res = await client.query(query, args)
    console.log(res.rows)
    return res.rows
}

/**
 * Creates a new tour object and insert it in the databaase
 *
 * @param {string} tour_address - The address of the tour
 * @param {string} requested_by - The email address of the requester
 * @param {string} scouted_by - The email address of the scout
 * @returns {Promise<Object>} - The newly created tour object
 */
async function createTour({ tour_address, requested_by, scouted_by }) {
  const tourInsert = `INSERT INTO Tours (tour_address, requested_by, scouted_by) VALUES ($1, $2, $3) RETURNING *`;
  const tourArgs = [tour_address, requested_by, scouted_by];
  const res = await client.query(tourInsert, tourArgs);
  return res.rows[0];
}

/**
 * Updates the review text of the tour object for an apartment
 *
 * @param {string} review_text - The text of the review
 * @param {string} tour_id - The ID of the tour to insert the review for
 * @returns {Promise<Object>} - The updated tour object
 */
async function createReviewForHouse({ review_text, tour_id }) {
  const reviewInsert = `UPDATE Tours SET tour_summary = $1 WHERE tour_id = $2 RETURNING *`;
  const reviewArgs = [review_text, tour_id];
  const res = await client.query(reviewInsert, reviewArgs);
  return res.rows[0];
}

/**
 * Updates the review text and rating of the tour object for a scout
 *
 * @param {string} review_text - The text of the review
 * @param {number} rating - The rating of the review (0-5)
 * @param {string} tour_id - The ID of the tour to insert the review for
 * @returns {Promise<Object>} - The updated tour object
 */
async function createReviewForScout({ review_text, rating, tour_id }) {
  const reviewInsert = `UPDATE Tours SET tour_review_text = $1, tour_review_stars = $2 WHERE tour_id = $3 RETURNING *`;
  const reviewArgs = [review_text, rating, tour_id];
  const res = await client.query(reviewInsert, reviewArgs);
  return res.rows[0];
}

/**
 * Update a tour record in the database.
 * @param {Object} updateObject - An object containing the fields of the tour to update and their new values.
 * @returns {Promise<Object>} - A promise that resolves to the updated tour record.
 */
async function updateTour(updateObject) {
  let updateQuery = `UPDATE Tours SET `;
  let updateArgs = [];
  updateArgs.push(updateObject["tour_id"]);

  const keyMap = Object.keys(updateObject).filter((i) => i !== "tour_id");

  updateQuery += keyMap.map((key, idx) => `${key} = $${idx + 2}`).join(",");
  updateArgs.push(...keyMap.map((key) => updateObject[key]));

  updateQuery += " WHERE tour_id=$1 RETURNING *";

  const res = await client.query(updateQuery, updateArgs);
  return res.rows[0];
}

module.exports = {
    getToursByUser,
    getTourById,
    getToursByUserAndStatus,
    createTour,
    createReviewForHouse,
    createReviewForScout,
    updateTour,
}
