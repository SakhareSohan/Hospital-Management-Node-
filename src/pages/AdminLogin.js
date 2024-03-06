import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../style/PatientLogin.module.css';
import Nav from "../components/nav"
import Footer from "../components/footer"

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if the entered credentials are correct (e.g., hardcoded values for demo purposes)
    if (username === 'admin' && password === 'password') {
      // Redirect the admin to the admin dashboard
      navigate('/admin/dashboard/8cfddb0b-0545-4edb-b399-4d7d3ce2378b');
    } else {
      // Display error message for invalid credentials
      setError('Invalid username or password');
    }
  };

  return (
    <>
    <Nav/>

    <div className={styles.adminLoginCanvas}>
        <div className={styles.adminLoginMain}>
            <div className={styles.adminLoginContainer}>
                <h2>Admin Login</h2>
                <form className={styles.adminLoginForm} onSubmit={handleSubmit}>
                    <div>
   
                        <input
                        placeholder='Username'
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>

                        <input
                        placeholder='Passward'
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className={styles.error}>{error}</p>}
                    <button type="submit" className={styles.submitButton}>Login</button>
                </form>
            </div>
        </div>
    </div>
    <Footer/>
    </>
);
};

export default AdminLogin;