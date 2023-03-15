const { client } = require("../../utils/db.js");

/**
 * Retrieve the conversation by its id
 * @param {string} conversation - The conversation id to retrieve
 * @returns {Promise} A promise that resolves with the first row of the result set
 */
async function getConversationById(conversation) {
  const query = "SELECT * FROM Conversations WHERE conversation_id=$1";
  const args = [conversation];
  const res = await client.query(query, args);
  return res.rows[0];
}

/**
 * Retrieve conversations involving a particular user
 * @param {string} user - The user id to retrieve conversations for
 * @returns {Promise} A promise that resolves with an array of result rows
 */
async function getConversations(user) {
  const query =
    "SELECT * FROM Conversations WHERE person_a=$1 UNION SELECT * FROM Conversations WHERE person_b=$1";
  const args = [user];
  const res = await client.query(query, args);
  return res.rows;
}

/**
 * Create a new conversation between two users
 * @param {Object} conversation - An object containing the user ids of the two participants
 * @param {string} conversation.person_a - The id of the first participant
 * @param {string} conversation.person_b - The id of the second participant
 * @returns {Promise} A promise that resolves with the newly created row
 */
async function createConversation({ person_a, person_b }) {
  const userInsert = `INSERT INTO Conversations(person_a, person_b) VALUES ($1, $2) RETURNING *`;
  const userArgs = [person_a, person_b];
  const res = await client.query(userInsert, userArgs);
  return res.rows[0];
}

module.exports = {
  getConversations,
  getConversationById,
  createConversation,
};
