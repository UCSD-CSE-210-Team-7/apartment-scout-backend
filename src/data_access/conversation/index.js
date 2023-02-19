const { client } = require('../../utils/db.js')

async function getConversations(user){
    const query = 'SELECT * FROM Conversations WHERE person_a=$1 UNION SELECT * FROM Conversations WHERE person_b=$1'
    const args =  [user]
    const res = await client.query(query, args)
    return res.rows
}

module.exports = {
    getConversations
}
