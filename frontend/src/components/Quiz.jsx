import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";

const Quiz = () => {
  const nextButtonStyle = {
    backgroundColor: `var(--clr-primary)`,
    color: "#fff",
    borderRadius: `var(--border-radius)`,
    padding: "8px",
    width: "200px",
    border: "none",
    cursor: "pointer",
    marginLeft: "31rem",
    fontSize: "20px",
  };

  const quizData = [
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Rome"],
      rightAnswer: "Paris",
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Venus"],
      rightAnswer: "Mars",
    },
    {
      question: "Who wrote 'To Kill a Mockingbird'?",
      options: ["Harper Lee", "Mark Twain", "J.K. Rowling", "Jane Austen"],
      rightAnswer: "Harper Lee",
    },
    {
      question: "What is the smallest prime number?",
      options: ["0", "1", "2", "3"],
      rightAnswer: "2",
    },
    {
      question: "What is the value of π (pi) approximately?",
      options: ["2.14", "3.14", "3.41", "4.13"],
      rightAnswer: "3.14",
    },
    {
      question: "Which ocean is the largest?",
      options: ["Atlantic", "Indian", "Arctic", "Pacific"],
      rightAnswer: "Pacific",
    },
    {
      question: "Which language is primarily spoken in Brazil?",
      options: ["Spanish", "Portuguese", "French", "English"],
      rightAnswer: "Portuguese",
    },
    {
      question: "What is the boiling point of water?",
      options: ["90°C", "100°C", "120°C", "80°C"],
      rightAnswer: "100°C",
    },
    {
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
      question: "Which element has the symbol 'O'?",
      options: ["Gold", "Oxygen", "Silver", "Hydrogen"],
      rightAnswer: "Oxygen",
    },
    {
      question: "What is the square root of 64?",
      options: ["6", "7", "8", "9"],
      rightAnswer: "8",
    },
    {
      question: "Which year did World War II end?",
      options: ["1945", "1939", "1918", "1950"],
      rightAnswer: "1945",
    },
    {
      question: "Which device is used to measure temperature?",
      options: ["Barometer", "Thermometer", "Hygrometer", "Altimeter"],
      rightAnswer: "Thermometer",
    },
    {
      question: "Which gas do plants absorb from the atmosphere?",
      options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
      rightAnswer: "Carbon Dioxide",
    },
  ];

  const [currentQuestionObj, setCurrentQuestionObj] = useState(quizData[0]);
  const [questionsCounter, setQuestionsCounter] = useState(1);

  const [timer, setTimer] = useState(0);

  let interval = null;
  useEffect(() => {
    interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getNextQuestion = () => {
    setQuestionsCounter((prev) => prev + 1);
    setCurrentQuestionObj(quizData[questionsCounter]);
    setTimer(0);
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
          {currentQuestionObj.options.map((option, index) => {
            return (
              <div
                key={index}
                style={{ backgroundColor: "#000", cursor: "pointer" }}
                className="d-flex justify-content-start p-2 gap-5 fs-5 m-3 rounded"
              >
                <span
                  style={{ backgroundColor: "#4895ef", marginLeft: "20px" }}
                  className="rounded-pill px-3 py-2 text-light"
                >
                  {index + 1}
                </span>
                <span className="py-2 text-light"> {option}</span>
              </div>
            );
          })}
        </div>

        <button
          className="btn mt-3"
          style={nextButtonStyle}
          onClick={() => getNextQuestion()}
        >
          Next
          <FontAwesomeIcon
            icon={faArrowRightLong}
            style={{ marginLeft: "20px" }}
          />
        </button>
        
      </div>
    </>
  );
};

export default Quiz;
