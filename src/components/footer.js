import React from 'react';
import footerStyles from "../style/footer.module.css";

function Footer() {
    return (
        <footer className="site-footer p-4 text-white">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h3>Contact Us</h3>
                        <p>Vishwaniketan's Institute</p>
                        <p>Phone: +91 93261 73967</p>
                    </div>
                    <div className="col-md-4">
                        <h3>Quick Links</h3>
                        <ul className="footer-links">
                            <li><a href="/#" className="link-light">Home</a></li>
                            <li><a href="/#services" className="link-light">Services</a></li>
                            <li><a href="/#contactus" className="link-light">Contact us</a></li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h3>Connect With Us</h3>
                        <ul className="social-icons">
                            <li><a href="mailto:gharatbhavesh141@gmail.com" className="link-light">gharatbhavesh141@gmail.com</a></li>
                            <li><a href="mailto:gharatbhavesh141@gmail.com" className="link-light">gharatbhavesh141@gmail.com</a></li>
                            <li><a href="mailto:gharatbhavesh141@gmail.com" className="link-light">gharatbhavesh141@gmail.com</a></li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 text-center">
                        <p>
                            Customer Support: +91 8369204930 | Email: <span><a href="mailto:gharatbhavesh141@gmail.com" className="link-light">gharatbhavesh141@gmail.com</a></span>
                        </p>
                        <p>
                            &copy; 2024 Hospital Management System. All Rights Reserved <span className="font-monospace text-primary "></span>
                        </p>
                    </div>
                </div>
            </div>
        </footer>

    );
}

export default Footer;
