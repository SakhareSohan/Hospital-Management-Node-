import '../style/PatientDashboard.module.css';
import Nav from '../components/nav';
import Footer from '../components/footer';
import styles from '../style/PatientLogin.module.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation

const DoctorLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newDoctor = { username, password };

    try {
      const response = await axios.post('http://localhost:3001/admin/api/doctor-login', newDoctor);
      console.log('Login successful:', response.data);
    
      // Extract doctor ID from the response
      const { id } = response.data;
    
      // Redirect to dashboard with doctor ID
      navigate(`/doctor/dashboard/${id}`);
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle login error, e.g., display error message to user
    }
  };

  return (
    <>
        <Nav />
        <div className={styles.adminLoginCanvas}>
        <div className={styles.adminLoginMain}>
            <div className={styles.adminLoginContainer}>
                    <h2>Doctor Login</h2>
                    <form className={styles.adminLoginForm} onSubmit={handleSubmit}> {/* Use the same class as in the CSS file */}
                        <div>
                            <input type="text" placeholder="Username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                        </div>
                        <div>
                            <input type="password" placeholder="Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                        </div>
                        <button type="submit" className={styles.submitButton}>Login</button>
                    </form>
                </div>
            </div>
        </div>
        <Footer/>
    </>
);
};

export default DoctorLogin;
