const express = require('express');
const router = express.Router();
const adminController = require('./adminController');

router.post('/api/register-doctor', adminController.registerDoctor);

router.get('/api/doctors', adminController.getDoctors);

router.post('/api/doctor-login', adminController.doctorLogin);

module.exports = router;
