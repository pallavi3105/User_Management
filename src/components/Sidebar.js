// import React from 'react';
// import './Sidebar.css';

// const Sidebar = () => {
//   return (
//     <aside className="sidebar">
//       <ul>
//         <li><a href="#dashboard">Dashboard</a></li>
//         <li><a href="#users">Users</a></li>
//         <li><a href="#settings">Settings</a></li>
//       </ul>
//     </aside>
//   );
// };

// export default Sidebar;
// import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBars, faTachometerAlt, faUsers, faCog } from '@fortawesome/free-solid-svg-icons';
// import './Sidebar.css';

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(true);

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
//       <div className="sidebar-header">
//         <FontAwesomeIcon icon={faBars} onClick={toggleSidebar} className="menu-icon" />
//       </div>
//       <ul className="sidebar-menu">
//         <li>
//           <FontAwesomeIcon icon={faTachometerAlt} />
//           <span className="menu-text">Dashboard</span>
//         </li>
//         <li>
//           <FontAwesomeIcon icon={faUsers} />
//           <span className="menu-text">Users</span>
//         </li>
//         <li>
//           <FontAwesomeIcon icon={faCog} />
//           <span className="menu-text">Settings</span>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTachometerAlt, faUsers, faCog } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <FontAwesomeIcon icon={faBars} onClick={toggleSidebar} className="menu-icon" />
      </div>
      <ul className="sidebar-menu">
        <li>
          <Link to="/">
            <FontAwesomeIcon icon={faTachometerAlt} />
            <span className="menu-text">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/user-table">
            <FontAwesomeIcon icon={faUsers} />
            <span className="menu-text">Users</span>
          </Link>
        </li>
        <li>
          <Link to="/settings">
            <FontAwesomeIcon icon={faCog} />
            <span className="menu-text">Settings</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
