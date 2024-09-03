import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './UserForm.css';

const UserForm = ({ addUser, saveUser, editingUser }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user: initialUser, editing } = location.state || {};

  const [user, setUser] = useState({
    vendor: '',
    username: '',
    userid: '',
    password: '',
    employeecode: '',
    state: '',
    role: '',
    useractivity: '',
    contactno: '',
    userip: '',
    emailid: '',
    joiningdate: '',
    activeindex: true,
    schema: '',
    table_name: '', // Renamed to match database column name
  });

  const [schemas, setSchemas] = useState([]);
  const [tables, setTables] = useState([]);

  useEffect(() => {
    if (editing && initialUser) {
      setUser(initialUser);
    }
  }, [editing, initialUser]);

  useEffect(() => {
    fetch('http://localhost:5000/api/schemas')
      .then(response => response.json())
      .then(data => {
        setSchemas(data);
      })
      .catch(error => console.error('Error fetching schemas:', error));
  }, []);

  const handleSchemaChange = (e) => {
    const schema = e.target.value;

    setUser({
      ...user,
      schema: schema,
      table_name: '', // Reset table when schema changes
    });

    fetch(`http://localhost:5000/api/tables/${schema}`)
      .then(response => response.json())
      .then(data => {
        setTables(data);
      })
      .catch(error => console.error('Error fetching tables:', error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  // UserForm.js

// UserForm.js

const handleSubmit = async (e) => {
  e.preventDefault();

  const userData = {
    vendor: user.vendor,
    username: user.username,
    userid: user.userid,
    password: user.password,
    employeecode: user.employeecode,
    state: user.state,
    role: user.role,
    useractivity: user.useractivity,
    contactno: user.contactno,
    userip: user.userip,
    emailid: user.emailid,
    joiningdate: user.joiningdate,
    activeindex: user.activeindex,
    schema: user.schema,
    table_name: user.table_name,
  };

  console.log('Submitting user data:', userData); // Add this line

  const endpoint = editing
    ? `http://localhost:5000/api/users/${user.userid}`
    : 'http://localhost:5000/api/users';
  const method = editing ? 'PUT' : 'POST';

  try {
    const response = await fetch(endpoint, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Server error: ${errorData.error}`);
    }

    const result = await response.json();
    console.log('Server response:', result);
    navigate('/user-table');
  } catch (error) {
    console.error('Error submitting user data:', error);
    alert(`Error: ${error.message}`);
  }
};

  

  const handleAddUserClick = () => {
    setUser({
      vendor: '',
      username: '',
      userid: '',
      password: '',
      employeecode: '',
      state: '',
      role: '',
      useractivity: '',
      contactno: '',
      userip: '',
      emailid: '',
      joiningdate: '',
      activeindex: true,
      schema: '',
      table_name: '', // Reset table_name
    });
    navigate('/user-form');
  };

  return (
    <div className="user-form-container">
      <h2>User Management</h2>
      <div className="form-actions">
        <button className="add-user-btn" onClick={handleAddUserClick}>Add New User</button>
        <div className="file-upload-section">
          <label htmlFor="file-upload" className="file-upload-label">Upload files</label>
          <input type="file" id="file-upload" className="file-upload-input" />
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          {/* Existing fields */}
          <div className="form-group">
            <label>Select Vendor</label>
            <input
              type="text"
              name="vendor"
              value={user.vendor}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>User Name</label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>User ID</label>
            <input
              type="text"
              name="userid"
              value={user.userid}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Employee Code</label>
            <input
              type="text"
              name="employeecode"
              value={user.employeecode}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Select State</label>
            <select
              name="state"
              value={user.state}
              onChange={handleChange}
            >
              <option value="">Select State</option>
              {/* Populate with states */}
            </select>
          </div>
          <div className="form-group">
            <label>Select Role</label>
            <select
              name="role"
              value={user.role}
              onChange={handleChange}
              required
            >
              <option value="">Select Role</option>
              <option value="Production">Production</option>
              <option value="Developer">Developer</option>
              <option value="Tester">Tester</option>
            </select>
          </div>
          <div className="form-group">
            <label>Select User Activity</label>
            <select
              name="useractivity"
              value={user.useractivity}
              onChange={handleChange}
              required
            >
              <option value="">Select Activity</option>
              <option value="PROD">PROD</option>
              <option value="QC">QC</option>
              <option value="Digitization">Digitization</option>
              <option value="MIS">MIS</option>
              <option value="Training">Training</option>
              <option value="Team Meetings">Team Meetings</option>
            </select>
          </div>
          <div className="form-group">
            <label>Contact No</label>
            <input
              type="text"
              name="contactno"
              value={user.contactno}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>User IP</label>
            <input
              type="text"
              name="userip"
              value={user.userip}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email ID</label>
            <input
              type="email"
              name="emailid"
              value={user.emailid}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Joining Date</label>
            <input
              type="date"
              name="joiningdate"
              value={user.joiningdate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Active Index</label>
            <input
              type="checkbox"
              name="activeindex"
              checked={user.activeindex}
              onChange={(e) => setUser({ ...user, activeindex: e.target.checked })}
            />
          </div>
        </div>
        {/* Schema and Table Selection */}
        <div className="form-group">
          <label>Select Schema</label>
          <select
            name="schema"
            value={user.schema}
            onChange={handleSchemaChange}
            required
          >
            <option value="">Select Schema</option>
            {schemas.map(schema => (
              <option key={schema.schema_name} value={schema.schema_name}>
                {schema.schema_name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Select Table</label>
          <select
            name="table_name" // Updated to match state and API
            value={user.table_name}
            onChange={handleChange}
            required
            disabled={!user.schema}
          >
            <option value="">Select Table</option>
            {tables.map(table => (
              <option key={table.table_name} value={table.table_name}>
                {table.table_name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="submit-btn">
          {editing ? 'Save Changes' : 'Add User'}
        </button>
      </form>
    </div>
  );
};

export default UserForm;