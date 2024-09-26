const express = require('express');
const cors = require('cors');
const path = require('path'); // Import path module to serve the React build
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'build'))); 

app.use(cors());
app.use(express.json());

// Email transporter configuration
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send email
const sendEmail = (user) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender address
    to: user.emailid, // List of recipients
    subject: 'Your User Account Details', // Subject line
    text: `Dear ${user.username},\n\nYour account has been created.\n\nUser ID: ${user.userid}\nPassword: ${user.password}\n\nThank you!\nTeam`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error('Error sending email:', error);
    }
    console.log('Email sent:', info.response);
  });
};

// Fetch schemas
app.get('/api/schemas', async (req, res) => {
  try {
    const schemasResult = await pool.query(`
      SELECT schema_name 
      FROM information_schema.schemata 
      WHERE schema_name NOT IN ('information_schema', 'pg_catalog')
    `);
    res.json(schemasResult.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching schemas' });
  }
});

// Fetch tables for a given schema
app.get('/api/tables/:schema', async (req, res) => {
  const { schema } = req.params;
  try {
    const tablesResult = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = $1
    `, [schema]);
    res.json(tablesResult.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching tables' });
  }
});

// Fetch user counts
app.get('/api/users/counts', async (req, res) => {
  try {
    const totalUsersResult = await pool.query('SELECT COUNT(*) FROM "UserData".users');
    const activeUsersResult = await pool.query('SELECT COUNT(*) FROM "UserData".users WHERE activeindex = true');
    const inactiveUsersResult = await pool.query('SELECT COUNT(*) FROM "UserData".users WHERE activeindex = false');

    res.json({
      totalUsers: parseInt(totalUsersResult.rows[0].count, 10),
      activeUsers: parseInt(activeUsersResult.rows[0].count, 10),
      inactiveUsers: parseInt(inactiveUsersResult.rows[0].count, 10),
    });
  } catch (err) {
    console.error('Error fetching user counts:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Fetch all users
app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "UserData".users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add a new user
app.post('/api/users', async (req, res) => {
  const user = req.body;
  console.log('Received user data:', user);

  const query = `
    INSERT INTO "UserData".users (
      vendor,
      username,
      userid,
      password,
      employeecode,
      state,
      role,
      useractivity,
      contactno,
      userip,
      emailid,
      joiningdate,
      activeindex,
      schema,
      table_name
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
    RETURNING *;
  `;

  try {
    const result = await pool.query(query, [
      user.vendor,
      user.username,
      user.userid,
      user.password,
      user.employeecode,
      user.state,
      user.role,
      user.useractivity,
      user.contactno,
      user.userip,
      user.emailid,
      user.joiningdate,
      user.activeindex,
      user.schema,
      user.table_name,
    ]);

    console.log('User added:', result.rows[0]);

    sendEmail(user); // Send email after user is added

    res.status(201).json({ message: 'User added and email sent', user: result.rows[0] });
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update an existing user
app.put('/api/users/:id', async (req, res) => {
  const userId = req.params.id;
  const user = req.body;
  const query = `
    UPDATE "UserData".users SET
      vendor = $1,
      username = $2,
      password = $3,
      employeecode = $4,
      state = $5,
      role = $6,
      useractivity = $7,
      contactno = $8,
      userip = $9,
      emailid = $10,
      joiningdate = $11,
      activeindex = $12,
      schema = $13,
      table_name = $14
    WHERE userid = $15
  `;
  
  try {
    await pool.query(query, [
      user.vendor,
      user.username,
      user.password,
      user.employeecode,
      user.state,
      user.role,
      user.useractivity,
      user.contactno,
      user.userip,
      user.emailid,
      user.joiningdate,
      user.activeindex,
      user.schema,
      user.table_name,
      userId
    ]);
    sendEmail(user); // Send an email after user update
    res.json({ message: 'User updated and email sent' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Error updating user' });
  }
});

// Delete a user
app.delete('/api/users/:userid', async (req, res) => {
  try {
    const { userid } = req.params;
    const result = await pool.query('DELETE FROM "UserData".users WHERE userid = $1 RETURNING *', [userid]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// New API to fetch data by joining user_sessions and user_access
app.get('/api/user-sessions-access', async (req, res) => {
  try {
    const query = `
      SELECT 
        us.user_id, us.username,us.ip_address, us.login_time, us.logout_time, 
        ua.access_type, ua.file_name, ua.access_time, ua.access_duration, ua.lgd_code
      FROM user_sessions us
      JOIN user_access ua ON us.user_id = ua.u_id
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching user sessions and access data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/users/:userid/actions', async (req, res) => {
  const userId = req.params.userid;
  const { date } = req.query;  // Expecting a 'date' query parameter

  console.log('User ID:', userId);
  console.log('Date:', date);

  try {
    const query = `
      SELECT 
        us.user_id, 
        us.username, 
        us.ip_address, 
        us.login_time, 
        us.logout_time, 
        ua.access_type, 
        ua.file_name, 
        ua.access_time, 
        ua.access_duration
      FROM 
        "UserData".user_sessions us
      LEFT JOIN 
        "UserData".user_access ua 
      ON 
        us.user_id = ua.user_id
      WHERE 
        us.user_id = 242
        AND DATE(ua.access_time) = '2023-09-26'
    `;

    const values = [userId, date];  // Pass user ID and date as parameters
    const result = await pool.query(query, values);  // Execute query using your DB connection
    res.json(result.rows);  // Return the rows as JSON
  } catch (error) {
    console.error('Error fetching user actions:', error);
    res.status(500).json({ error: 'Server error' });
  }
});



// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
