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

module.exports = {
    getAllMessages,
    getLastMessage
}
