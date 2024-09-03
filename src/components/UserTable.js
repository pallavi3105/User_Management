import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEllipsisV, FaSave, FaEdit, FaTrashAlt } from 'react-icons/fa';
import './UserTable.css';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading,  setLoading] = useState(true);
  const [menu, setMenu] = useState(null); // State to track which menu is open
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) {
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Server error: ${errorData.error || response.statusText}`);
      }
  
      // Remove the deleted user from the state
      setUsers(users.filter(user => user.userid !== userId));
      alert('User deleted successfully');
  
    } catch (error) {
      console.error('Error deleting user:', error);
      alert(`Error: ${error.message}`);
    }
  };
  
  const handleEdit = (user) => {
    navigate('/user-form', { state: { user, editing: true } });
  };

  const handleSave = async (user) => {
    try {
      // Assuming there's a method to save the user details
      const response = await fetch(`http://localhost:5000/api/users/${user.userid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Server error: ${errorData.error}`);
      }
  
      alert('User saved successfully');
    } catch (error) {
      console.error('Error saving user:', error);
      alert(`Error: ${error.message}`);
    }
  };
  
  

  const handleMenuClick = (userId) => {
    setMenu(menu === userId ? null : userId); // Toggle menu visibility
  };

  const handleAddUser = () => {
    navigate('/user-form', { state: { editing: false } });
  };

  return (
    <div className="user-table-container">
      <h2>User Information</h2>
      <button onClick={handleAddUser} className="add-user-btn">Add New User</button>
      <table>
        <thead>
          <tr>
            <th>Vendor</th>
            <th>User Name</th>
            <th>User ID</th>
            <th>Password</th>
            <th>Employee Code</th>
            <th>State</th>
            <th>Role</th>
            <th>User Activity</th>
            <th>Contact No</th>
            <th>User IP</th>
            <th>Email ID</th>
            <th>Joining Date</th>
            <th>Active Index</th>
            <th>Schema</th>
            <th>Table</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map(user => (
              <tr key={user.userid}>
                <td>{user.vendor || 'N/A'}</td>
                <td>{user.username || 'N/A'}</td>
                <td>{user.userid || 'N/A'}</td>
                <td>{user.password || 'N/A'}</td>
                <td>{user.employeecode || 'N/A'}</td>
                <td>{user.state || 'N/A'}</td>
                <td>{user.role || 'N/A'}</td>
                <td>{user.useractivity || 'N/A'}</td>
                <td>{user.contactno || 'N/A'}</td>
                <td>{user.userip || 'N/A'}</td>
                <td>{user.emailid || 'N/A'}</td>
                <td>{user.joiningdate || 'N/A'}</td>
                <td>{user.activeindex ? 'Yes' : 'No'}</td>
                <td>{user.schema || 'N/A'}</td>
                <td>{user.table_name || 'N/A'}</td>
                <td>
                  <div className="action-menu">
                  <button className="menu-btn" onClick={() => handleMenuClick(user.userid)}>
                      <FaEllipsisV />
                    </button>
                    {menu === user.userid && (
                      <div className="menu-options">
                        <button onClick={() => handleSave(user)}>
                          <FaSave /> Save
                        </button>
                        <button onClick={() => handleEdit(user)}>
                          <FaEdit /> Update
                        </button>
                        <button onClick={() => handleDelete(user.userid)}>
                          <FaTrashAlt /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="16">No users available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
