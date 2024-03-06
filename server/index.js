const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

const adminRoutes = require('./admin/adminRoutes');
app.use('/admin', adminRoutes);

const patientRoutes = require('./patient/patientRoutes');
app.use('/patient', patientRoutes);

const doctorRoutes = require('./doctor/doctorRoutes');
app.use('/doctor', doctorRoutes);

const appointmentRoutes = require('./appointment/appointmentRoutes');
app.use('/appointments', appointmentRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
