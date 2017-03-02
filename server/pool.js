/*eslint no-console: ['error', { allow: [info', 'error'] }] */
'use strict';
const mysql = require('mysql');

function Pool() {
  this.pool = null;
  this.init = () => {
    this.pool = mysql.createPool({
      connectionLimit: 10,
      user: process.env.DB_USER,
      host: process.env.HOST,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    });
  };

  this.acquire = (callback) => {
    this.pool.getConnection((err, connection) => {
      if (err) {
        console.error(`[${new Date()}] ERROR: ${err}`);
        throw err;
      }
      callback(err, connection);
    });
  };
}

module.exports = new Pool();
