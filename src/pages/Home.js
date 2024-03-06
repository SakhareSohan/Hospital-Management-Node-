import React from 'react';
import '../style/Home.css';
import Nav from "../components/nav";
import Footer from "../components/footer";
import Doctor1 from "../images/Doctor-rafiki.png";
import Doctor2 from "../images/Doctor-cuate.png";
import Doctor3 from "../images/Admin-rafiki.png";
import Aboutus from "../images/team.png";
import Vision from "../images/visionary.png";
import Mission from "../images/target.png";

function Home() {
  return (
<>
<Nav />
<div>
        <div className="images padding">
          <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={1} aria-label="Slide 2" />
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={2} aria-label="Slide 3" />
            </div>
            <div className="carousel-inner" data-bs-interval={5000}>
              <div className="carousel-item carousel-image bg1 active">
                {/* Replace with hospital image */}
              </div>
              <div className="carousel-item carousel-image bg2" data-bs-interval={5000}>
                {/* Replace with another hospital image */}
              </div>
              <div className="carousel-item carousel-image bg3 " data-bs-interval={5000}>
                {/* Replace with another hospital image */}
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div className="container marketing mt-5 ">
          {/* About section */}
          <div className="row">
            <div className="col-lg-4">
              <img src={Aboutus} alt=" " className="img-fluid mb-3" />
              <h2>About Us</h2>
              <p>We are a leading hospital dedicated to providing exceptional healthcare services to our
                patients.</p>
            </div>{/* /.col-lg-4 */}
            <div className="col-lg-4">
              <img src={Mission} alt="Hospital Image 2" className="img-fluid mb-3" />
              <h2>Our Mission</h2>
              <p>Our mission is to deliver compassionate care and promote wellness within our community.</p>
            </div>{/* /.col-lg-4 */}
            <div className="col-lg-4">
              <img src={Vision}  alt="Hospital Image 3" className="img-fluid mb-3  " />
              <h2>Our Vision</h2>
              <p>Our vision is to be the preferred healthcare provider known for excellence in patient care
                and clinical outcomes.</p>
            </div>{/* /.col-lg-4 */}
          </div>{/* /.row */}
          {/* START THE FEATURETTES */}
          <hr id="services"className="featurette-divider" />
          <div className="row featurette">
            <div className="col-md-7">
              <h2 className="featurette-heading">Efficient Patient Care<span className="text-muted">Manage patient
                  data seamlessly.</span></h2>
              <p className="lead">Efficiently organize patient information, appointments, and medical records to
                provide high-quality care.</p>
            </div>
            <div className="col-md-5">
              <img className="featurette-image img-fluid mx-auto" src={Doctor1} alt="Generic placeholder image" />
            </div>
          </div>
          <hr className="featurette-divider" />
          <div className="row featurette">
            <div className="col-md-7 order-md-2">
              <h2 className="featurette-heading">Streamlined Doctor Workflow<span className="text-muted">Optimize
                  doctor scheduling and patient care.</span></h2>
              <p className="lead">Streamline doctor schedules, appointments, and patient interactions for improved
                efficiency and satisfaction.</p>
            </div>
            <div className="col-md-5 order-md-1">
              <img className="featurette-image img-fluid mx-auto" src={Doctor2} alt="Generic placeholder image" />
            </div>
          </div>
          <hr className="featurette-divider" />
          <div className="row featurette">
            <div className="col-md-7">
              <h2 className="featurette-heading">Robust Admin Tools<span className="text-muted">Efficiently manage
                  hospital operations.</span></h2>
              <p className="lead">Access powerful administrative tools for managing staff, resources, and finances
                to ensure smooth hospital operations.</p>
            </div>
            <div className="col-md-5">
              <img className="featurette-image img-fluid mx-auto" src={Doctor3} alt="Generic placeholder image" />
            </div>
          </div>
        </div>
        <hr className="featurette-divider" />
        {/* Contact section */}
        <section id="contactus" style={{padding: '50px 0'}}>
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h2>Contact Us</h2>
                <p>If you have any questions or inquiries, feel free to reach out to us using the contact information below.</p>
                <ul className="contact-info">
                  <li><strong>Address:</strong> MediCare</li>
                  <li><strong>Phone:</strong> +91 93261 73967</li>
                  <li><strong>Email:</strong> <a href="mailto:your.email@example.com" className="link-info">your.email@example.com</a></li>
                </ul>
              </div>
              <div className="col-md-6">
                {/* Larger Google Map Embed API */}
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3776.4933118730464!2d73.26849317525524!3d18.82072098233195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7e2b676c190e9%3A0xf77754195ba9b262!2sVishwaniketan's%20Institute%20of%20Management%20Entrepreneurship%20and%20Engineering%20Technology%20(ViMEET)!5e0!3m2!1sen!2sin!4v1709474271928!5m2!1sen!2sin" width="100%" height={400} style={{border: 0}} allowFullScreen loading="lazy" />
              </div>
            </div>
          </div>
        </section>
      </div>
<Footer />
</>
      );
  };

export default Home;
