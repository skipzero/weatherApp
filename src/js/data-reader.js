const mysql = require('mysql');

const dataReader = () => {
  connection.query('SELECT * FROM `weather`.`data_table` Limit 15,5', (err, res, fields) => {
    console.log(`Res: ${res}`);
    console.log(`Fields: ${fields}`);
  });
};

module.exports = dataReader;
