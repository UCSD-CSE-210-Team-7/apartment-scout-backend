const { client } = require('../../utils/db.js')

async function getToursByUser({type, user}){
    const query = `SELECT * FROM Tours WHERE ${type == 'requester' ? 'requested_by' : 'scouted_by'}=$1 `
    const args = [user]
    const res = await client.query(query, args)
    return res.rows
}

module.exports = {
    getToursByUser,
}
