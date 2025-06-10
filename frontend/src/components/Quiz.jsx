import { faArrowRightLong, faTrophy } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useRef } from "react";

import { useNavigate, useSearchParams } from "react-router-dom";

import {
  nextButtonStyle,
  optionStyle,
  resultButtonStyle,
  timerStyle,
} from "../assets/quizElementsStyles.js";
import axios from "axios";
import { refreshAccessToken } from "../assets/tokens.js";
import { BACKEND_URL } from "../assets/constants.js";

const Quiz = () => {
  const [searchParams] = useSearchParams();
  const quizId = searchParams.get("quizId");

  const [quizData, setQuizData] = useState([]);

  useEffect(() => {
    const getQuizData = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/quizzes/quiz/${quizId}`,
          {
            withCredentials: true,
          }
        );

        if (response?.status == 200) {
          setQuizData(response?.data?.data);
        }
      } catch (error) {
        if (error?.response?.status == 401) {
          try {
            await refreshAccessToken();
            await getQuizData();
          } catch (refreshError) {
            alert("Please login again");
            navigate("/users/login");
          }
        } else {
          alert(error?.message);
        }
      }
    };

    getQuizData();
  }, []);

  const quizData2 = [
    {
      id: 1,
      question:
        "What is the capital of France?What is the capital of France?What is the capital of France?",
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

  const [currentQuestionObj, setCurrentQuestionObj] = useState(null);
  const [questionsCounter, setQuestionsCounter] = useState(1);
  const [answers, setAnswers] = useState([]);

  const [timer, setTimer] = useState(20);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState(null);

  const navigate = useNavigate();

  let intervalRef = useRef(null);

  useEffect(() => {
    if (quizData.length > 0) {
      setCurrentQuestionObj(quizData[0]);
    }
  }, [quizData]);

  useEffect(() => {
    setTimer(5);
    setIsAnswered(false);
    clearInterval(intervalRef.current);

    if (questionsCounter <= quizData.length) {
      intervalRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            clearInterval(intervalRef.current);
            handleAutoNext();
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(intervalRef.current);
    }
  }, [currentQuestionObj]);

  useEffect(() => {
    setSelectedOptionId(null);
  }, [currentQuestionObj]);

  const getNextQuestion = (flow = null) => {
    if ((flow == "auto" || isAnswered) && questionsCounter < quizData.length) {
       setCurrentQuestionObj(quizData[questionsCounter - 1]);
        setQuestionsCounter((prev) => prev + 1);
        setTimer(5);
        setIsAnswered(false);
        setSelectedOptionId(null);
    } else {
      alert("Please select an option");
    }
  };

  const handleAutoNext = () => {
    setIsAnswered(true);
    if (questionsCounter < quizData.length) {
      let next = questionsCounter;
      setQuestionsCounter((prev) => prev + 1);
      setCurrentQuestionObj(quizData[next]);
      selectOption(null, null);
    }
  };

  const selectOption = (e, index) => {
    clearInterval(intervalRef.current);
    const newAnswer = {
      questionId: currentQuestionObj._id,
      givenAnswer: e?.target?.value || null,
    };

    setAnswers((prevAnswers) => {
      const existingIndex = prevAnswers.findIndex(
        (answer) => answer.questionId === currentQuestionObj._id
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
      {currentQuestionObj ? (
        <>
          <div className="d-flex justify-content-center">
            <h4>Question: </h4>{" "}
            <span
              style={{
                marginLeft: "10px",
                marginTop: "-5px",
                fontSize: "25px",
              }}
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

              <span style={timerStyle}>{timer}</span>
            </div>

            <div style={{ border: "2px solid #000" }} className="mt-4">
              {currentQuestionObj.options.map((optionObj, index) => {
                return (
                  <div
                    key={index}
                    className="d-flex justify-content-between align-items-center p-2 fs-5 m-3 rounded"
                    style={{
                      backgroundColor: "#05668d",
                      cursor: "pointer",
                      border:
                        selectedOptionId === index
                          ? "5px solid rgb(0, 255, 238)"
                          : "none",
                    }}
                  >
                    <div className="d-flex align-items-center gap-4">
                      <span
                        style={{
                          backgroundColor: "#4895ef",
                          marginLeft: "20px",
                        }}
                        className="rounded-pill px-3 py-2 text-light"
                      >
                        {index + 1}
                      </span>
                      <span className="py-2 text-light">
                        {optionObj.option}
                      </span>
                    </div>

                    <div>
                      <input
                        type="radio"
                        name={`option-${currentQuestionObj._id}`}
                        value={optionObj.option}
                        checked={selectedOptionId === index}
                        style={optionStyle}
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
              {isAnswered && questionsCounter == quizData.length ? (
                <button
                  className="btn mt-3"
                  style={resultButtonStyle}
                  onClick={() =>
                    navigate("/quizzes/result", { state: { quizData, answers } })
                  }
                >
                  Get Result
                  <FontAwesomeIcon
                    icon={faTrophy}
                    style={{ marginLeft: "20px" }}
                  />
                </button>
              ) : questionsCounter == quizData.length ? null : (
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
      ) : (
        <h3 className="p-5 m-5 text-center">Loading quiz's questions...</h3>
      )}
    </>
  );
};

export default Quiz;
