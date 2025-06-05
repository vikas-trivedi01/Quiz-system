import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CreateOptionNumberStyle,
  previewOptionsStyle,
  addPublishQuizButtonStyle
} from "../assets/quizElementsStyles.js";

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

  const [optionsShown, setOptionsShown] = useState({});

  const toggleOptionsVisible = (index) => {
    setOptionsShown((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <>
      <div
        className="text-center py-3 px-5"
        style={{
          border: "2px solid black",
          borderRadius: "10px 40px 10px 40px",
          width: "45em",
          margin: "40px 10px 40px 272px",
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
              style={{ borderRadius: "6px", border: "2px solid rgb(0, 0, 0)" }}
            >
              <div
                className="d-flex"
                style={{
                  marginLeft: "50px",
                  textDecoration: "underline",
                  textDecorationColor: "#000",
                  textDecorationThickness: "3px",
                  textUnderlineOffset: "7px",
                }}
              >
                <h5>Question: </h5>
                <h5 className="ms-3">{question.question}</h5>
              </div>
              <div>
                <button
                  style={previewOptionsStyle}
                  onClick={() => toggleOptionsVisible(index)}
                >
                  {isShown ? "Hide Options" : "Show Options"}
                </button>
              </div>

              {isShown && (
                <div
                  className="py-3 px-5 flex-wrap ms-5"
                  style={{ display: "flex", gap: "60px" }}
                >
                  {question.options.map((option, optIndex) => (
                    <div
                      key={optIndex}
                      className="d-flex align-items-center"
                      style={{ width: "400px" }}
                    >
                      <span style={CreateOptionNumberStyle}>
                        {optIndex + 1}
                      </span>
                      <h4
                        className="w-100 p-2"
                        style={
                          option.isCorrect
                            ? {
                                backgroundColor: "#98f5e1",
                                borderRadius: "6px",
                                border: "none",
                              }
                            : { border: "none" }
                        }
                      >
                        {option.option}
                      </h4>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button style={addPublishQuizButtonStyle} className="mb-4">Publish Quiz</button>
    </>
  );
};

export default QuizPreview;

