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

  const [currentQuestionObj, setCurrentQuestionObj] = useState(null);
  const [questionsCounter, setQuestionsCounter] = useState(1);
  const [answers, setAnswers] = useState([]);

  const [timer, setTimer] = useState(20);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState(null);

  const navigate = useNavigate();

  const intervalRef = useRef(null);
  const lastSelectedRef = useRef(null);


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
        setIsAnswered(false);
        setSelectedOptionId(null);
        setTimer(5);
      } else {
      alert("Please select an option");
    }
  };

  const handleAutoNext = () => {
      const autoAnswer = {
    questionId: currentQuestionObj._id,
    givenAnswer: null,
  };

  setAnswers((prevAnswers) => {
    const exists = prevAnswers.some(
      (ans) => ans.questionId === currentQuestionObj._id
    );
    return exists ? prevAnswers : [...prevAnswers, autoAnswer];
  });


    setIsAnswered(true);
     setTimeout(() => {
    if (questionsCounter < quizData.length) {
      setCurrentQuestionObj(quizData[questionsCounter]);
      setQuestionsCounter((prev) => prev + 1);
    }
  }, 100);
    // if (questionsCounter < quizData.length) {
    //   setCurrentQuestionObj(quizData[questionsCounter - 1]);
    //   setQuestionsCounter((prev) => prev + 1);
    //   if (selectedOptionId === null) {
    //   // selectOption(null, null);
    // }
    // }
  };

  const selectOption = (e, index) => {
    clearInterval(intervalRef.current);
  const givenAnswer = e?.target?.value || null;

  const newAnswer = {
    questionId: currentQuestionObj._id,
    givenAnswer,
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
    
    setSelectedOptionId(index);
    setIsAnswered(true);

     setTimeout(() => {
    if (questionsCounter < quizData.length) {
      setCurrentQuestionObj(quizData[questionsCounter]);
      setQuestionsCounter((prev) => prev + 1);
    }
  }, 100);
  };
  useEffect(() => {
  console.log("Answers updated:", answers);
}, [answers]);



  const getResult = async () => {
  
    try {
        const response = await axios.post(
          `${BACKEND_URL}/quizzes/participate/${quizId}`,
          {},
          {
            withCredentials: true,
          }
        );

        if (response?.status == 200) {
          navigate("/quizzes/result", { state: { quizData, answers, quizId } });
        }
      } catch (error) {
        if (error?.response?.status == 401) {
          try {
            await refreshAccessToken();
            await getResult();
          } catch (refreshError) {
            alert("Please login again");
            navigate("/users/login");
          }
        } else {
          alert(error?.message);
        }
      }          
  };

  const handleSubmit = () => {
    setTimeout(async () => {
      await getResult();
    }, 2000);

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
                  onClick={handleSubmit}
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
        <h3 className="p-5 m-5 text-center">Loading questions...</h3>
      )}
    </>
  );
};

export default Quiz;
