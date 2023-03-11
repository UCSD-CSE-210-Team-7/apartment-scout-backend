const { client } = require('../../utils/db.js')

/**
 * Retrieve all users who are scouts in a given region
 * @param {string} region - The zipcode of the region
 * @returns {Promise<Object>} - An array of users belonging to the region
 */
async function getUsers(region){
    const query = 'SELECT email from USERRegion JOIN Users USING (email) WHERE IS_SCOUT=TRUE AND ZIPCODE=$1'
    const args =  [region]
    const res = await client.query(query, args)
    return res.rows
}

/**
 * Retrieve all regions for the scout
 * @param {string} user - The user email
 * @returns {Promise<Object>} - An array of regions for the scout
 */
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
