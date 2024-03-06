const express = require('express');
const router = express.Router();
const patientController = require('./patientController');

// Route for fetching documents associated with a patient
router.get('/:uuid', patientController.getPatientDetailsAndDocuments);

router.post('/login', patientController.patientLogin);

router.post('/comment/:uuid', patientController.updatePatientComment);

// Route for uploading a document for a patient
router.post('/upload-documents', patientController.uploadDocument);

// Define routes for patient-related functionalities
router.post('/api/register-patient', patientController.registerPatient);

module.exports = router; 
