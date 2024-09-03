import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import UserForm from './components/UserForm';
import UserTable from './components/UserTable';
import Dashboard from './components/Dashboard';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    // Fetch users when the component mounts
    fetch('http://localhost:5000/api/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const addUser = (user) => {
    fetch('http://localhost:5000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(response => response.json())
      .then(data => {
        setUsers([...users, data]);
      })
      .catch(error => console.error('Error adding user:', error));
  };

  const editUser = (user) => {
    setEditingUser(user);
  };

  const saveUser = (updatedUser) => {
    fetch(`http://localhost:5000/api/users/${updatedUser.userid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    })
      .then(response => response.json())
      .then(data => {
        if (data.userid) {
          setUsers(users.map(user => (user.userid === data.userid ? data : user)));
          setEditingUser(null);
        } else {
          console.error('Error: User data not found');
        }
      })
      .catch(error => console.error('Error updating user:', error));
  };
  

  const deleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      fetch(`http://localhost:5000/api/users/${userId}`, {
        method: 'DELETE',
      })
        .then(() => {
          setUsers(users.filter(user => user.userid !== userId));
        })
        .catch(error => console.error('Error deleting user:', error));
    }
  };

  return (
    <Router>
      <div className="app-container">
        <Header />
        <div className="main-content">
          <Sidebar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route
                path="/user-table"
                element={
                  <UserTable 
                    users={users} 
                    onEdit={editUser} 
                    onDelete={deleteUser} 
                    onSave={saveUser} 
                  />
                }
              />
              <Route
                path="/user-form"
                element={
                  <UserForm 
                    addUser={addUser} 
                    saveUser={saveUser} 
                    editingUser={editingUser}
                  />
                }
              />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
