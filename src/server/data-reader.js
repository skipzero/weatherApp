const mysql = require('mysql');

const dataReader = (connection, callback) => {
  connection.query('SELECT * FROM `weather`.`data_table` order by id desc limit 15', (err, data, fields) => {
    if (err) {
      console.log(`Error: ${err}...`)
    }
    data = JSON.stringify(data);
    callback(data);
    console.log(`Read Res: ${data}`);
    console.log(fields);
  });
};

module.exports = dataReader;
