// models/db.js

const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'dapp-user',
  password: 'localhost@123',
  database: 'dapp'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

module.exports = db;
