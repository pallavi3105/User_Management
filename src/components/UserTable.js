import React from 'react';
import { FaEdit, FaTrashAlt, FaSave } from 'react-icons/fa'; // Corrected import for trash icon
import './UserTable.css';

const UserTable = ({ users, onEdit, onDelete, onSave }) => {
  return (
    <div className="user-table-container">
      <h2>User Information</h2>
      <table>
        <thead>
          <tr>
            <th>Select Vendor</th>
            <th>User Name</th>
            <th>User ID</th>
            <th>Employee Code</th>
            <th>State</th>
            <th>Role</th>
            <th>User Activity</th>
            <th>Contact No</th>
            <th>User IP</th>
            <th>Email ID</th>
            <th>Joining Date</th>
            <th>Active Index</th>
            <th>Action</th> {/* Action column moved to the end */}
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.vendor}</td>
              <td>{user.userName}</td>
              <td>{user.userId}</td>
              <td>{user.employeeCode}</td>
              <td>{user.State}</td>
              <td>{user.role}</td>
              <td>{user.userActivity}</td>
              <td>{user.contactNo}</td>
              <td>{user.userIP}</td>
              <td>{user.emailId}</td>
              <td>{user.joiningDate}</td>
              <td>{user.activeIndex ? 'Yes' : 'No'}</td>
              <td>
                <button onClick={() => onEdit(user)}>
                  <FaEdit />
                </button>
                <button onClick={() => onDelete(user.userId)}>
                  <FaTrashAlt />
                </button>
                <button onClick={() => onSave(user)}>
                  <FaSave />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
