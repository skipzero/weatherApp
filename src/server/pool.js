const mysql = require('mysql');

function Pool() {
  this.pool = null;
  this.init = function () {
    this.pool = mysql.createPool({
      connectionLimit: 10,
      user: 'weatheruser',
      host: 'localhost',
      password: 'weather4u',
      port: '3306',
    });
  };

  this.acquire = (callback) => {
    this.pool.getConnection((err, connection) => {
      callback(err, connection);
    });
  };
}

module.exports = new Pool();
