const { client } = require('../../utils/db.js')

async function getUsers(region){
    const query = 'SELECT email FROM UserRegion WHERE region=$1'
    const args =  [region]
    const res = await client.query(query, args)
    return res.rows
}

async function getRegions(user){
    const query = 'SELECT zipcode FROM UserRegion WHERE email=$1'
    const args =  [user]
    const res = await client.query(query, args)
    return res.rows
}
module.exports = {
    getUsers,
    getRegions,
}
