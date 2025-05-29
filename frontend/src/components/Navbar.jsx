import { useState } from "react";
import "../styles/navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faRectangleList, faTerminal } from "@fortawesome/free-solid-svg-icons";

import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const toggleDropdown = (e) => {
    e.preventDefault();
    setOpen(!open);
  };

  return (
    <nav>
      <ul id="nav-ul">


        <li className="nav-item">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active-nav-link" : ""}`
            }
          >
            Home
          </NavLink>
        </li>


        <li className="nav-item dropdown">
          <NavLink
            to="/quizzes"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active-nav-link" : ""}`
            }
            onClick={toggleDropdown}
            data-toggle="dropdown"
          >
            Quizzes{" "}
            { open ? 
              <FontAwesomeIcon icon={faChevronUp} className="ms-1" /> :
              <FontAwesomeIcon icon={faChevronDown} className="ms-1" />  
             }
             
          </NavLink>

          <div className={`dropdown-menu${open ? " show" : ""} bg-dark p-3`}>
            
            <NavLink to="/quizzes/quizcode" className="dropdown-item bg-light text-dark mb-3">
              Join via code{" "}
              <FontAwesomeIcon icon={faTerminal} className="ms-3" />
            </NavLink>

            <NavLink to="/quizzes/quizlist" className="dropdown-item bg-light text-dark">
              Join from list{" "}
              <FontAwesomeIcon icon={faRectangleList} className="ms-3" />
            </NavLink>

          </div>
        </li>


        <li className="nav-item">
          <NavLink
            to="/terms"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active-nav-link" : ""}`
            }
          >
            Terms
          </NavLink>
        </li>


        <li className="nav-item">
          <NavLink
            to="/privacy"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active-nav-link" : ""}`
            }
          >
            Privacy Policy
          </NavLink>
        </li>


      </ul>
    </nav>
  );
};

export default Navbar;
