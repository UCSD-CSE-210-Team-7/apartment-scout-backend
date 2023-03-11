const { client } = require("../../utils/db.js");

/**
 * Retrieves the last message in a conversation from the database
 * @param {number} conversation - The conversation ID
 * @returns {Promise<Object>} - The last message object in the conversation
 */
async function getLastMessage(conversation) {
  const query = `SELECT * FROM Messages WHERE conversation_id=$1 ORDER BY msg_time DESC, msg_id DESC LIMIT 1`;
  const args = [conversation];
  const res = await client.query(query, args);
  return res.rows[0];
}

/**
 * Retrieves all messages in a conversation from the database
 * @param {number} conversation - The conversation ID
 * @returns {Promise<Array<Object>>} - An array of message objects in the conversation
 */
async function getAllMessages(conversation) {
  const query = `SELECT * FROM Messages WHERE conversation_id=$1`;
  const args = [conversation];
  const res = await client.query(query, args);
  return res.rows;
}

/**
 * Creates a new message in a conversation and inserts it to the database
 * @param {string} msg_text - The text of the message
 * @param {number} sender - The ID of the message sender
 * @param {number} conversation - The ID of the conversation the message belongs to
 * @returns {Promise<Object>} - The newly created message object
 */
async function createMessage({ msg_text, sender, conversation }) {
  const userInsert = `INSERT INTO Messages (msg_text, sender, conversation_id) VALUES ($1, $2, $3) RETURNING *`;
  const userArgs = [msg_text, sender, conversation];
  const res = await client.query(userInsert, userArgs);
  return res.rows[0];
}

module.exports = {
  getAllMessages,
  getLastMessage,
  createMessage,
};
