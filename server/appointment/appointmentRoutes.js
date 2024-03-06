// appointmentRoutes.js

const express = require('express');
const router = express.Router();
const appointmentController = require('./appointmentController');

// Route for creating a new appointment
router.post('/create_appointment', appointmentController.createAppointment);

// Route for getting pending appointments
router.get('/pending', appointmentController.getPendingAppointments);

module.exports = router;
