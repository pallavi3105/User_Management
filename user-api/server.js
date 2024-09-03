const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer'); // Add nodemailer
const app = express();
const port = 5000;

const pool = new Pool({
  user: 'user_it',
  host: '192.168.1.91',
  database: 'DEV',
  password: 'Qawsed*&^%',
  port: 5432,
});

app.use(cors());
app.use(bodyParser.json());

// Email transporter configuration
const transporter = nodemailer.createTransport({
  host: 'smtpout.secureserver.net', // GoDaddy SMTP server
  port: 465, // Secure port for SMTP
  secure: true, // Use TLS
  auth: {
    user: 'pallavi.a@quantasip.com', // Replace with your GoDaddy email
    pass: 'Pallavi@24', // Replace with your GoDaddy email password
  },
});

// Function to send email
const sendEmail = (user) => {
  const mailOptions = {
    from: 'pallavi.a@quantasip.com', // Sender address
    to: user.emailid, // List of recipients
    subject: 'Your User Account Details', // Subject line
    text: `Dear ${user.username},\n\nYour account has been created.\n\nUser ID: ${user.userid}\nPassword: ${user.password}\n\nThank you!\nTeam`, // Plain text body
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

    // Send detailed error message
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
    res.json({ message: 'User updated' });
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

app.listen(port, () => {
  console.log(`API server running on http://localhost:${port}`);
});
