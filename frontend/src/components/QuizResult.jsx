import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faHome } from "@fortawesome/free-solid-svg-icons";
import quizResultImg from "../assets/illustrations/quiz-result.jpg";

import messages from "../assets/quizResultMessages.json";
import { useEffect } from "react";

import "../styles/variables.css";

const QuizResult = () => {
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    if (location.state == null) {
      alert("Page not available");
      navigate("/");
    }
  }, [location.state, navigate]);

  if (location.state == null) return null;

  const { quizData, answers } = location.state;

  const homeButtonStyle = {
    backgroundColor: "#000",
    color: "#fff",
    borderRadius: `var(--border-radius)`,
    padding: "10px",
    width: "200px",
    border: "none",
    cursor: "pointer",
    marginTop: "20px",
  };

  const reviewButtonStyle = {
    backgroundColor: "#ff006e",
    color: "#fff",
    borderRadius: `var(--border-radius)`,
    padding: "10px",
    width: "260px",
    border: "none",
    cursor: "pointer",
    marginTop: "20px",
    marginLeft: "20px",
  };

  const rightAnswers = quizData.filter((question) => {
    return answers.find((answer) => {
      return answer.questionId == question.id &&
        answer.givenAnswer == question.rightAnswer
        ? true
        : false;
    });
  });

  const percentage = (rightAnswers.length * 100) / quizData.length;
  let status = "";
  let message = "";

  if (percentage >= 95) {
    status = messages[6].status;
    message = messages[6].message;
  } else if (percentage >= 85) {
    status = messages[5].status;
    message = messages[5].message;
  } else if (percentage >= 65) {
    status = messages[4].status;
    message = messages[4].message;
  } else if (percentage >= 53) {
    status = messages[3].status;
    message = messages[3].message;
  } else if (percentage >= 35) {
    status = messages[2].status;
    message = messages[2].message;
  } else if (percentage >= 20) {
    status = messages[1].status;
    message = messages[1].message;
  } else {
    status = messages[0].status;
    message = messages[0].message;
  }

  return (
    <>
      <div
        style={{
          backgroundColor: "#35B0FC",
          fontSize: "20px",
          height: "max-content",
          padding: "13px",
          marginLeft: "500px",
          borderRadius: "6px",
          width: "300px",
        }}
        className="text-center"
      >
        Result Status: {status}
      </div>

      <div className="d-flex justify-content-between">
        <img
          src={quizResultImg}
          alt="Quiz result illustration"
          height={350}
          width={600}
        />

        <div className="text-center mt-5" style={{ marginRight: "200px" }}>
          <span style={{ fontSize: "28px" }}>Your Score</span>{" "}
          <h2
            style={{
              backgroundColor: "#FF5E9A",
              color: "#fff",
              width: "max-content",
              borderRadius: "6px",
              marginLeft: "190px",
            }}
            className="py-2 px-5"
          >
            {rightAnswers.length} / {quizData.length}
          </h2>
          <h4 className="mt-4">{message}</h4>
          <button style={homeButtonStyle}>
            <NavLink to="/" style={{ color: "#fff", textDecoration: "none" }}>
              Back to Home
            </NavLink>
            <FontAwesomeIcon icon={faHome} style={{ marginLeft: "10px" }} />
          </button>
          <button
            style={reviewButtonStyle}
            onClick={() =>
              navigate("/quizzes/review", { state: location.state })
            }
          >
            Review Wrong Answers
            <FontAwesomeIcon
              icon={faCircleXmark}
              style={{ marginLeft: "10px" }}
            />
          </button>
        </div>
      </div>
      <div></div>
    </>
  );
};

export default QuizResult;
