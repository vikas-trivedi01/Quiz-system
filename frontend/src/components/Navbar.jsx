import { useContext, useState } from "react";
import "../styles/navbar.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faRectangleList,
  faSquarePlus,
  faTerminal,
} from "@fortawesome/free-solid-svg-icons";

import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import userContext from "../context/UserContext.js";
import { BACKEND_URL } from "../assets/constants.js";
import { refreshAccessToken } from "../assets/tokens.js";


const Navbar = () => {
  const [quizzesOpen, setQuizzesOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

  const { setIsAuthenticated, role } = useContext(userContext);

  const navigate = useNavigate();

  const toggleQuizzesDropdown = (e) => {
    e.preventDefault();
    setQuizzesOpen(!quizzesOpen);
  };
  const toggleInfoDropdown = (e) => {
    e.preventDefault();
    setInfoOpen(!infoOpen);
  };

  const logout = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/users/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      if (response.data.statusCode == 200) {
        alert("You are logged out");
        setIsAuthenticated(false);
        navigate("/users/login");
      }
    } catch (error) {
      if (error?.response?.status == 401) {
        try {
          await refreshAccessToken();
          await logout();
        } catch (refreshError) {
          alert("Please try logout after login again");
          navigate("/users/login");
        }
      } else {
        alert(error?.message);
      }
    }
  };

  const login = () => {
    navigate("/users/login");
  }

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
            onClick={toggleQuizzesDropdown}
            data-toggle="dropdown"
          >
            Quizzes{" "}
            {quizzesOpen ? (
              <FontAwesomeIcon icon={faChevronUp} className="ms-1" />
            ) : (
              <FontAwesomeIcon icon={faChevronDown} className="ms-1" />
            )}
          </NavLink>

          <div
            className={`dropdown-menu${
              quizzesOpen ? " show" : ""
            } bg-dark px-3 py-4 mt-3 ms-5`}
          >
            {role == "user" ? (
              <>
                <NavLink
                  to="/quizzes/quizcode"
                  className="dropdown-item bg-light text-dark mb-3 mb-3"
                >
                  Join Via Code{" "}
                  <FontAwesomeIcon icon={faTerminal} className="ms-3" />
                </NavLink>

                <NavLink
                  to="/quizzes/quizlist"
                  className="dropdown-item bg-light text-dark mb-3"
                >
                  Join From List{" "}
                  <FontAwesomeIcon icon={faRectangleList} className="ms-3" />
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/quizzes/create"
                  className="dropdown-item bg-light text-dark mb-3"
                >
                  Create Quiz{" "}
                  <FontAwesomeIcon icon={faSquarePlus} className="ms-4" />
                </NavLink>

                <NavLink
                  to="/quizzes/allquizzes"
                  className="dropdown-item bg-light text-dark"
                >
                  My Quizzes{" "}
                  <FontAwesomeIcon icon={faRectangleList} className="ms-4" />
                </NavLink>
              </>
            )}
          </div>
        </li>


        <li className="nav-item dropdown">
          <NavLink
            to="/info"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active-nav-link" : ""}`
            }
            onClick={toggleInfoDropdown}
            data-toggle="dropdown"
          >
            Know More{" "}
            {infoOpen ? (
              <FontAwesomeIcon icon={faChevronUp} className="ms-1" />
            ) : (
              <FontAwesomeIcon icon={faChevronDown} className="ms-1" />
            )}
          </NavLink>

          <div
            className={`text-center dropdown-menu${
              infoOpen ? " show" : ""
            } bg-dark px-5 py-2 mt-3 ms-5`}
          >
              <>
                <NavLink
                  to="/info/about"
                  className="dropdown-item bg-light text-dark mb-3 mb-3"
                >
                 About{" "}
                </NavLink>

                <NavLink
                  to="/info/terms"
                  className="dropdown-item bg-light text-dark mb-3 mb-3"
                >
                 Terms{" "}
                </NavLink>

                <NavLink
                  to="/info/privacy"
                  className="dropdown-item bg-light text-dark mb-3 mb-3"
                >
                 Privacy Policy{" "}
                </NavLink>
              </>
            </div>
          </li>
        
        {role != undefined ? ( <li className="nav-item">
          <NavLink
            to={"/profile/" + role }
            className={({ isActive }) =>
              `nav-link ${isActive ? "active-nav-link" : ""}`
            }
          >
             My Profile
          </NavLink>
        </li>) : null }

        {role != undefined ? (
          <li className="nav-item">
            <button onClick={() => logout()} className="nav-btn" >
              Logout
            </button>
          </li>
        ) : 
          <li className="nav-item">
            <button onClick={() => login()} className="nav-btn">
              Get Started
            </button>
          </li>
        }
      </ul>
    </nav>
  );
};

export default Navbar;
