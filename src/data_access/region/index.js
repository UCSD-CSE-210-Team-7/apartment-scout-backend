const { client } = require('../../utils/db.js')

async function getUsers(region){
    const query = 'SELECT email from USERRegion JOIN Users USING (email) WHERE IS_SCOUT=TRUE AND ZIPCODE=$1'
    const args =  [region]
    const res = await client.query(query, args)
    return res.rows
}

async function getRegions(user){
    const query = 'SELECT zipcode from UserRegion JOIN Users USING (email) WHERE IS_SCOUT=TRUE AND email=$1'
    const args =  [user]
    const res = await client.query(query, args)
    return res.rows
}

module.exports = {
    getUsers,
    getRegions,
}
