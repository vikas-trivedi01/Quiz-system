import { NavLink, useLocation, useNavigate } from "react-router-dom";
import quizResultImg from "../assets/illustrations/quiz-result.jpg";

import messages from "../assets/quizResultMessages.json";
import { useEffect } from "react";

import "../styles/variables.css";
import axios from "axios";
import { BACKEND_URL } from "../assets/constants.js";
import { refreshAccessToken } from "../assets/tokens.js";

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

  const { quizData, answers, quizId } = location.state;

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
      return answer.questionId == question._id &&
        answer.givenAnswer ==
          question.options.find((opt) => opt.isCorrect)?.option
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

  const statusToEnum = {
    "Very Poor": "very_poor",
    Poor: "poor",
    "Needs Improvement": "needs_improvement",
    Fair: "fair",
    Good: "good",
    Excellent: "excellent",
    Outstanding: "outstanding",
  };

  const attempt = answers.map((answerObj, index) => {
    return {
      question: quizData[index]._id,
      selectedOption: answerObj.givenAnswer,
      isAnswerCorrect:
        answerObj.givenAnswer ===
        quizData[index].options.find((opt) => opt.isCorrect)?.option,
    };
  });

useEffect(() => {
  const postAttempt = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/quizzes/${quizId}/attempt`,
        {
          answers: attempt,
          score: rightAnswers.length / quizData.length,
          performanceStatus: statusToEnum[status],
        },
        {
          withCredentials: true,
        }
      );

      if (response?.status === 200) {
        alert(response?.data?.message);
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        try {
          await refreshAccessToken();
          await postAttempt(); // Retry
        } catch (refreshError) {
          alert("Please login again");
          navigate("/users/login");
        }
      } else {
        alert(error?.message);
      }
    }
  };

  if (attempt) {
    postAttempt();
  }
}, [attempt, quizId, navigate, rightAnswers.length, status]);  


  return (
    <>
      <div
        style={{
          border: "2px solid #00a8e8",
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
          className="m-5"
          style={{
            border: "2px solid #000",
            borderRadius: "var(--border-radius)",
          }}
        />

        <div className="text-center mt-5" style={{ marginRight: "200px" }}>
          <span style={{ fontSize: "28px" }}>Your Score</span>{" "}
          <h2
            style={{
              border: "2px solid #00a8e8",
              width: "max-content",
              borderRadius: "6px",
              marginLeft: "145px",
            }}
            className="py-2 px-5"
          >
            {rightAnswers.length} / {quizData.length}
          </h2>
          <h4 className="mt-4">{message}</h4>
         
          <button style={homeButtonStyle} className="ms-3">
            <NavLink to="/" style={{ color: "#fff", textDecoration: "none" }}>
              Back to Home
            </NavLink>
          </button>

          {rightAnswers.length != quizData.length ? (
            <button
              style={reviewButtonStyle}
              onClick={() =>
                navigate("/quizzes/review", { state: location.state })
              }
            >
              Review Wrong Answers
            </button>
          ) : null}

        </div>
      </div>
    </>
  );
};

export default QuizResult;
