import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const QuizReview = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state == null) {
      alert("Page not available");
      navigate("/");
    }
  }, [location.state, navigate]);

  if (location.state == null) return null;

  const { quizData, answers } = location.state;

  const wrongAnswers = quizData.filter((question) => {
    const answerObj = answers.find((ans) => ans.questionId === question._id);

    return (
    !answerObj || 
    answerObj.givenAnswer == null || 
    answerObj.givenAnswer !== question.options.find(opt => opt.isCorrect)?.option
  );

    
  });

  return (
    <div
    style={{
      marginLeft: "240px",
        marginBottom: "240px",
      }}
    >
      <h3 style={{marginLeft: "20px"}} className="mt-5 mb-5">Review your wrong answered / unanswered questions easily</h3>
      {wrongAnswers.map((questionObj, index) => {
        const userAnswerObj = answers.find(
          (answer) => answer.questionId === questionObj._id
        );

        return (
          <div
            key={index}
            style={{
              border: "2px solid #000",
              backgroundColor: "#fff",
              borderRadius: "6px",
              margin: "10px 20px",
              padding: "20px",
            }}
            className="w-75"
          >
            <div className="d-flex justify-content-start">
              <div className="mt-1">
                <span
                  style={{ backgroundColor: "#4895ef" }}
                  className="rounded-pill px-3 py-2  text-light"
                >
                  {index + 1}
                </span>{" "}
              </div>

              <div className="ms-5">
                <h4
                  style={{
                    textDecoration: "underline",
                    textDecorationColor: "#fff",
                    textDecorationThickness: "4px",
                    textUnderlineOffset: "7px",
                    display: "inline",
                  }}
                >
                  Question:{" "}
                </h4>{" "}
                <span style={{ fontSize: "20px" }}>{questionObj.question}</span>
              </div>
            </div>

            <div className="d-flex mt-2" style={{ marginLeft: "90px" }}>
              <h5
                style={{
                  color: "#ff006e",
                }}
              >
                <strong>Your Answer:</strong>{" "}
                <span style={{ fontSize: "20px" }}>
                  {userAnswerObj
                  ? userAnswerObj.givenAnswer || "Not Answered"
                  : "Not Answered"}

                </span>
              </h5>
            </div>

            <div className="d-flex mt-1" style={{ marginLeft: "90px" }}>
              <h5
                style={{
                  color: "#17c3b2",
                }}
              >
                <strong>Correct Answer: </strong>
                <span style={{ fontSize: "20px" }}>
                  {questionObj.options.find(optObj => optObj.isCorrect)?.option}
                </span>
              </h5>{" "}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuizReview;
