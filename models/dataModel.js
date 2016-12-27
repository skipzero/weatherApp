'use strict';
const pool = require('../server/pool');

function Weather() {
  this.get = (res) => {
    pool.acquire((err, con) => {
      con.query('select * from `weather`.`data_table`', (err, result) => {
        con.release();
        if (err) {
          res.send({ status: 1, message: 'Error retreiving records...'})
        }
        res.send({ status: 0, message: 'records retreived successfully!', result });
      })
    });
  };

  this.getRange = (res, num) => {
    pool.acquire((err, con) => {
      con.query('select * from `weather`.`data.table` order by `id` desc limit ?', [data.num], (err, result) => {
        con.release();
        if (err) {
          res.send({ status: 1, message: 'error retreiving records.'})
        }
        res.send({ status: 0, message: 'records found successfully!', result})
      });
    });
  };

  this.create = (data, res) => {
    pool.acquire((err, con) => {
      con.query('insert into `weather`.`data_table` set ?', data, (err, result) => {
        con.release();
        if (err) {
          res.send({ status: 1, message: 'record creation failed' });
        }
        res.send({ status: 0, message: 'record created successfully!', data });
      });
    });
  };

  this.update = (data, res) => {
    pool.acquire((err, con) => {
      con.query('update `weather`.`data_table` set ? where id = ?', [data, data.id], (err, result) => {
        con.release();
        if (err) {
          res.send({ status: 1, message: 'updating record failed' });
        } else {
          res.send({ status: 0, message: 'record updated successfully!', data });
        }
      });
    });
  };

  this.delete = (id, res) => {
    pool.acquire((err, con) => {
      con.query('delete from `weather`.`data_table` where id = ?', [id], (err, result) => {
        con.release();
        if (err) {
          res.send({status: 1, message: 'Record failed to delete'});
        } else {
          res.send({status: 0, message: 'Record deleted successfully'});
        }
      });
    });
  };
};

module.exports = new Weather();
