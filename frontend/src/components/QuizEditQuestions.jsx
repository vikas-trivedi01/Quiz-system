import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CreateOptionNumberStyle, previewOptionsStyle } from "../assets/quizElementsStyles.js";

const QuizEditQuestions = () => {

   const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    if (location.state == null) {
      alert("Page not available");
      navigate("/");
    }
  }, [location.state, navigate]);

  if (location.state == null) return null;

  const { questions, quizName, quizId } = location.state;

  const [isShown, setIsShown] = useState(false);
  const [optionsShown, setOptionsShown] = useState({});
  const [editedQuestions, setEditedQuestions] = useState(questions);

  console.log(questions);


  const toggleOptionsVisible = (index) => {
    setIsShown(prev => !prev);

    setOptionsShown((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleQuestionChange = (index, question) => {
    setEditedQuestions(prev => {
      [...prev, prev[index].question = question]
    });
  }

  return (
      <>
         <div style={{ backgroundColor: "#000", borderRadius: "15px", width: "max-content", marginLeft: "259px"}} className="text-center p-4">
            <h2 className="mb-4 text-light">Edit Your Quiz Questions</h2>
            <p className="mb-6 text-light">
              You can now update your questions and options. Make sure all details are accurate before saving.
            </p>
         </div>

          <h3 className="text-center mt-5">Quiz: {quizName}</h3>

            {
               questions.map((questionObj, index) => {
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
                        <input type="text" defaultValue={questionObj.question} onChange={e => handleQuestionChange(index, e.target.value)}  style={{ width: "700px" }} required/>
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
                                      style={{ gap: "30px", marginLeft: "137px" }}
                                    >
                                      {questionObj.options.map((optionObj, optIndex) => (
                                        <div
                                          key={optIndex}
                                          className="d-flex justify-content-between"
                                          style={{ width: "700px", gap: "30px" }}
                                        >
                                          <span style={CreateOptionNumberStyle}>
                                            {optIndex + 1}
                                          </span>
                                          <input
                                            className="w-100 p-2"
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
                                          />
                                          <input type="radio" name={`${index}-option`} style={{ height: "30px", width: "30px" }}/>
                                        </div>
                                      ))}
                                      </div>
                                    )}
                  </div>
            )
            })
          }
     </>
  )
}

export default QuizEditQuestions
