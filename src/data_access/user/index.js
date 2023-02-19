const { client } = require('../../utils/db.js')

async function getAllUsers(){
    const query = ` SELECT * FROM Users `
    const res = await client.query(query)
    return res.rows
}

async function getUserDetails(...emails){
    const query = 'SELECT * FROM Users WHERE email = ANY ($1)'
    const args =  [emails]
    const res = await client.query(query, args)
    return emails.length == 1 ? res.rows[0] : res.rows
}

module.exports = {
    getAllUsers,
    getUserDetails
}
