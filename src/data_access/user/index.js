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

async function createUser({email, name, is_scout, is_requester, regions = []}){
    try {
        await client.query('BEGIN')

        const userInsert = `INSERT INTO Users (email, name, is_scout, is_requester) VALUES ($1, $2, $3, $4)`
        const userArgs =  [email, name, is_scout, is_requester]
        await client.query(userInsert, userArgs)

        if(regions.length > 0) {
            const regionInsert = `INSERT INTO UserRegion (email, zipcode) SELECT * FROM UNNEST ($1::text[], $2::int[])`
            const regionArgs =  [regions.map(i => email), regions]
            await client.query(regionInsert, regionArgs)
        }

        await client.query('COMMIT')
    } catch (e) {
        await client.query('ROLLBACK')
    }
}

async function updateUser(updateObject){
    const keyMap = Object.keys(updateObject).filter(key => key != 'regions')

    let updateQuery = `UPDATE Users SET `
    let updateArgs = [ ]

    updateArgs.push(updateObject['email'])

    updateQuery += keyMap.map((key, idx) => `${key} = $${idx+2}`).join(',')
    updateArgs.push(...keyMap.map(key => updateObject[key]))

    updateQuery += ' WHERE email=$1'

    console.log(updateQuery)
    console.log(updateArgs)
    console.log(updateArgs.length)

    await client.query(updateQuery, updateArgs)

    if(updateObject.regions && updateObject.regions.length > 0) {
        try {
            await client.query('BEGIN')

            const deleteQuery = `DELETE FROM UserRegion WHERE email=$1`
            const deleteArgs =  [email]
            await client.query(deleteQuery, deleteArgs)

            const regionInsert = `INSERT INTO UserRegion (email, zipcode) SELECT * FROM UNNEST ($1::text[], $2::int[])`
            const regionArgs =  [regions.map(i => email), regions]
            await client.query(regionInsert, regionArgs)

            await client.query('COMMIT')
        } catch (e) {
            await client.query('ROLLBACK')
        }
    }

    return 0
}

module.exports = {
    getAllUsers,
    getUserDetails,
    createUser,
    updateUser
}
