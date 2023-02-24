const { client } = require('../../utils/db.js')

async function getLastMessage(conversation){
    const query = `SELECT * FROM Messages WHERE conversation_id=$1 ORDER BY msg_time DESC LIMIT 1`
    const args = [conversation]
    const res = await client.query(query, args)
    return res.rows[0]
}

async function getAllMessages(conversation){
    const query = `SELECT * FROM Messages WHERE conversation_id=$1`
    const args = [conversation]
    const res = await client.query(query, args)
    return res.rows
}

async function createMessage({msg_text, sender, conversation}){
    const userInsert = `INSERT INTO Messages (msg_text, sender, conversation_id) VALUES ($1, $2, $3) RETURNING *`
    const userArgs =  [msg_text, sender, conversation]
    const res = await client.query(userInsert, userArgs)
    return res.rows[0]
}

module.exports = {
    getAllMessages,
    getLastMessage,
    createMessage,
}
