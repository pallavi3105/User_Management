// server/db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'user_it',
  host: '192.168.1.91',
  database: 'DEV',
  password: 'Qawsed*&^%',
  port: 5432,
});

module.exports = pool;
