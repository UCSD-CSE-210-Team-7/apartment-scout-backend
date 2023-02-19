const { client } = require('../../utils/db.js')

async function getAllUsers(){
    const query = ` SELECT * FROM Users `
    const res = await client.query(query)
    return res.rows
}

async function getUserDetails(email){
    const query = 'SELECT * FROM Users WHERE email=$1'
    const args =  [email]
    const res = await client.query(query, args)
    return res.rows[0]
}

module.exports = {
    getAllUsers,
    getUserDetails
}
