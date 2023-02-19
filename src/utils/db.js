const { Client, Pool } = require('pg')

const credentials = {
  host: "localhost",
  port: 5432,
  database: "apartment_scout_db",
  user: "admin",
  password: "admin",
};
const client = new Client(credentials);

module.exports = { client, credentials }
