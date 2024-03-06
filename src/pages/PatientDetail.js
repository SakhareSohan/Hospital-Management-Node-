import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from '../style/PatientDashboard.module.css';
import Nav from '../components/nav';
import Footer from '../components/footer';

function App() {
  const { uuid } = useParams(); // Get UUID from URL parameter
  const [patientInfo, setPatientInfo] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [patientId, setPatientId] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [comment, setComment] = useState('');
  const [qrCode, setQRCode] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch patient details and documents based on UUID
    axios.get(`http://localhost:3001/patient/${uuid}`)
      .then(response => {
        const { patientDetails, documents, qrCode } = response.data;
        setQRCode(qrCode);
        setPatientInfo(patientDetails);
        setComment(patientDetails.comment); // Set the comment from the response
        setDocuments(documents);
      })
      .catch(error => {
        setError('Error fetching patient details and documents. Please try again later.'); // Set error state
        console.error('Error fetching patient details and documents:', error);
      });
  }, [uuid]); // Include uuid in dependency array

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value); // Update the comment state when input changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Update patient info with the modified comment
    const updatedPatientInfo = { comment };
    try {
      // Make a request to update the patient's comment
      await axios.post(`http://localhost:3001/patient/comment/${uuid}`, updatedPatientInfo);
      console.log('Comment updated successfully');
      axios.get(`http://localhost:3001/patient/${uuid}`)
      .then(response => {
        const { patientDetails, documents, qrCode } = response.data;
        setQRCode(qrCode);
        setPatientInfo(patientDetails);
        setComment(patientDetails.comment); // Set the comment from the response
        setDocuments(documents);
      })
        .catch(error => {
          setError('Error fetching patient documents. Please try again later.'); // Set error state
          console.error('Error fetching patient documents:', error);
        });
      // Optionally, you can fetch updated patient details here
    } catch (error) {
      setError('Error updating comment. Please try again later.'); // Set error state
      console.error('Error updating comment:', error);
    }
  };

  const handlePatientIdChange = (event) => {
    setPatientId(event.target.value);
  };

  const handleDoctorIdChange = (event) => {
    setDoctorId(event.target.value);
  };

  const handleFileUpload = async () => {
    if (!selectedFile || !patientId || !doctorId) {
      setError('Please select a file and enter patient and doctor IDs.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('patientId', patientId);
    formData.append('doctorId', doctorId);

    try {
      await axios.post('http://localhost:3001/patient/upload-documents', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('File uploaded successfully.');
      // After successful upload, fetch documents again to update the list
      axios.get(`http://localhost:3001/patient/${uuid}`)
      .then(response => {
        const { patientDetails, documents, qrCode } = response.data;
        setQRCode(qrCode);
        setPatientInfo(patientDetails);
        setComment(patientDetails.comment); // Set the comment from the response
        setDocuments(documents);
      })
        .catch(error => {
          setError('Error fetching patient documents. Please try again later.'); // Set error state
          console.error('Error fetching patient documents:', error);
        });
    } catch (error) {
      setError('Error uploading file. Please try again later.'); // Set error state
      console.error('Error uploading file:', error);
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
          <h2 className={styles.patientHeading}>Patient Details</h2>
          <div>
            {patientInfo ? (
              <div className={styles.patientDetails}>
                <div>
                  <p>Name: {patientInfo.name}</p>
                  <p>Age: {patientInfo.age}</p>
                  <p>Gender: {patientInfo.contact}</p>
                  <p>Comment: {patientInfo.comment}</p>
                </div>
                  {qrCode && <img src={qrCode} className={styles.qr} alt={`QR Code for ${uuid}`} />}
                </div>
                  ) : (
                    <p>Loading patient details...</p>
                    )}
                    </div>
                  <form onSubmit={handleSubmit} className={styles.patientForm}>
                    <label htmlFor="comment" className={styles.patientLabel}>Comment:</label>
                    <textarea className={styles.patientComment} id="comment" value={comment} onChange={handleCommentChange} />
                    <button type="submit" className={styles.patientButton}>Submit Comment</button>
                  </form>
            
                    </div>
          <div>
          <div className={styles.containerPatientDashboard}>
            <h3 className={styles.patientSubheading}>File Upload</h3>
            <input type="file" className={styles.fileInput} onChange={handleFileChange} />
            <input type="text" className={styles.patientInput} placeholder="Patient ID" value={patientId} onChange={handlePatientIdChange} />
            <input type="text" className={styles.doctorInput} placeholder="Doctor ID" value={doctorId} onChange={handleDoctorIdChange} />
            <button onClick={handleFileUpload} type='submit' className={styles.patientButton}>Upload</button>
          </div>
          </div>
          <div className={styles.containerPatientDashboard}>
          {/* Display uploaded documents */}
          <h3 className={styles.patientSubheading}>Uploaded Documents</h3>
          <div className={styles.fileInputContainerPatient}>
            <ul className={styles.patientList}>
              {documents.map((document, index) => (
                <li key={index}>
                  <a href={`http://localhost:3001/${document.file_path}`} target="_blank" rel="noopener noreferrer">
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
}

export default App;
