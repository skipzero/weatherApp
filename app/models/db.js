import mysql from 'mysql';
import db from '../configs/db.config.js';

// Create a connection to the database
export const connection = mysql.createConnection({
  host: db.HOST,
  user: db.USER,
  password: db.PW,
  database: db.DB
});

// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});
