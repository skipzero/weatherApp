const debug = require('debug');
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
        debug(`[${new Date()}] ERROR: ${err}`);
        throw err;
      }

      debug(`[${new Date()}] Our connection: ${connection}`);
      callback(err, connection);
    });
  };
}

module.exports = new Pool();
