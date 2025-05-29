import { useState } from "react";
import "../styles/navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleList, faTerminal } from "@fortawesome/free-solid-svg-icons";

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
          {/* <a href="index.html" className="nav-link">
            Home
          </a> */}
          <NavLink to="/"
            className={ isActive => {
              `nav-link ${isActive ? "active-nav-link" : ""} `
            }}
          >
            Home
          </NavLink>
        </li>
        <li className="nav-item dropdown">
          {/* <a
            href="#"
            className="nav-link dropdown-toggle"
            onClick={toggleDropdown}
            data-toggle="dropdown"
            >
            Quizzes
            </a> */}
        <NavLink to="/quizzes"
            className={ isActive => {
              `nav-link dropdown-toggle ${isActive ? "active-nav-link" : ""}`
            }}
            
            onClick={toggleDropdown}
            data-toggle="dropdown"
            >

            Quizzes
          </NavLink>
          <div className={`dropdown-menu${open ? " show" : ""} bg-dark p-3`}>
            {/* <a className="dropdown-item">
              Join via code{" "}
              <FontAwesomeIcon icon={faTerminal} className="ms-3" />
              </a> */}
        <NavLink to="/quizzes/quizcode"
            className= "dropdown-item"
            >
            Join via code{" "}
              <FontAwesomeIcon icon={faTerminal} className="ms-3" />

          </NavLink>

            
            {/* <a className="dropdown-item" href="#">
              Join from list{" "}
              <FontAwesomeIcon icon={faRectangleList} className="ms-3" />
              </a> */}
        <NavLink to="/quizzes/quizlist"
            className= "dropdown-item"
            >
              Join from list{" "}
              <FontAwesomeIcon icon={faRectangleList} className="ms-3" />
          </NavLink>
          </div>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">
            Your Progress
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">
            About Us
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
