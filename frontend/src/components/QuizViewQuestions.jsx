import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CreateOptionNumberStyle,
  previewOptionsStyle,
} from "../assets/quizElementsStyles.js";

const QuizViewQuestions = () => {
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    if (location.state == null) {
      alert("Page not available");
      navigate("/");
    }
  }, [location.state, navigate]);

  if (location.state == null) return null;

  const { questions, quizName } = location.state;

  const [isShown, setIsShown] = useState(false);
  const [optionsShown, setOptionsShown] = useState({});

  const toggleOptionsVisible = (index) => {
    setIsShown((prev) => !prev);

    setOptionsShown((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "#000",
          borderRadius: "15px",
          width: "max-content",
          marginLeft: "169px",
        }}
        className="text-center p-4"
      >
        <h2 className="mb-4 text-light">View Quiz Questions</h2>
        <p className="mb-6 text-light">
          Here are all the questions and options associated with this quiz. This
          is a read-only view; no edits can be made from this page.
        </p>
      </div>

      <h3 className="mt-5" style={{ marginLeft: "19.2em" }}>
        Quiz: {quizName}
      </h3>

      {questions.map((questionObj, index) => {
        return (
          <div
            key={index}
            className="p-2 m-5 d-flex justify-content-between align-items-center flex-wrap"
            style={{ borderRadius: "6px", border: "2px solid rgb(0, 0, 0)" }}
          >
            <div
              className="d-flex justify-content-between align-items-center flex-wrap mt-3"
              style={{
                marginLeft: "50px",
                textDecoration: "underline",
                textDecorationColor: "#000",
                textDecorationThickness: "3px",
                textUnderlineOffset: "7px",
              }}
            >
              <h5 className="mb-4 me-3">Question: </h5>
              <input
                type="text"
                defaultValue={questionObj.question}
                style={{ width: "700px" }}
                disabled
              />
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
                className="py-1 px-1 d-flex flex-wrap align-items-center"
                style={{ gap: "10px", marginLeft: "137px" }}
              >
                {questionObj.options.map((optionObj, optIndex) => (
                  <div
                    key={optIndex}
                    className="d-flex justify-content-between"
                    style={{ width: "700px", gap: "30px" }}
                  >
                    <span style={CreateOptionNumberStyle}>{optIndex + 1}</span>
                    <input
                      className="w-100 p-2 mt-2"
                      type="text"
                      defaultValue={optionObj.option}
                      style={
                        optionObj.isCorrect
                          ? {
                              backgroundColor: "#98f5e1",
                              borderRadius: "6px",
                              border: "none",
                            }
                          : { border: "none" }
                      }
                      disabled
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};

export default QuizViewQuestions;
