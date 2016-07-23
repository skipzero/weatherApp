var mysql = require('mysql');

function Pool () {
  this.pool = null;
  this.init = function () {
    this.pool = mysql.createPool({
      connectionLimit: 10,
      user: 'root',
      host: 'localhost',
      port: '3306',
    });
  };

  this.acquire = function (callback) {
    this.pool.getConnection(function (err, connection) {
      callback(err, connection);
    });
  };
};

module.exports = new Pool();
