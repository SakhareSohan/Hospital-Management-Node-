const express = require('express');
const router = express.Router();
const doctorController = require('./doctorController');

// Route to get doctor information by ID
router.get('/info/:id', doctorController.getDoctorById);

// Route to get pending appointments
router.get('/appointments/pending/:id', doctorController.getPendingAppointments);

// Route to search for a patient
router.post('/search-patient', doctorController.searchPatient);

// Route to mark an appointment as done
router.post('/appointments/:id', doctorController.markAppointmentDone);

module.exports = router;
