import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import UserForm from './components/UserForm';
import UserTable from './components/UserTable';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const addUser = (user) => {
    setUsers([...users, user]);
  };

  const editUser = (user) => {
    setEditingUser(user);
  };

  const saveUser = (updatedUser) => {
    setUsers(users.map(user => (user.userId === updatedUser.userId ? updatedUser : user)));
    setEditingUser(null);
  };

  const deleteUser = (userId) => {
    setUsers(users.filter(user => user.userId !== userId));
  };

  return (
    <Router>
      <div className="app-container">
        <Header />
        <div className="main-content">
          <Sidebar />
          <div className="content">
            <Routes>
              <Route
                path="/"
                element={<UserForm addUser={addUser} editingUser={editingUser} saveUser={saveUser} />}
              />
              <Route
                path="/user-table"
                element={<UserTable users={users} onEdit={editUser} onDelete={deleteUser} onSave={saveUser} />}
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
