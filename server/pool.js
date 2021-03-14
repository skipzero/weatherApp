/*eslint no-console: ['error', { allow: ['log', 'info', 'error'] }] */
import mysql from 'mysql';

class Pool {
  constructor() {
    this.pool = null;
  }

  init() {
    this.pool = mysql.createPool({
      connectionLimit: 10,
      user: process.env.DB_USER,
      host: process.env.HOST,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    });
  };

  acquire(callback) {
    this.pool.getConnection((err, connection) => {
      if (err) {
        console.error(`[${new Date()}] ERROR: ${err}`);
        throw err;
      }
      callback(err, connection);
    });
  }
}

export default new Pool();
