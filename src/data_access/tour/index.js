const { client } = require('../../utils/db.js')

async function getToursByUser({type, user}){
    const query = `SELECT * FROM Tours WHERE ${type == 'requester' ? 'requested_by' : 'scouted_by'}=$1 `
    const args = [user]
    const res = await client.query(query, args)
    return res.rows
}

async function getTourById({tour_id}){
    const query = `SELECT * FROM Tours WHERE tour_id=$1`
    const args = [tour_id]
    const res = await client.query(query, args)
    return res.rows[0]
}

async function createTour({ tour_address, requested_by, scouted_by }){
    const tourInsert = `INSERT INTO Tours (tour_address, requested_by, scouted_by) VALUES ($1, $2, $3) RETURNING *`
    const tourArgs =  [tour_address, requested_by, scouted_by]
    const res = await client.query(tourInsert, tourArgs)
    return res.rows[0]
}

async function updateTour(updateObject){
    let updateQuery = `UPDATE Tours SET `
    let updateArgs = []
    updateArgs.push(updateObject['tour_id'])

    const keyMap = Object.keys(updateObject).filter(i => i !== 'tour_id')

    updateQuery += keyMap.map((key, idx) => `${key} = $${idx+2}`).join(',')
    updateArgs.push(...keyMap.map(key => updateObject[key]))

    updateQuery += ' WHERE tour_id=$1 RETURNING *'

    const res = await client.query(updateQuery, updateArgs)
    return res.rows[0]
}

module.exports = {
    getToursByUser,
    getTourById,
    createTour,
    updateTour,
}
