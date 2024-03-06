// Import necessary modules and models
const db = require('../models/db');

// Sample appointments data for demonstration purposes
const appointments = [
  { id: 1, patientName: 'Alice', date: '2024-02-20', status: 'Pending' },
  { id: 2, patientName: 'Bob', date: '2024-02-21', status: 'Pending' },
  // Add more appointment data as needed
];

const createAppointment = (req, res) => {
  const { doctor_id, patient_id, date, status } = req.body;

  // Insert appointment data into the appointments table
  const sql = 'INSERT INTO appointments (doctor_id, patient_id, date, status) VALUES (?, ?, ?, ?)';
  db.query(sql, [doctor_id, patient_id, date, status], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error creating appointment' });
      throw err;
    }
    // Return the inserted appointment data
    const newAppointment = {
      id: result.insertId,
      doctor_id,
      patient_id,
      date,
      status
    };
    res.status(201).json(newAppointment);
  });
};

const getPendingAppointments = (req, res) => {
  // Retrieve pending appointments from the sample data
  const pendingAppointments = appointments.filter(appointment => appointment.status === 'Pending');
  res.status(200).json(pendingAppointments);
};

module.exports = {
  createAppointment,
  getPendingAppointments,
};
