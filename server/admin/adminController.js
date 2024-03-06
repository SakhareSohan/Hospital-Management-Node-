// admin/adminController.js

const db = require('../models/db');

exports.registerDoctor = (req, res) => {
  const { name, specialty, contact, username, password } = req.body;
  const newDoctor = { name, specialty, contact, username, password };

  const sql = 'INSERT INTO doctors SET ?';

  db.query(sql, newDoctor, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error registering doctor' });
      throw err;
    }
    res.status(200).json({ message: 'Doctor registered successfully' });
  });
};

exports.getDoctors = (req, res) => {
  const sql = 'SELECT * FROM doctors';

  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching doctors' });
      throw err;
    }
    res.status(200).json(result);
  });
};

exports.doctorLogin = (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT id FROM doctors WHERE username = ? AND password = ?';
  db.query(sql, [username, password], (err, result) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    if (result.length === 1) {
      const { id } = result[0];
      res.status(200).json({ message: 'Login successful', id });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });
};
