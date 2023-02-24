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

        const userInsert = `INSERT INTO Users (email, name, is_scout, is_requester) VALUES ($1, $2, $3, $4) RETURNING *`
        const userArgs =  [email, name, is_scout, is_requester]
        const user = (await client.query(userInsert, userArgs)).rows[0]

        if(regions.length > 0) {
            const regionInsert = `INSERT INTO UserRegion (email, zipcode) SELECT * FROM UNNEST ($1::text[], $2::int[]) RETURNING *`
            const regionArgs =  [regions.map(i => email), regions]
            const regionResult = (await client.query(regionInsert, regionArgs)).rows
            user.regions = regionResult
        }

        await client.query('COMMIT')
        return user
    } catch (e) {
        await client.query('ROLLBACK')
    }
}

async function updateUser(updateObject){
    const keyMap = Object.keys(updateObject).filter(key => key != 'regions')

    let updateQuery = `UPDATE Users SET `
    let updateArgs = [ updateObject['email'] ]

    updateQuery += keyMap.map((key, idx) => `${key} = $${idx+2}`).join(',')
    updateArgs.push(...keyMap.map(key => updateObject[key]))

    updateQuery += ' WHERE email=$1 RETURNING *'

    const user = (await client.query(updateQuery, updateArgs)).rows[0]

    if(updateObject.regions && updateObject.regions.length > 0) {
        try {
            await client.query('BEGIN')

            const deleteQuery = `DELETE FROM UserRegion WHERE email=$1`
            const deleteArgs =  [ updateObject['email'] ]
            await client.query(deleteQuery, deleteArgs)

            const regionInsert = `INSERT INTO UserRegion (email, zipcode) SELECT * FROM UNNEST ($1::text[], $2::int[]) RETURNING *`
            const regionArgs =  [ updateObject['regions'].map(i => updateObject['email'] ), updateObject['regions'] ]
            const regionResult = (await client.query(regionInsert, regionArgs)).rows
            user.regions = regionResult

            await client.query('COMMIT')
        } catch (e) {
            await client.query('ROLLBACK')
        }
    }

    return user
}

module.exports = {
    getAllUsers,
    getUserDetails,
    createUser,
    updateUser
}
