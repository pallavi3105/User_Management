// server/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./db'); 

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Endpoint to create a new user
app.post('/api/users', async (req, res) => {
  const { vendor, userName, userId, password, employeeCode, State, role, userActivity, contactNo, userIP, emailId, joiningDate, activeIndex } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO users (vendor, userName, userId, password, employeeCode, state, role, userActivity, contactNo, userIP, emailId, joiningDate, activeIndex) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
      [vendor, userName, userId, password, employeeCode, State, role, userActivity, contactNo, userIP, emailId, joiningDate, activeIndex]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).send('Server error');
  }
});

// Endpoint to get all users
app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Server error');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
