/*eslint no-console: ['error', { allow: ['log', 'info', 'error'] }] */

const mysql = require('mysql');
const env = require('../../env');

function Pool() {
  this.pool = null;
  this.init = () => {
    this.pool = mysql.createPool({
      connectionLimit: 10,
      user: env.user,
      host: env.host,
      password: env.password,
      port: env.port,
    });
  };

  this.acquire = (callback) => {
    this.pool.getConnection((err, connection) => {
      if (err) {
        console.log(`[${new Date()}] ERROR: ${err}`);
        throw err;
      }

      callback(err, connection);
    });
  };
}

module.exports = new Pool();
