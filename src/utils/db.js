const { Client } = require("pg");

const NEON_DB = {
  PGHOST: "ep-long-rain-948516.us-west-2.aws.neon.tech",
  PGDATABASE: "neondb",
  PGUSER: "shubhamkulkarni01",
  PGPASSWORD: "IKrPQTC8wX1A",
  ENDPOINT_ID: "ep-long-rain-948516",
};
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = NEON_DB;

const localCredentials = {
  host: "localhost",
  port: 5432,
  database: "apartment_scout_db",
  user: "admin",
  password: "admin",
};

const neonCredentials = {
  connectionString: `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?ssl=true`,
};

const credentials = localCredentials;

const client = new Client(credentials);

module.exports = { client, credentials };
