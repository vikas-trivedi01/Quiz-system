import { useRef, useState } from "react";
import {
  addNextQuestionButtonStyle,
  createHeadingStyle,
  createQuizNameStyle,
  addOptionStyle,
  CreateOptionNumberStyle,
  addPublishQuizButtonStyle
} from "../assets/quizElementsStyles.js";
import professorImg from "../assets/illustrations/professor.png"
import { useNavigate } from "react-router-dom";

const QuizCreate = () => {
  const [quizName, setQuizName] = useState("General Quiz");
  const [editingQuizName, setEditingQuizName] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(false);

  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState([]);
  const [question, setQuestion] = useState("Enter question");
  const [option, setOption] = useState("Enter option");

  const [exampleShown, setExampleShown] = useState(true);
  const [numberOfQuestions, setNumberOfQuestions] = useState(1);

  const quizNameInputRef = useRef(null);
  const questionInputRef = useRef(null);

  const navigate = useNavigate();

  const [haveNumberOFQuestions, setHaveNumberOFQuestions] = useState(false);

  const editQuizName = () => {
    setEditingQuizName(true);

    setTimeout(() => {
      if (!haveNumberOFQuestions) {
        let validInput = false;
        let numberOfQuestions;

        while (!validInput) {
          const input = prompt(
            "Enter number of questions to add for this quiz (1-20):"
          );

          numberOfQuestions = Number(input);

          if (
            !isNaN(numberOfQuestions) &&
            numberOfQuestions >= 1 &&
            numberOfQuestions <= 20
          ) {
            validInput = true;
          } else {
            alert("Please enter a valid number between 1 and 20.");
          }
        }

        setHaveNumberOFQuestions(true);

        setNumberOfQuestions(numberOfQuestions);
      }
    }, 3000);
  };

  const editQuestion = () => {
    setEditingQuestion(true);
  };

  const addQuestion = () => {
    if (options?.length === 4 && options.some((opt) => opt.correct == true)) {
      setQuestions((prev) => [...prev, { question, options }]);
      setOptions([]);
      setQuestion("Enter question");
      setOption("");
      setExampleShown(true);
    } else {
      alert(
        "Must be 4 options for a question and One options must be selected as correct option"
      );
    }
  };

  const handleOptionChange = (index, value) => {
    const updated = [...options];
    updated[index] = { option: value, correct: false };
    setOptions(updated);
  };
  const handleCorrectOptionChange = (index, value) => {
    const updated = [...options];
    updated[index] = { ...updated[index], correct: value };
    setOptions(updated);
  };

  const handleDelete = (index) => {
    const updated = options.filter((_, i) => i !== index);
    setOptions(updated);
  };
  const getOptionElem = () => {
    if (exampleShown) {
      setExampleShown(false);
    }

    setOptions((prevOptions) => [
      ...prevOptions,
      { option: "Enter option", correct: false },
    ]);
  };

  return (
    <>
    
    <div className="d-flex align-items-center">
      <img src={professorImg} alt="Professor illustration" width={900} height={400}/>
        <h3 style={createHeadingStyle}>
        Build quizzes your way — <br /> <br />Add questions, and options in seconds all in
        one spot!
      </h3>
    </div>

      <div className="m-5">
        <div style={createQuizNameStyle}>
          <span style={{ fontSize: "21px" }}>Quiz Name: </span>
          <input
            type="text"
            placeholder={quizName}
            ref={quizNameInputRef}
            style={{
              border: "none",
              fontSize: "20px",
              marginLeft: "11px",
              padding: "4px",
            }}
            onClick={editQuizName}
            onChange={(e) => setQuizName(e.target.value)}
          />
        </div>

        <div className="d-flex mt-5">
          {questions.length < numberOfQuestions ? (
            <div>
              <span style={{ fontSize: "21px" }}>Question: </span>
              <input
                type="text"
                placeholder={question}
                ref={questionInputRef}
                style={{ border: "none", fontSize: "20px", width: "640px" }}
                onClick={editQuestion}
                onChange={(e) => setQuestion(e.target.value)}
                className="px-4 py-0"
              />
            </div>
          ) : null}

          {questions.length < numberOfQuestions ? (
            <div>
              <button
                className="btn"
                style={addNextQuestionButtonStyle}
                onClick={addQuestion}
              >
                Add Next Question
              </button>
            </div>
          ) : (
            <div>
              <button
                className="btn"
                style={addPublishQuizButtonStyle}
                onClick={() =>
                  navigate("/quizzes/preview", { state: { questions } })
                }
              >
                Publish Quiz
              </button>
            </div>
          )}
        </div>

        {questions.length < numberOfQuestions ? (
          <div className="mt-3">
            {!exampleShown ? <h5>Options</h5> : null}
            <div>
              {options.map((opt, index) => (
                <div className="d-flex" key={index}>
                  <span style={CreateOptionNumberStyle}>{index + 1}</span>
                  <input
                    placeholder={opt.option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    className="w-75 me-5 px-4 py-0 mt-2"
                    style={{ border: "none", height: "40px" }}
                  />

                  <select
                    className="m-2 px-3"
                    onChange={(e) =>
                      handleCorrectOptionChange(
                        index,
                        e.target.value === "correct"
                      )
                    }
                    defaultValue={opt.correct ? "correct" : "incorrect"}
                  >
                    <option value="incorrect">Incorrect</option>
                    <option value="correct">Correct</option>
                  </select>

                  <span
                    style={{
                      fontSize: "40px",
                      cursor: "pointer",
                      marginLeft: "10px",
                    }}
                    onClick={() => handleDelete(index)}
                  >
                    &times;
                  </span>
                </div>
              ))}

              {!exampleShown ? null : (
                <div>
                  <h5 className="mt-3">
                    Example Options (Click on Add Option to add a new option)
                  </h5>
                  <div>
                    <div style={{ display: "flex" }}>
                      <span style={CreateOptionNumberStyle}>1</span>
                      <input
                        placeholder="Enter option"
                        style={{ border: "none", height: "40px" }}
                        className="w-75 me-5 px-4 py-0 mt-2"
                        disabled
                      />

                      <select className="m-2 px-3" defaultValue="incorrect">
                        <option value="incorrect">Incorrect</option>
                        <option value="correct">Correct</option>
                      </select>

                      <span
                        style={{
                          fontSize: "40px",
                          cursor: "pointer",
                          marginLeft: "10px",
                        }}
                      >
                        &times;
                      </span>
                    </div>
                    <div style={{ display: "flex" }}>
                      <span style={CreateOptionNumberStyle}>2</span>
                      <input
                        placeholder="Enter option"
                        style={{ border: "none", height: "40px" }}
                        className="w-75 me-5 px-4 py-0 mt-2"
                        disabled
                      />
                      <select className="m-2 px-3" defaultValue="incorrect">
                        <option value="incorrect">Incorrect</option>
                        <option value="correct">Correct</option>
                      </select>
                      <span
                        style={{
                          fontSize: "40px",
                          cursor: "pointer",
                          marginLeft: "10px",
                        }}
                      >
                        &times;
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {options?.length >= 4 ? null : (
              <button
                className="btn"
                onClick={getOptionElem}
                style={addOptionStyle}
              >
                Add Option
              </button>
            )}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default QuizCreate;
