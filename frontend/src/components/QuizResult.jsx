import { NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import quizResultImg from "../assets/illustrations/quiz-result.jpg";

const QuizResult = () => {

  const location = useLocation();
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

  const rightAnswers = quizData.filter((question) => {
    return answers.find((answer) => {
      return answer.questionId == question.id &&
        answer.givenAnswer == question.rightAnswer
        ? true
        : false;
    });
  });

  return (
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
            marginLeft: "135px",
          }}
          className="py-2 px-4"
        >
          {rightAnswers.length} / {quizData.length}
        </h2>

        <h4 className="mt-4">
          Congratulaions! <br />
          Great job, User! You have done well
        </h4>

        <button style={homeButtonStyle}>
          <NavLink to="/" style={{ color: "#fff", textDecoration: "none" }}>
            Back to Home
          </NavLink>
          <FontAwesomeIcon icon={faHome} style={{ marginLeft: "10px" }} />
        </button>

      </div>
    </div>
  );
};

export default QuizResult;
