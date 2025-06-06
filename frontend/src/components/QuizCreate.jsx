import { useEffect, useRef, useState } from "react";
import {
  addNextQuestionButtonStyle,
  createHeadingStyle,
  createQuizNameStyle,
  addOptionStyle,
  CreateOptionNumberStyle,
  addPreviewQuizButtonStyle,
  inputStyle,
  labelStyle,
} from "../assets/quizElementsStyles.js";
import professorImg from "../assets/illustrations/professor.png";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

const QuizCreate = () => {
  const [quizName, setQuizName] = useState("");
  const [editingQuizName, setEditingQuizName] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(false);

  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState([]);
  const [question, setQuestion] = useState("");
  const [option, setOption] = useState("");

  const [exampleShown, setExampleShown] = useState(true);
  const [numberOfQuestions, setNumberOfQuestions] = useState(1);

  const quizNameInputRef = useRef(null);
  const questionInputRef = useRef(null);

  const navigate = useNavigate();

  const [haveNumberOfQuestions, setHaveNumberOfQuestions] = useState(false);

  const [totalMarks, setTotalMarks] = useState(0);
  const [eachQuestionMarks, setEachQuestionMarks] = useState(1);
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const [quizDetailsShown, setQuizDetailsShown] = useState(false);
  const quizDetailsRef = useRef(null);

  const editQuizName = () => {
    setEditingQuizName(true);

    setTimeout(() => {
      if (!haveNumberOfQuestions) {
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

        setHaveNumberOfQuestions(true);

        setNumberOfQuestions(numberOfQuestions);
      }
    }, 3000);
  };

  const editQuestion = () => {
    setEditingQuestion(true);
  };

  const addQuestion = () => {
    if (options?.length === 4 && options.some((opt) => opt.isCorrect == true)) {
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
    updated[index] = { option: value, isCorrect: false };
    setOptions(updated);
  };
  const handleCorrectOptionChange = (index, value) => {
    const updated = [...options];
    updated[index] = { ...updated[index], isCorrect: value };
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
      { option: "Enter option", isCorrect: false },
    ]);
  };

  useEffect(() => {
    setTotalMarks(questions.length * eachQuestionMarks);
  }, [questions, eachQuestionMarks]);

  const previewQuiz = () => {
    if (
      [quizName, category, difficulty].some(
        (field) => field.trim() == ""
      )
    ) return alert("All fields required");

    navigate("/quizzes/preview", {
      state: {
        questions,
        quizName,
        totalMarks,
        eachQuestionMarks,
        category,
        difficulty,
        numberOfQuestions,
      },
    });
  };

  return (
    <>
      <div className="d-flex align-items-center">
        <img
          src={professorImg}
          alt="Professor illustration"
          width={900}
          height={400}
        />
        <h3 style={createHeadingStyle}>
          Build quizzes your way — <br /> <br />
          Add questions, and options in seconds all in one spot!
        </h3>
      </div>

      <div style={{ marginLeft: "350px" }} className="mt-5">
        <div style={createQuizNameStyle} className="d-flex">
          <label style={labelStyle}>Quiz Name:</label>
          <input
            type="text"
            placeholder={quizName}
            ref={quizNameInputRef}
            style={{ width: "430px" }}
            onClick={editQuizName}
            className="mt-3"
            onChange={(e) => setQuizName(e.target.value)}
          />
        </div>
      </div>
      <div className="text-center">
        {!quizDetailsShown ? (
          <button
            style={{ width: "230px" }}
            onClick={() => setQuizDetailsShown(true)}
          >
            Show Quiz Details{" "}
            <FontAwesomeIcon icon={faBars} style={{ marginLeft: "10px" }} />
          </button>
        ) : (
          <button
            style={{ width: "230px" }}
            onClick={() => setQuizDetailsShown(false)}
          >
            Hide Quiz Details{" "}
            <FontAwesomeIcon icon={faXmark} style={{ marginLeft: "10px" }} />
          </button>
        )}
      </div>

      <div
        ref={quizDetailsRef}
        style={{ display: `${quizDetailsShown ? "block" : "none"}` }}
      >
        <div className="mt-4">
          <div>
            <div className="row m-5">
              <div className="col-6">
                <label style={labelStyle}>Marks per Question:</label>
                <input
                  type="number"
                  min={1}
                  value={eachQuestionMarks}
                  onChange={(e) => setEachQuestionMarks(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>

              <div className="col-6">
                <label style={labelStyle}>Category:</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>

            <div className="row m-5">
              <div className="col-6">
                <label style={labelStyle}>Difficulty:</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  style={{ ...inputStyle, height: "40px" }}
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

            </div>
          </div>
        </div>
      </div>

      <div className="d-flex" style={{ margin: "80px" }}>
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
              className="p-2"
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
              style={addPreviewQuizButtonStyle}
              onClick={() => previewQuiz()}
            >
              Preview Quiz
            </button>
          </div>
        )}
      </div>

      {questions.length < numberOfQuestions ? (
        <div style={{ margin: "10px 50px 100px 50px" }}>
          {!exampleShown ? <h5>Options</h5> : null}
          <div>
            {options.map((opt, index) => (
              <div className="d-flex align-items-center mb-3" key={index}>
                <span style={CreateOptionNumberStyle}>{index + 1}</span>

                <input
                  placeholder={opt.option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className="flex-grow-1 px-3"
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    height: "40px",
                    marginRight: "1rem",
                  }}
                />

                <select
                  onChange={(e) =>
                    handleCorrectOptionChange(
                      index,
                      e.target.value === "correct"
                    )
                  }
                  defaultValue={opt.isCorrect ? "correct" : "incorrect"}
                  style={{
                    height: "40px",
                    borderRadius: "4px",
                    padding: "0 10px",
                    marginRight: "1rem",
                  }}
                >
                  <option value="incorrect">Incorrect</option>
                  <option value="correct">Correct</option>
                </select>

                <span
                  style={{
                    fontSize: "32px",
                    cursor: "pointer",
                    color: "red",
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
    </>
  );
};

export default QuizCreate;
