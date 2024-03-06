import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from '../style/PatientDashboard.module.css';
import Nav from '../components/nav';
import Footer from '../components/footer';

const PatientDashboard = () => {
  const { uuid } = useParams();
  const [doctors, setDoctors] = useState([]);
  const [patientInfo, setPatientInfo] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [date, setDate] = useState('');
  const [qrCode, setQRCode] = useState('');
  const [error, setError] = useState('');

  useEffect(() => { 
    // Fetch list of doctors when the component mounts
    Promise.all([
      axios.get('http://localhost:3001/admin/api/doctors'),
      axios.get(`http://localhost:3001/patient/${uuid}`)
    ])
    .then(([doctorsResponse, patientResponse]) => {
      const { data: doctors } = doctorsResponse;
      const { data: { patientDetails, documents, qrCode } } = patientResponse;
      setQRCode(qrCode);
      setDoctors(doctors);
      setPatientInfo(patientDetails);
      setDocuments(documents);
    })
    .catch(error => {
      setError('Error fetching data. Please try again later.'); // Set error state
    });
  }, [uuid]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const appointmentData = {
      doctor_id: selectedDoctorId,
      patient_id: `${uuid}`, // Using template literal to interpolate uuid
      date: new Date().toISOString().slice(0, 10), // Today's date
      status: 'pending' // Status is set to pending for new appointments
    };
    
    try {
      const response = await axios.post('http://localhost:3001/appointments/create_appointment', appointmentData);

      console.log('Appointment created:', response.data);
      alert('Appointment created successfully.'); // Show success alert
    } catch (error) {
      setError('Error creating appointment. Please try again later.'); // Set error state
    }
  };

  // Show error alert if there's an error
  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  return (
    <>
      <Nav/> 
      <div className={styles.centerPatientDashboard}>
        <div className={styles.containerPatientDashboard}>
          <h2 className={styles.patientHeading}>Patient Dashboard</h2>
          <div>
            {patientInfo ? (
              <div className={styles.patientDetails}>
              <div>
                <p>Name: {patientInfo.name}</p>
                <p>Age: {patientInfo.age}</p>
                <p>Contact: {patientInfo.contact}</p>

                {/* Add more patient info here */}
              </div>
              {qrCode && <img src={qrCode} className={styles.qr} alt={`QR Code for ${uuid}`} />}
              </div>
            ) : (
              <p>Loading patient details...</p>
            )}
          </div>
          {/* Appointment Form */}
          <form onSubmit={handleSubmit}>
            <label htmlFor="doctorId" className={styles.patientLabel}>Select Doctor:</label>
            <select id="doctorId" value={selectedDoctorId} onChange={(e) => setSelectedDoctorId(e.target.value)} className={styles.patientSelect}>
              <option value="">Select a doctor</option>
              {doctors.map(doctor => (
                <option key={doctor.id} value={doctor.id}>{doctor.name} - {doctor.specialty}</option>
              ))}
            </select>
            <label htmlFor="date" className={styles.patientLabel}>Select Date:</label>
            <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} className={styles.patientDateInput} />
            <button type="submit" className={styles.patientButton}>Create Appointment</button>
          </form>
          <h3 className={styles.patientSubheading}>Uploaded Documents</h3>
          <div className={styles.fileInputContainerPatient}>
            <ul className={styles.patientList}>
              {documents.map((document, index) => (
                <li key={index}>
                  <a href={`http://localhost:3001/${document.file_path}`} target="_blank" rel="noopener noreferrer" className={styles.patientLink}>
                    {document.file_path} {/* Render the appropriate property of the document object */}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
  
};

export default PatientDashboard;
