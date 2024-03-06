// Import necessary modules and models
const db = require('../models/db');

exports.getDoctorById = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM doctors WHERE id = ?';
  
  db.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching doctor' });
      throw err;
    }
    if (result.length > 0) {
      res.status(200).json(result[0]);
    } else {
      res.status(404).json({ message: 'Doctor not found' });
    }
  });
};

exports.getPendingAppointments = (req, res) => {
  const doctor_id = req.params.id;
  const sql = 'SELECT * FROM appointments WHERE doctor_id = ?'; // Use placeholder for the doctor_id
  db.query(sql, [doctor_id], (err, result) => { // Pass the doctor_id as an array to the query function
    if (err) {
      res.status(500).json({ error: 'Error fetching pending appointments' });
      throw err;
    }
    res.status(200).json(result);
  });
};

exports.searchPatient = (req, res) => {
  const { uuid } = req.body;
  const sql = 'SELECT * FROM patients WHERE uuid = ?';

  db.query(sql, [uuid], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error searching for patient' });
      throw err;
    }
    if (result.length > 0) {
      res.status(200).json(result[0]);
    } else {
      res.status(404).json({ message: 'Patient not found' });
    }
  });
};

exports.markAppointmentDone = (req, res) => {
  const { id } = req.params;
  const sql = 'UPDATE appointments SET status = ? WHERE id = ?';
  db.query(sql, ['Completed', id], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error marking appointment as done' });
      throw err;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Appointment not found' });
    } else {
      res.status(200).json({ message: 'Appointment marked as done' });
    }
  });
};
