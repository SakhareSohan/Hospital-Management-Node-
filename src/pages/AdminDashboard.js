import React, { useState, useEffect } from 'react';
import axios from 'axios';
import adminDashboardStyles from "../style/AdminDashboard.module.css";
import Nav from "../components/nav"
import Footer from "../components/footer"

const AdminDashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [contact, setContact] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = () => {
    axios.get('http://localhost:3001/admin/api/doctors')
      .then(response => {
        setDoctors(response.data);
      })
      .catch(error => {
        setError('Error fetching doctors. Please try again later.'); // Set error state
        console.error('Error fetching doctors:', error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newDoctor = { name, specialty, contact, username, password };

    axios.post('http://localhost:3001/admin/api/register-doctor', newDoctor)
      .then(response => {
        console.log('Doctor registered successfully:', response.data);
        // Fetch updated list of doctors
        fetchDoctors();
        alert('Doctor registered successfully.'); // Show success alert
      })
      .catch(error => {
        setError('Error registering doctor. Please try again later.'); // Set error state
        console.error('Error registering doctor:', error);
      });

    // Reset form fields after submission
    setName('');
    setSpecialty('');
    setContact('');
    setUsername('');
    setPassword('');
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
    <div className={adminDashboardStyles.adminContainer}>
  <h2 className={adminDashboardStyles.adminHeading}>Admin Dashboard</h2>
  
  <div className={adminDashboardStyles.adminFormContainer}>
    <h3 className={adminDashboardStyles.adminSubHeading}>Register New Doctor</h3>
    <form onSubmit={handleSubmit} className={adminDashboardStyles.adminForm}>
      <div className={adminDashboardStyles.formGroup}>
        <label htmlFor="name" className={adminDashboardStyles.adminLabel}>Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className={adminDashboardStyles.adminInput} required />
      </div>
      <div className={adminDashboardStyles.formGroup}>
        <label htmlFor="specialty" className={adminDashboardStyles.adminLabel}>Specialty:</label>
        <input type="text" id="specialty" value={specialty} onChange={(e) => setSpecialty(e.target.value)} className={adminDashboardStyles.adminInput} required />
      </div>
      <div className={adminDashboardStyles.formGroup}>
        <label htmlFor="contact" className={adminDashboardStyles.adminLabel}>Contact:</label>
        <input type="text" id="contact" value={contact} onChange={(e) => setContact(e.target.value)} className={adminDashboardStyles.adminInput} required />
      </div>
      <div className={adminDashboardStyles.formGroup}>
        <label htmlFor="username" className={adminDashboardStyles.adminLabel}>Username:</label>
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className={adminDashboardStyles.adminInput} required />
      </div>
      <div className={adminDashboardStyles.formGroup}>
        <label htmlFor="password" className={adminDashboardStyles.adminLabel}>Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className={adminDashboardStyles.adminInput} required />
      </div>
      <button type="submit" className={adminDashboardStyles.adminButton}>Register Doctor</button>
    </form>
  </div>

  <div className={adminDashboardStyles.registeredDoctorsContainer}>
    <h3 className={adminDashboardStyles.adminSubHeading}>Registered Doctors</h3>
    <table className={adminDashboardStyles.adminTable}>
      <thead>
        <tr>
          <th className={adminDashboardStyles.adminTableHeader}>Name</th>
          <th className={adminDashboardStyles.adminTableHeader}>Specialty</th>
          <th className={adminDashboardStyles.adminTableHeader}>Contact</th>
        </tr>
      </thead>
      <tbody>
        {doctors.map((doctor, index) => (
          <tr key={index}>
            <td className={adminDashboardStyles.adminTableData}>{doctor.name}</td>
            <td className={adminDashboardStyles.adminTableData}>{doctor.specialty}</td>
            <td className={adminDashboardStyles.adminTableData}>{doctor.contact}</td>
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

export default AdminDashboard;
