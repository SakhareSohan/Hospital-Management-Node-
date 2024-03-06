const db = require('../models/db');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const path = require('path');
const qr = require('qrcode');
const { Web3 } = require('web3');
const contractAbi = require('./HealthcareSmartContractABI.json'); // Load ABI from JSON file
const contractAddress = '0x7B48e9b985982f86601d168bFe514b1f07328b06'; // Replace with your contract address
const web3 = new Web3('http://localhost:7545');

// Instantiate the contract instance
const contractInstance = new web3.eth.Contract(contractAbi, contractAddress);

// Ensure that web3 is connected to the network
web3.eth.net.isListening()
  .then(() => console.log('Web3 is connected'))
  .catch(err => console.error('Error connecting to Web3:', err));

// Controller function for patient registration
exports.registerPatient = (req, res) => {
  const uuid = uuidv4();
  const { name, age, contact, password } = req.body;
  
  const newPatient = { uuid, name, age, contact, password };

  // SQL query to insert a new patient into the database
  const sql = 'INSERT INTO patients SET ?';
  
  // Execute the SQL query with patient information
  db.query(sql, newPatient, (err, result) => {
    if (err) {
      // If an error occurs, send an error response
      console.error('Error registering patient:', err);
      res.status(500).json({ error: 'Error registering patient' });
    } else {
      // If registration is successful, send a success response
      res.status(201).json({ message: 'Patient registered successfully', newPatient });
      console.log(newPatient);
    }
  });
};

exports.updatePatientComment = (req, res) => {
  const { uuid } = req.params;
  const { comment } = req.body;

  const sql = 'UPDATE patients SET comment = ? WHERE uuid = ?';
  // Call the model function to update the patient's comment
  db.query(sql, [comment, uuid], (err, result) => {
    if (err) {
      // If an error occurs, send an error response
      console.error('Error updating patient comment:', err);
      res.status(500).json({ error: 'Error updating patient comment' });
    } else {
      // If the comment is updated successfully, send a success response
      res.status(200).json({ message: 'Patient comment updated successfully' });
    }
  });
};

exports.patientLogin = (req, res) => {
  const { uuid, password } = req.body;
  const sql = 'SELECT * FROM patients WHERE uuid = ? AND password = ?';
  db.query(sql, [uuid, password], (err, result) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    if (result.length === 1) {
      const { uuid } = result[0]; // Retrieve UUID from the database result
      res.status(200).json({ uuid, message: 'Login successful' }); // Send UUID along with success message
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });
};


const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/'); // specify the directory where uploaded files should be stored
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // generate a unique filename
    }
  }),
  limits: { fileSize: 1000000 }, // limit file size to 1MB
});

exports.uploadDocument = (req, res) => {
  upload.single('file')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: err.message });
    } else if (err) {
      return res.status(500).json({ error: 'Unknown error occurred' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Extract additional data from request body
    const { patientId, doctorId } = req.body;
    const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');

    // Save the file path and additional data to the database
    const filePath = req.file.path;

    contractInstance.methods.uploadPatientReport(patientId, filePath)
      .send({ from: '0xd35f64b830503c21ABd33C1bbAA6586B6db18F63', gas: 500000 }) // Replace with doctor's Ethereum address
      .on('transactionHash', function(hash){
        console.log('Transaction Hash:', hash);

        web3.eth.getTransaction(hash).then((tx) => {
          if (tx && tx.blockNumber) {
            const blockNumber = tx.blockNumber;
            
            // Save transaction details to the database
            const sql = 'INSERT INTO documents (patient_uuid, doctor_id, file_path, timestamp, isValid, transactionHash) VALUES (?, ?, ?, ?, ?, ?)';
            db.query(sql, [patientId, doctorId, filePath, timestamp, true, hash], (err, result) => {
              if (err) {
                console.error('Error saving transaction information to database:', err);
                return res.status(500).json({ error: 'Error saving transaction information to database' });
              }
              res.status(200).json({ message: 'File uploaded successfully', filePath: filePath });
            });
          } else {
            console.error('Block number not found for transaction:', hash);
            return res.status(500).json({ error: 'Block number not found for transaction' });
          }
        })
        .catch((err) => {
          console.error('Error retrieving transaction details:', err);
          return res.status(500).json({ error: 'Error retrieving transaction details' });
        });
    })

    .on('error', function(error){
      console.error('Error uploading document to smart contract:', error);
      res.status(500).json({ error: 'Error uploading document to smart contract' });
    });  
  });
};

exports.getPatientDetailsAndDocuments = (req, res) => {
  const { uuid } = req.params;

  // SQL query to retrieve patient details
  const patientDetailsSql = 'SELECT * FROM patients WHERE uuid = ?';

  // SQL query to retrieve documents associated with the patient
  const documentsSql = 'SELECT * FROM documents WHERE patient_uuid = ? AND isValid = 1';

  // Execute both SQL queries
  db.query(patientDetailsSql, [uuid], (err, patientDetailsResult) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching patient details' });
    }

    if (patientDetailsResult.length === 0) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    const patientDetails = patientDetailsResult[0];

    db.query(documentsSql, [uuid], async (err, documentsResult) => {
      if (err) {
        return res.status(500).json({ error: 'Error fetching documents for patient' });
      }

      try {
        // Generate QR code based on UUID
        const qrCode = await qr.toDataURL(uuid);

        // Combine patient details, documents, and QR code into a single response object
        const responseData = {
          patientDetails: patientDetails,
          documents: documentsResult,
          qrCode: qrCode // Include QR code in the response
        };

        res.status(200).json(responseData);
      } catch (error) {
        console.error('Error generating QR code:', error);
        res.status(500).json({ error: 'Error generating QR code' });
      }
    });
  });
};
