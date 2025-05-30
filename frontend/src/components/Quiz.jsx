import { faArrowRightLong, faTrophy } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const nextButtonStyle = {
    backgroundColor: `var(--clr-primary)`,
    color: "#fff",
    borderRadius: `var(--border-radius)`,
    padding: "8px",
    width: "240px",
    border: "none",
    cursor: "pointer",
    marginLeft: "30rem",
    fontSize: "20px",
  };

  const resultButtonStyle = {
    backgroundColor: `var(--clr-accent)`,
    color: "#000",
    borderRadius: `var(--border-radius)`,
    padding: "8px",
    width: "240px",
    border: "none",
    cursor: "pointer",
    marginLeft: "30rem",
    fontSize: "20px",
  };

  const quizData = [
    {
      id: 1,
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Rome"],
      rightAnswer: "Paris",
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Venus"],
      rightAnswer: "Mars",
    },
    {
      id: 3,
      question: "Who wrote 'To Kill a Mockingbird'?",
      options: ["Harper Lee", "Mark Twain", "J.K. Rowling", "Jane Austen"],
      rightAnswer: "Harper Lee",
    },
    {
      id: 4,
      question: "What is the smallest prime number?",
      options: ["0", "1", "2", "3"],
      rightAnswer: "2",
    },
    {
      id: 5,
      question: "Which gas do plants absorb from the atmosphere?",
      options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
      rightAnswer: "Carbon Dioxide",
    },
  ];

  const [currentQuestionObj, setCurrentQuestionObj] = useState(quizData[0]);
  const [questionsCounter, setQuestionsCounter] = useState(1);
  const [answers, setAnswers] = useState([]);

  const [timer, setTimer] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState(null);

  const navigate = useNavigate();

  let interval = null;
  useEffect(() => {
    interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setSelectedOptionId(null);
  }, [currentQuestionObj]);

  const getNextQuestion = () => {
    if (isAnswered) {
      const nextIndex = questionsCounter;
      if (nextIndex < quizData.length) {
        setCurrentQuestionObj(quizData[nextIndex]);
        setQuestionsCounter(nextIndex + 1);
        setTimer(0);
        setIsAnswered(false);
        setSelectedOptionId(null);
      }
    } else {
      alert("Please select an option");
    }
  };

  const selectOption = (e, index) => {
    const newAnswer = {
      questionId: currentQuestionObj.id,
      givenAnswer: e.target.value,
    };

    setAnswers((prevAnswers) => {
      const existingIndex = prevAnswers.findIndex(
        (answer) => answer.questionId === currentQuestionObj.id
      );

      if (existingIndex !== -1) {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[existingIndex] = newAnswer;
        return updatedAnswers;
      } else {
        return [...prevAnswers, newAnswer];
      }
    });

    setIsAnswered(true);
    setSelectedOptionId(index);
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <h4>Question: </h4>{" "}
        <span
          style={{ marginLeft: "10px", marginTop: "-5px", fontSize: "25px" }}
        >
          {questionsCounter} / {quizData.length}
        </span>
      </div>

      <div style={{ margin: "2%" }}>
        <div
          style={{
            border: "2px solid #000",
            backgroundColor: "#00bbf9",
            borderRadius: "6px",
          }}
          className="p-2 d-flex justify-content-between"
        >
          <div>
            <h5
              style={{
                textDecoration: "underline",
                textDecorationColor: "#fff",
                textDecorationThickness: "4px",
                textUnderlineOffset: "7px",
              }}
            >
              Question:{" "}
            </h5>{" "}
            <span style={{ fontSize: "25px" }}>
              {currentQuestionObj.question}
            </span>
          </div>

          <span
            style={{
              fontSize: "24px",
              alignSelf: "center",
              marginRight: "30px",
            }}
          >
            {timer}
          </span>
        </div>

        <div style={{ border: "2px solid #000" }} className="mt-4">
          {currentQuestionObj.options.map((option, index) => {
            return (
              <div
                key={index}
                className="d-flex justify-content-between align-items-center p-2 fs-5 m-3 rounded"
                style={{
                  backgroundColor: "#000",
                  cursor: "pointer",
                  border:
                    selectedOptionId === index
                      ? "5px solid rgb(0, 140, 255)"
                      : "none",
                }}
              >
                <div className="d-flex align-items-center gap-4">
                  <span
                    style={{ backgroundColor: "#4895ef", marginLeft: "20px" }}
                    className="rounded-pill px-3 py-2 text-light"
                  >
                    {index + 1}
                  </span>
                  <span className="py-2 text-light">{option}</span>
                </div>

                <div>
                  <input
                    type="radio"
                    name={`option-${currentQuestionObj.id}`}
                    value={option}
                    checked={selectedOptionId === index}
                    style={{
                      transform: "scale(2.5)",
                      accentColor: "#00bbf9",
                      cursor: "pointer",
                      width: "100px",
                    }}
                    onChange={(e) => {
                      selectOption(e, index);
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div>
          {isAnswered &&
          quizData[questionsCounter - 1] == quizData[quizData.length - 1] ? (
            <button
              className="btn mt-3"
              style={resultButtonStyle}
              onClick={() =>
                navigate("quizzes/result", { state: { quizData, answers } })
              }
            >
              Result {console.log(answers)}
              <FontAwesomeIcon icon={faTrophy} style={{ marginLeft: "20px" }} />
            </button>
          ) : (
            <button
              className="btn mt-3"
              style={nextButtonStyle}
              onClick={() => getNextQuestion()}
            >
              Next Question
              <FontAwesomeIcon
                icon={faArrowRightLong}
                style={{ marginLeft: "20px" }}
              />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Quiz;
