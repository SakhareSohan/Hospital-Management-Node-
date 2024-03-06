import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../style/PatientLogin.module.css';
import Nav from '../components/nav';
import Footer from '../components/footer';

const PatientLogin = () => {
  const [uuid, setUuid] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const credentials = { uuid, password };

    try {
      const response = await axios.post('http://localhost:3001/patient/login', credentials);
      console.log('Login successful:', response.data);
      const { uuid } = response.data;
      // Redirect to patient dashboard upon successful login
      navigate(`/patient/dashboard/${uuid}`);
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
                    <h2>Patient Login</h2>
                    <form className={styles.adminLoginForm} onSubmit={handleSubmit}> 
                        <div>
                            <input type="text" placeholder="Username" id="uuid" value={uuid} onChange={(e) => setUuid(e.target.value)} required/>
                        </div>
                        <div>
                            <input type="password" placeholder="Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                        </div>
                        <button className={styles.submitButton}>Login</button>
                    </form>
                </div>
            </div>
        </div>
        <Footer/>
    </>
);
};

export default PatientLogin;