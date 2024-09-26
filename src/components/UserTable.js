import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEllipsisV, FaSave, FaEdit, FaTrashAlt, FaEye } from 'react-icons/fa';
import Modal from 'react-modal';
import './UserTable.css';

Modal.setAppElement('#root'); // Important for accessibility when using Modal

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menu, setMenu] = useState(null); // State to track which menu is open
  const [modalIsOpen, setModalIsOpen] = useState(false); // Modal state
  const [userActions, setUserActions] = useState([]); // User actions state
  const [selectedUser, setSelectedUser] = useState(null); // Selected user for actions
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

  const openModal = async (userId) => {
    try {
      const date = new Date().toISOString().split('T')[0]; // Today's date
      const response = await fetch(`http://localhost:5000/api/users/${userId}/actions?date=${date}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user actions');
      }
      const actions = await response.json();
      setUserActions(actions);
      setSelectedUser(userId);
      setModalIsOpen(true);
    } catch (error) {
      console.error('Error fetching user actions:', error);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setUserActions([]);
    setSelectedUser(null);
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
                <td className="action-menu">
                  <button onClick={() => handleMenuClick(user.userid)} className="menu-btn">
                    <FaEllipsisV />
                  </button>
                  <div className={`menu-options ${menu === user.userid ? 'show' : ''}`}>
                    <button onClick={() => handleSave(user)}>
                      <FaSave /> Save
                    </button>
                    <button onClick={() => handleEdit(user)}>
                      <FaEdit /> Edit
                    </button>
                    <button onClick={() => handleDelete(user.userid)}>
                      <FaTrashAlt /> Delete
                    </button>
                    <button onClick={() => openModal(user.userid)}>
                      <FaEye /> View Actions
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="16" className="text-center">No users available</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal for showing user actions */}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="modal-content" overlayClassName="modal-overlay">
        <h2>User Actions for {selectedUser}</h2>
        <ul>
          {userActions.length > 0 ? (
            userActions.map(action => (
              <li key={action.id}>
                {action.action} - {new Date(action.action_date).toLocaleString()}
              </li>
            ))
          ) : (
            <li>No actions recorded for today.</li>
          )}
        </ul>
        <button onClick={closeModal} className="close-btn">Close</button>
      </Modal>
    </div>
  );
};

export default UserTable;
