const { client } = require('../../utils/db.js')

async function getConversationById(conversation){
    const query = 'SELECT * FROM Conversations WHERE conversation_id=$1'
    const args =  [conversation]
    const res = await client.query(query, args)
    return res.rows[0]
}

async function getConversations(user){
    const query = 'SELECT * FROM Conversations WHERE person_a=$1 UNION SELECT * FROM Conversations WHERE person_b=$1'
    const args =  [user]
    const res = await client.query(query, args)
    return res.rows
}

async function createConversation({person_a, person_b}){
    const userInsert = `INSERT INTO Conversations(person_a, person_b) VALUES ($1, $2) RETURNING *`
    const userArgs =  [person_a, person_b]
    const res = await client.query(userInsert, userArgs)
    return res.rows[0]
}

module.exports = {
    getConversations,
    getConversationById,
    createConversation,
}
