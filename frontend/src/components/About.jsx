import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../styles/variables.css";

const About = () => {
  return (
    <div
      className="container py-5 mb-5 mt-5"
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "30px",
        borderRadius: "12px",
        backgroundColor: "#fdfdfd",
        boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
        lineHeight: "1.7",
      }}
    >
      <h1 className="text-center mb-4" style={{ fontWeight: "bold" }}>
        About Us
      </h1>

      <p>
        Welcome to <strong>QuizGenius</strong> — your trusted platform for creating,
        managing, and delivering quizzes with ease. Designed for educators, trainers, and
        organizations, our system simplifies assessments and empowers learning.
      </p>

      <h3 className="mt-4" style={{ color: "#333" }}>Our Mission</h3>
      <p>
        To empower creators and learners with intuitive tools that support accurate assessments,
        structured learning, and continuous growth.
      </p>

     <h3 className="mt-4" style={{ color: "#333", fontSize: "1.6rem" }}>What We Offer</h3>
<ul style={{ paddingLeft: "0", listStyle: "none" }}>
  <li style={{ display: "flex", alignItems: "center", fontSize: "1.1rem", marginBottom: "0.5rem", color: "#333" }}>
    <FontAwesomeIcon icon={faCircleCheck} style={{ marginRight: "10px", fontSize: "22px", color: "var(--clr-primary)" }} />
    Easy quiz creation with multiple questions & options
  </li>
  <li style={{ display: "flex", alignItems: "center", fontSize: "1.1rem", marginBottom: "0.5rem", color: "#333" }}>
    <FontAwesomeIcon icon={faCircleCheck} style={{ marginRight: "10px", fontSize: "22px", color: "var(--clr-primary)" }} />
    Custom scoring: total marks & per-question marks
  </li>
  <li style={{ display: "flex", alignItems: "center", fontSize: "1.1rem", marginBottom: "0.5rem", color: "#333" }}>
    <FontAwesomeIcon icon={faCircleCheck} style={{ marginRight: "10px", fontSize: "22px", color: "var(--clr-primary)" }} />
    Difficulty levels: Easy, Medium, Hard
  </li>
  <li style={{ display: "flex", alignItems: "center", fontSize: "1.1rem", marginBottom: "0.5rem", color: "#333" }}>
    <FontAwesomeIcon icon={faCircleCheck} style={{ marginRight: "10px", fontSize: "22px", color: "var(--clr-primary)" }} />
    Organized by categories
  </li>
  <li style={{ display: "flex", alignItems: "center", fontSize: "1.1rem", marginBottom: "0.5rem", color: "#333" }}>
    <FontAwesomeIcon icon={faCircleCheck} style={{ marginRight: "10px", fontSize: "22px", color: "var(--clr-primary)" }} />
    Quiz preview before publishing
  </li>
  <li style={{ display: "flex", alignItems: "center", fontSize: "1.1rem", marginBottom: "0.5rem", color: "#333" }}>
    <FontAwesomeIcon icon={faCircleCheck} style={{ marginRight: "10px", fontSize: "22px", color: "var(--clr-primary)" }} />
    Secure login with authentication
  </li>
</ul>

<h3 className="mt-4" style={{ color: "#333", fontSize: "1.6rem" }}>Why Choose Us?</h3>
<ul style={{ paddingLeft: "0", listStyle: "none" }}>
  <li style={{ display: "flex", alignItems: "center", fontSize: "1.1rem", marginBottom: "0.5rem", color: "#333" }}>
    <FontAwesomeIcon icon={faCircleCheck} style={{ marginRight: "10px", fontSize: "22px", color: "var(--clr-primary)" }} />
    Clean and user-friendly interface
  </li>
  <li style={{ display: "flex", alignItems: "center", fontSize: "1.1rem", marginBottom: "0.5rem", color: "#333" }}>
    <FontAwesomeIcon icon={faCircleCheck} style={{ marginRight: "10px", fontSize: "22px", color: "var(--clr-primary)" }} />
    Powerful backend and scalable structure
  </li>
  <li style={{ display: "flex", alignItems: "center", fontSize: "1.1rem", marginBottom: "0.5rem", color: "#333" }}>
    <FontAwesomeIcon icon={faCircleCheck} style={{ marginRight: "10px", fontSize: "22px", color: "var(--clr-primary)" }} />
    Real-time feedback & publishing control
  </li>
  <li style={{ display: "flex", alignItems: "center", fontSize: "1.1rem", marginBottom: "0.5rem", color: "#333" }}>
    <FontAwesomeIcon icon={faCircleCheck} style={{ marginRight: "10px", fontSize: "22px", color: "var(--clr-primary)" }} />
    Ideal for schools, colleges, and corporate use
  </li>
</ul>



      <p className="mt-4">
        At <strong>QuizGenius</strong>, we believe assessments should be both
        <em> effective</em> and <em> efficient</em>. Our goal is to simplify how quizzes are created
        and experienced — for everyone.
      </p>
    </div>
  );
};

export default About;
