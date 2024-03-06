import React from 'react';
import { useNavigate } from 'react-router-dom';
import navStyles from "../style/nav.module.css";

function Nav() {
    const navigate = useNavigate(); // Use useNavigate hook

    const handleSelectChange = (event) => {
        const selectedOption = event.target.value;
        navigate(selectedOption); // Use navigate function to redirect
    };

    return (
        <nav className={navStyles.nav}>
            <div className={navStyles.navLinksContainer}>
                {/* Replace href with to */}
                <a className={navStyles.navLink} href="/">Home</a>
                <a className={navStyles.navLink} href="/patient/registration">Patient Registration</a>
                <a className={navStyles.navLink} href="/#services">Services</a>
                <a className={navStyles.navLink} href="/#contactus">Contact</a>
                <div className={navStyles.loginDropdown}>
                    <select className={navStyles.navSelect} onChange={handleSelectChange}>
                        <option className={navStyles.navSelectOption} value="">Login</option>
                        {/* Replace href values with route paths */}
                        <option className={navStyles.navSelectOption} value="/patient">Patient Login</option>
                        <option className={navStyles.navSelectOption} value="/doctor">Doctor Login</option>
                        <option className={navStyles.navSelectOption} value="/admin/login">Admin Login</option>
                    </select>
                </div>
            </div>
        </nav>
    );
}

export default Nav;
