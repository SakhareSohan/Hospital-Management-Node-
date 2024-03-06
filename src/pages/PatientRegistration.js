import React, { useState } from 'react';
import axios from 'axios';
import Nav from "../components/nav";
import Footer from "../components/footer";
import "../style/PatientRegistration.css";

// Other imports...

const PatientRegistration = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [uuid, setUUID] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Prepare data to send to the server
    const patientData = { name, age, contact, password };

    // Send a POST request to the backend endpoint
    axios.post('http://localhost:3001/patient/api/register-patient', patientData)
      .then(response => {
        console.log('Patient registered successfully:', response.data);
        // Extract the UUID from the response data and set it in the state
        setUUID(response.data.newPatient.uuid);
      })
      .catch(error => {
        console.error('Error registering patient:', error);
      });
  };

  return ( 
    <>
      <Nav />
      <div className="Registration-container">
        <div className="registration-container">
          <h2 className='patientHeading'>Patient Registration</h2>
          {!uuid && (
            <form id="registration-form" className="registration-form" onSubmit={handleSubmit}>
              <div>
                <label className="registration-label">Name:</label>
                <input type="text" id="name" className="registration-input" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div>
                <label className="registration-label">Age:</label>
                <input type="text" id="age" className="registration-input" value={age} onChange={(e) => setAge(e.target.value)} required />
              </div>
              <div>
                <label className="registration-label">Contact:</label>
                <input type="text" id="contact" className="registration-input" value={contact} onChange={(e) => setContact(e.target.value)} required />
              </div>
              <div>
                <label className="registration-label">Password:</label>
                <input type="password" id="password" className="registration-input" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <button type="submit" className="registration-button">Register</button>
            </form>
          )}
          {/* Display patient details after successful registration */}
          {uuid && (
            <div className="registration-details">
              <h3>Registered Patient Details</h3>
              <p>Name: {name}</p>
              <p>Age: {age}</p>
              <p>Contact: {contact}</p>
              <p>UUID: {uuid}</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PatientRegistration;
