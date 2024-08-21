import React, { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './UserForm.css';

const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Lakshadweep",
  "Delhi",
  "Puducherry"
];
const roles = ["Production", "Developer", "Tester"];
const activities = ["QC", "PROD"]; 

const UserForm = ({ addUser, editingUser, saveUser }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    vendor: '',
    userName: '',
    userId: '',
    password: '',
    employeeCode: '',
    State: '',
    role: '',
    userActivity: '',
    contactNo: '',
    userIP: '',
    emailId: '',
    joiningDate: '',
    activeIndex: true,
  });
  useEffect(() => {
    if (editingUser) {
      setUser(editingUser);
    }
  }, [editingUser]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser({
      ...user,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingUser) {
      saveUser(user);
    } else {
      addUser(user);
    }
    navigate('/user-table');
  };

  return (
    <div className="user-form-container">
      <h2>User Management</h2>
      <div className="form-actions">
        <button className="add-user-btn">Add New User</button>
        <div className="file-upload-section">
          <label htmlFor="file-upload" className="file-upload-label">Upload files</label>
          <input type="file" id="file-upload" className="file-upload-input" />
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
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
              name="userName"
              value={user.userName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>User ID</label>
            <input
              type="text"
              name="userId"
              value={user.userId}
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
              name="employeeCode"
              value={user.employeeCode}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Select State</label>
            <select
              name="State"
              value={user.State}
              onChange={handleChange}
              required
            >
              <option value="">Select State</option>
              {states.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
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
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>User Activity</label>
            <select
              name="userActivity"
              value={user.userActivity}
              onChange={handleChange}
              required
            >
              <option value="">Select Activity</option>
              {activities.map(activity => (
                <option key={activity} value={activity}>{activity}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Contact No</label>
            <input
              type="text"
              name="contactNo"
              value={user.contactNo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>User IP</label>
            <input
              type="text"
              name="userIP"
              value={user.userIP}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email ID</label>
            <input
              type="email"
              name="emailId"
              value={user.emailId}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Joining Date</label>
            <input
              type="date"
              name="joiningDate"
              value={user.joiningDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Active Index</label>
            <input
              type="checkbox"
              name="activeIndex"
              checked={user.activeIndex}
              onChange={handleChange}
            />
          </div>
        </div>
        <button type="submit" className="update-btn">{editingUser ? 'Update' : 'Submit'}</button>
      </form>
    </div>
  );
};

export default UserForm;
