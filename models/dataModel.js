/*eslint no-console: ['error', { allow: ['log', 'info', 'error'] }] */

const pool = require('../server/pool');

function Weather() {
  this.get = (res) => {
    pool.acquire((err, con) => {
      con.query('select * from `ambi_weather`.`ambient_weather`', (err, result) => {
        con.release();
        if (err) {
          console.error(`[ERROR-get] ${err}`);
          res.send({ status: 1, message: 'Error retreiving records...' })
        }
        res.send({ status: 0, message: 'records retreived successfully!', result });
      })
    });
  };

  this.getLast = (res) => {
    pool.acquire((err, con) => {
      con.query(`SELECT windspeedmph FROM ambi_weather.ambient_weather ORDER by id DESC LIMIT 1;`, (err, result) => {
        con.release();
        if (err) {
          console.error(`[ERROR-getDesc] ${err}`);
          res.send({ status: 1, message: 'error retreiving records.' })
        }
        res.send({ status: 0, message: 'records found successfully!', result })
      });
    });
  };

  this.getDesc = (num, res) => {
    pool.acquire((err, con) => {
      con.query(`SELECT * FROM ambi_weather.ambient_weather ORDER by id DESC LIMIT 0, ${num};`, (err, result) => {
        con.release();
        if (err) {
          console.error(`[ERROR-getDesc] ${err}`);
          res.send({ status: 1, message: 'error retreiving records.' })
        }
        res.send({ status: 0, message: 'records found successfully!', result })
      });
    });
  };

  this.create = (data, res) => {
    pool.acquire((err, con) => {
      con.query('insert into `ambi_weather`.`ambient_weather` set ?', data, (err, result) => {
        con.release();
        if (err) {
          console.error(`[ERROR-create] ${err}`);
          res.send({ status: 1, message: 'record creation failed' });
        }
        res.send({ status: 0, message: 'record created successfully!', data });
      });
    });
  };

  this.update = (data, res) => {
    pool.acquire((err, con) => {
      console.error(`[ERROR-update] ${err}`);
      con.query('update `ambi_weather`.`ambient_weather` set ? where id = ?', [data, data.id], (err, result) => {
        con.release();
        if (err) {
          res.send({ status: 1, message: 'updating record failed' });
        }
        res.send({ status: 0, message: 'record updated successfully!', data });
      });
    });
  };

  this.delete = (id, res) => {
    pool.acquire((err, con) => {
      con.query('delete from `ambi_weather`.`ambient_weather` where id = ?', [id], (err, result) => {
        con.release();
        if (err) {
          console.error(`[ERROR-delete] ${err}`);
          res.send({ status: 1, message: 'Record failed to delete' });
        }
        res.send({ status: 0, message: 'Record deleted successfully' });
      });
    });
  };
};

module.exports = new Weather();
