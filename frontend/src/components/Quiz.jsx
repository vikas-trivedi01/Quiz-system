import {
  faArrowRightLong 
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";

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

  const quizData = [
    {
      id: Math.floor(Math.random() * 1000) + 1,
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Rome"],
      rightAnswer: "Paris",
    },
    {
      id: Math.floor(Math.random() * 1000) + 1,
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Venus"],
      rightAnswer: "Mars",
    },
    {
      id: Math.floor(Math.random() * 1000) + 1,
      question: "Who wrote 'To Kill a Mockingbird'?",
      options: ["Harper Lee", "Mark Twain", "J.K. Rowling", "Jane Austen"],
      rightAnswer: "Harper Lee",
    },
    {
      id: Math.floor(Math.random() * 1000) + 1,
      question: "What is the smallest prime number?",
      options: ["0", "1", "2", "3"],
      rightAnswer: "2",
    },
    {
      id: Math.floor(Math.random() * 1000) + 1,
      question: "What is the value of π (pi) approximately?",
      options: ["2.14", "3.14", "3.41", "4.13"],
      rightAnswer: "3.14",
    },
    {
      id: Math.floor(Math.random() * 1000) + 1,
      question: "Which ocean is the largest?",
      options: ["Atlantic", "Indian", "Arctic", "Pacific"],
      rightAnswer: "Pacific",
    },
    {
      id: Math.floor(Math.random() * 1000) + 1,
      question: "Which language is primarily spoken in Brazil?",
      options: ["Spanish", "Portuguese", "French", "English"],
      rightAnswer: "Portuguese",
    },
    {
      id: Math.floor(Math.random() * 1000) + 1,
      question: "What is the boiling point of water?",
      options: ["90°C", "100°C", "120°C", "80°C"],
      rightAnswer: "100°C",
    },
    {
      id: Math.floor(Math.random() * 1000) + 1,
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "Home Tool Markup Language",
        "Hyperlinks and Text Markup Language",
        "Highlevel Text Machine Language",
      ],
      rightAnswer: "Hyper Text Markup Language",
    },
    {
      id: Math.floor(Math.random() * 1000) + 1,
      question: "Who painted the Mona Lisa?",
      options: [
        "Vincent Van Gogh",
        "Leonardo da Vinci",
        "Pablo Picasso",
        "Michelangelo",
      ],
      rightAnswer: "Leonardo da Vinci",
    },
    {
      id: Math.floor(Math.random() * 1000) + 1,
      question: "Which element has the symbol 'O'?",
      options: ["Gold", "Oxygen", "Silver", "Hydrogen"],
      rightAnswer: "Oxygen",
    },
    {
      id: Math.floor(Math.random() * 1000) + 1,
      question: "What is the square root of 64?",
      options: ["6", "7", "8", "9"],
      rightAnswer: "8",
    },
    {
      id: Math.floor(Math.random() * 1000) + 1,
      question: "Which year did World War II end?",
      options: ["1945", "1939", "1918", "1950"],
      rightAnswer: "1945",
    },
    {
      id: Math.floor(Math.random() * 1000) + 1,
      question: "Which device is used to measure temperature?",
      options: ["Barometer", "Thermometer", "Hygrometer", "Altimeter"],
      rightAnswer: "Thermometer",
    },
    {
      id: Math.floor(Math.random() * 1000) + 1,
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
      setQuestionsCounter((prev) => prev + 1);
      setCurrentQuestionObj(quizData[questionsCounter - 1]);
      setTimer(0);
      setIsAnswered(false);
      setSelectedOptionId(null);
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
            <h5>Question: </h5>{" "}
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
          {
          
          currentQuestionObj.options.map((option, index) => {
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
          })
          
          }
        </div>

        <div>
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
        </div>
      </div>
    </>
  );
};

export default Quiz;
