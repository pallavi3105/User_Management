// import React, { useState, useEffect } from 'react';
// import './Dashboard.css';
// import UserForm from './UserForm'; // Import UserForm component

// const Dashboard = () => {
//   const [totalUsers, setTotalUsers] = useState(0);
//   const [activeUsers, setActiveUsers] = useState(0);
//   const [inactiveUsers, setInactiveUsers] = useState(0);

//   useEffect(() => {
//     // Fetch the counts from the backend API
//     fetch('http://localhost:5000/api/users/counts')
//       .then(response => response.json())
//       .then(data => {
//         setTotalUsers(data.totalUsers);
//         setActiveUsers(data.activeUsers);
//         setInactiveUsers(data.inactiveUsers);
//       })
//       .catch(error => console.error('Error fetching user counts:', error));
//   }, []);

//   return (
//     <div className="dashboard-container">
//       <div className="cards-container">
//         <div className="card">
//           <h3>Total Users</h3>
//           <p>{totalUsers}</p>
//         </div>
//         <div className="card">
//           <h3>Active Users</h3>
//           <p>{activeUsers}</p>
//         </div>
//         <div className="card">
//           <h3>Inactive Users</h3>
//           <p>{inactiveUsers}</p>
//         </div>
//       </div>
//       {/* Place UserForm below the cards */}
//       <UserForm />
//     </div>
//   );
// };

// export default Dashboard;
import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import UserForm from './UserForm'; // Import UserForm component

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [inactiveUsers, setInactiveUsers] = useState(0);

  useEffect(() => {
    // Fetch the counts from the backend API
    fetch('http://localhost:5000/api/users/counts')
      .then(response => response.json())
      .then(data => {
        setTotalUsers(data.totalUsers);
        setActiveUsers(data.activeUsers);
        setInactiveUsers(data.inactiveUsers);
      })
      .catch(error => console.error('Error fetching user counts:', error));
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
      </div>
      <div className="cards-container">
        <div className="card">
          <h3>Total Users</h3>
          <p>{totalUsers}</p>
        </div>
        <div className="card">
          <h3>Active Users</h3>
          <p>{activeUsers}</p>
        </div>
        <div className="card">
          <h3>Inactive Users</h3>
          <p>{inactiveUsers}</p>
        </div>
      </div>
      {/* Place UserForm below the cards */}
      <UserForm />
    </div>
  );
};

export default Dashboard;
