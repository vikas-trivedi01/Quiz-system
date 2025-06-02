import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CreateOptionNumberStyle,
  previewShowOptionsStyle,
} from "../assets/quizElementsStyles";

const QuizPreview = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state == null) {
      alert("Page not available");
      navigate("/");
    }
  }, [location.state, navigate]);

  if (location.state == null) {
    return null;
  }

  const { questions } = location.state;

  const optionsRef = useRef(null);

  const [optionsShown, setOptionsShown] = useState({});

  const toggleOptionsVisible = index => {
    setOptionsShown(prev => (
        {
            ...prev,
            [index]: !prev[index],
        }
    ));
  }

  return (
    <>
      <div
        className="text-center py-3 px-5"
        style={{
          border: "2px solid black",
          borderRadius: "10px 40px 10px 40px",
          width: "45em",
          margin: "40px 10px 40px 270px",
        }}
      >
        <h2 className="mb-4">Ready to Launch?</h2>
        <p className="mb-6">
          Here's how your quiz will appear. Double-check your questions and
          options!
        </p>
      </div>

      <div>
        {questions.map((question, index) => {
          const isShown = optionsShown[index];
          return (
            <div
              key={index}
              className="p-2 m-5 d-flex justify-content-between align-items-center flex-wrap"
              style={{ border: "2px solid black" }}
            >
              <div className="d-flex">
                <h5>Question: </h5>
                <h5>{question.question}</h5>
              </div>
              <div>
                  <button
                    style={previewShowOptionsStyle}
                    onClick={() => toggleOptionsVisible(index)}
                  >
                    {isShown ? "Hide Options" : "Show Options"}
                  </button>
                
              </div>

              {isShown && (
            <div
              className="py-3 px-5 flex-wrap"
              style={{ display: "flex", flexDirection: "column" }}
            >
              {question.options.map((option, optIndex) => (
                <div
                  key={optIndex}
                  className="d-flex"
                  style={{ width: "500px" }}
                >
                  <span style={CreateOptionNumberStyle}>{optIndex + 1}</span>
                  <input
                    value={option.option}
                    className="w-75 me-5 px-4 py-0 mt-2"
                    style={{ border: "none", height: "40px" }}
                    disabled
                  />
                  <select
                    className="m-2 px-3"
                    defaultValue={option.correct ? "correct" : "incorrect"}
                    disabled
                  >
                    <option value="correct">Correct</option>
                    <option value="incorrect">Incorrect</option>
                  </select>
                </div>
              ))}
            </div>
          )}
        </div>
          )
        })}
      </div>
    </>
  );
};

export default QuizPreview;
