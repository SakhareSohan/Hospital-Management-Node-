import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../style/DoctorDashboard.module.css';
import Nav from '../components/nav';
import Footer from '../components/footer';

const DoctorDashboard = () => {
  const { id } = useParams();
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch doctor information and appointments on component mount
  useEffect(() => {
    // Fetch list of doctors when the component mounts
    Promise.all([
      axios.get(`http://localhost:3001/doctor/info/${id}`),
      axios.get(`http://localhost:3001/doctor/appointments/pending/${id}`)
    ])
    .then(([doctorResponse, appointmentsResponse]) => {
      // Set doctor information
      setDoctorInfo(doctorResponse.data);
      // Set today's appointments
      setAppointments(appointmentsResponse.data);
    })
    .catch(error => {
      setError('Error fetching doctor information or appointments. Please try again later.'); // Set error state
      console.error('Error fetching doctor information or appointments:', error);
    });
  }, [id]);

  // Function to handle search for patient
  const handleSearch = () => {
    // Make a request to search for patient by name
    axios.post('http://localhost:3001/doctor/search-patient', { uuid: searchInput })
      .then(response => {
        setSearchResult(response.data);
        navigate(`/patient/${searchInput}`);
      })
      .catch(error => {
        setError('Error searching for patient. Please try again later.'); // Set error state
        console.error('Error searching for patient:', error);
      });
  };

  // Function to mark appointment as complete
  const handleMarkAppointment = (appointmentID) => {
    axios.post(`http://localhost:3001/doctor/appointments/${appointmentID}`, { id: appointmentID })
      .then(response => {
        console.log('Appointment marked as complete:', appointmentID);
        // Remove the completed appointment from the list
        setAppointments(prevAppointments => prevAppointments.filter(appointment => appointment.id !== appointmentID));
        alert('Appointment marked as complete.'); // Show success alert
      })
      .catch(error => {
        setError('Error marking appointment as complete. Please try again later.'); // Set error state
        console.error('Error marking appointment as complete:', error);
      });
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
    <div className={styles.containerDoctorDashboard}>
      <div className={styles.dashboardSectionDoctor}>
        <h2>Doctor Center</h2>
        {doctorInfo ? (
          <div>
            <p>Name: {doctorInfo.name}</p>
            <p>Specialty: {doctorInfo.specialty}</p>
            <p>Contact: {doctorInfo.contact}</p>
          </div>
        ) : (
          <p>Loading doctor information...</p>
        )}
      </div>

      <div className={styles.dashboardSectionDoctor}>
        <h3>Search Patients</h3>
        <div className={styles.searchFormDoctor}>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Enter patient uuid"
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>

      <div className={styles.dashboardSectionDoctor}>
        <h3>Today's Appointments</h3>
        <table className={styles.tableDoctor}>
          <thead>
            <tr>
              <th>Patient ID</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.patient_id}</td>
                <td>{appointment.date}</td>
                <td>{appointment.status}</td>
                <td>
                  <button onClick={() => handleMarkAppointment(appointment.id)}>Mark Done</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default DoctorDashboard;
