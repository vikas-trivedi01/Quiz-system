import "../styles/footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer-container">
      <NavLink to="quizzes/quizlist" id="footer-btn" className="btn">
        Level Up Your Knowledge &gt;
      </NavLink>

      <ul id="footer-pages-list">
        <li className="footer-link-container">
          <NavLink
            to="/"
            className={({ isActive }) => `${isActive ? "active-nav-link" : ""}`}
          >
            Home
          </NavLink>{" "}
        </li>
        <li className="footer-link-container">
          <NavLink
            to="/terms"
            className={({ isActive }) =>
              `${isActive ? "active-nav-link" : ""}`
            }
          >
            Terms
          </NavLink>
        </li>
        <li className="footer-link-container">
          <NavLink
            to="/privacy"
            className={({ isActive }) => `${isActive ? "active-nav-link" : ""}`}
          >
            Privacy Policy
          </NavLink>
        </li>
        <li className="footer-link-container">
          <a href="#">About Us</a>
        </li>
      </ul>

      <p className="text-center">
        Empowering Smarter Learning Experiences, With Just One Quiz at a Time.
      </p>

      <div className="text-center footer-container">
        <span>
          Made with{" "}
          <FontAwesomeIcon
            icon={faHeartCircleCheck}
            size="lg"
            style={{ color: "#fff" }}
          />{" "}
          by <strong>QuizGenius</strong>
          <br />
          <span> {currentYear} &copy; QuizGenius. All rights reserved.</span>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
