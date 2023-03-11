const { client } = require("../../utils/db.js");

/**
 * Retrieves all the users from the database
 * @returns {Promise<Object>} - An array of user objects
 */
async function getAllUsers() {
  const query = ` SELECT * FROM Users `;
  const res = await client.query(query);
  return res.rows;
}

/**
 * Gets user details for the specified emails from the database.
 * @param {...string} emails - The email ids of the users
 * @returns {Promise<Object>} - An array of user objects
 */
async function getUserDetails(...emails) {
  const query = "SELECT * FROM Users WHERE email = ANY ($1)";
  const args = [emails];
  const res = await client.query(query, args);
  return emails.length == 1 ? res.rows[0] : res.rows;
}

/**
 * Creates and inserts a new user in the database.
 * @param {string} email - The email ids of the user
 * @param {string} name - The name ids of the user
 * @returns {Promise<Object>} - The user object created in the database
 */
async function createUser({ email, name }) {
  const userInsert = `INSERT INTO Users (email, name) VALUES ($1, $2) RETURNING *`;
  const userArgs = [email, name];
  const user = (await client.query(userInsert, userArgs)).rows[0];
  return user;
}

/**
 * Updates an existing user in the database.
 * @param {Object} updateObject - An object representing the updates to be made to the user.
 * @returns {Promise<Object>} - The user object created in the database
 */
async function updateUser(updateObject) {
  const keyMap = Object.keys(updateObject).filter((key) => key != "regions");

  let updateQuery = `UPDATE Users SET `;
  let updateArgs = [updateObject["email"]];

  updateQuery += keyMap.map((key, idx) => `${key} = $${idx + 2}`).join(",");
  updateArgs.push(...keyMap.map((key) => updateObject[key]));

  updateQuery += " WHERE email=$1 RETURNING *";

  const user = (await client.query(updateQuery, updateArgs)).rows[0];

  try {
    await client.query("BEGIN");

    const deleteQuery = `DELETE FROM UserRegion WHERE email=$1`;
    const deleteArgs = [updateObject["email"]];
    await client.query(deleteQuery, deleteArgs);

    const regionInsert = `INSERT INTO UserRegion (email, zipcode) SELECT * FROM UNNEST ($1::text[], $2::int[]) RETURNING *`;
    const regionArgs = [
      updateObject["regions"].map((i) => updateObject["email"]),
      updateObject["regions"],
    ];
    const regionResult = (await client.query(regionInsert, regionArgs)).rows;
    user.regions = regionResult;

    await client.query("COMMIT");
  } catch (e) {
    await client.query("ROLLBACK");
  }

  return user;
}

module.exports = {
  getAllUsers,
  getUserDetails,
  createUser,
  updateUser,
};
