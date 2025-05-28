import "../styles/footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartCircleCheck } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer-container">
      <button className="btn" id="footer-btn">
        Level Up Your Knowledge &gt;
      </button>

      <ul id="footer-pages-list">
        <li className="footer-link-container">
          <a href="#">Home</a>
        </li>
        <li className="footer-link-container">
          <a href="#">Terms of Use</a>
        </li>
        <li className="footer-link-container">
          <a href="#">Privacy Policy</a>
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
          <span style={{ fontSize: "13px" }}>
            Elevate your thinking. Master your knowledge. Stay curious.
          </span>
          <br />
          <span> {currentYear} &copy; QuizGenius. All rights reserved.</span>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
