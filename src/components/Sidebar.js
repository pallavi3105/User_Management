// import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBars, faTachometerAlt, faUsers, faCog } from '@fortawesome/free-solid-svg-icons';
// import { Link } from 'react-router-dom';
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
//           <Link to="/">
//             <FontAwesomeIcon icon={faTachometerAlt} />
//             <span className="menu-text">Dashboard</span>
//           </Link>
//         </li>
//         <li>
//           <Link to="/user-table">
//             <FontAwesomeIcon icon={faUsers} />
//             <span className="menu-text">Users</span>
//           </Link>
//         </li>
//         <li>
//           <Link to="/settings">
//             <FontAwesomeIcon icon={faCog} />
//             <span className="menu-text">Settings</span>
//           </Link>
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
