import { useContext, useState } from "react";
import "../styles/navbar.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faRectangleList,
  faSquareCheck,
  faSquarePlus,
  faTerminal,
} from "@fortawesome/free-solid-svg-icons";

import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import userContext from "../context/UserContext.js";
import { BACKEND_URL } from "../assets/constants";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const { setIsAuthenticated, role } = useContext(userContext);

  const navigate = useNavigate();

  const toggleDropdown = (e) => {
    e.preventDefault();
    setOpen(!open);
  };

  const logout = async () => {
    try {
      const response  = await axios.post(`${BACKEND_URL}/users/logout`,{}, {
        withCredentials: true
      });

      if (response.data.statusCode == 200) {
        alert("You are logged out");
        setIsAuthenticated(false);
        navigate("/users/login");
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
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
            {open ? (
              <FontAwesomeIcon icon={faChevronUp} className="ms-1" />
            ) : (
              <FontAwesomeIcon icon={faChevronDown} className="ms-1" />
            )}
          </NavLink>

          <div className={`dropdown-menu${open ? " show" : ""} bg-dark px-3 py-4 mt-3 ms-5`}>
            {role == "user" ? (
              <>
                <NavLink
                  to="/quizzes/quizcode"
                  className="dropdown-item bg-light text-dark mb-3 mb-3"
                >
                  Join via code{" "}
                  <FontAwesomeIcon icon={faTerminal} className="ms-3" />
                </NavLink>

                <NavLink
                  to="/quizzes/quizlist"
                  className="dropdown-item bg-light text-dark mb-3"
                >
                  Join from list{" "}
                  <FontAwesomeIcon icon={faRectangleList} className="ms-3" />
                </NavLink>
              </>
            ) 
            
            :
            
            (
              <>
                <NavLink
                  to="/quizzes/create"
                  className="dropdown-item bg-light text-dark mb-3"
                >
                  Create quiz{" "}
                  <FontAwesomeIcon icon={faSquarePlus} className="ms-4" />
                </NavLink>

                <NavLink
                  to="/quizzes/preview"
                  className="dropdown-item bg-light text-dark"
                >
                  Preview quiz{" "}
                  <FontAwesomeIcon icon={faSquareCheck} className="ms-3" />
                </NavLink>
              </>
            )
    }
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

        <li className="nav-item">
          <button onClick={() => logout()} id="logout">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
