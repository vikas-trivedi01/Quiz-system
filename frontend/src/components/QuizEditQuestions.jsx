import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CreateOptionNumberStyle, previewOptionsStyle } from "../assets/quizElementsStyles.js";

import axios from "axios";
import { BACKEND_URL } from "../assets/constants.js";
import { refreshAccessToken } from "../assets/tokens.js";

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

  const toggleOptionsVisible = (index) => {
    setIsShown(prev => !prev);

    setOptionsShown((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleQuestionChange = (index, newQuestion) => {
  setEditedQuestions(prev =>
    prev.map((q, i) => i === index ? { ...q, question: newQuestion } : q)
  );
};

const handleOptionChange = (questionIndex, optionIndex, optVal) => {
  setEditedQuestions(prev =>
    prev.map((q, i) => {
      if (i !== questionIndex) return q;

      const updatedOptions = q.options.map((opt, idx) => {
        if (idx !== optionIndex) return opt;
        return { ...opt, option: optVal };
      });

      return { ...q, options: updatedOptions };
    })
  );
};

    const handleCorrectOptionChange = (questionIndex, optionIndex) => {
      setEditedQuestions(prev =>
        (
          prev.map((q, i) => {
            if (i !== questionIndex) return q;

            const updatedOptions = q.options.map((opt, idx) => ({
              ...opt,
              isCorrect: idx === optionIndex,
            }));

            return { ...q, options: updatedOptions };
          })
        )
      )
  };

  const saveEditedQuestions = async () => {
    
    try {
      const response = await axios.put(`${BACKEND_URL}/quizzes/${quizId}/questions`,
        {
          questions: editedQuestions,
        },
        {
          withCredentials: true,
        }
      );
      if (response.data.statusCode == 200) {
        alert(response.data.message);
        navigate("/quizzes/allquizzes");
      }

    } catch (error) {
      if (error?.response?.status == 401) {
        try {
          await refreshAccessToken();
          await saveEditedQuestions();
        } catch (refreshError) {
          alert("Please login again");
          navigate("/users/login");
        }
      } else {
        alert(error?.message);
      }
    }
  };

  return (
      <>
         <div style={{ backgroundColor: "#000", borderRadius: "15px", width: "max-content", marginLeft: "259px"}} className="text-center p-4">
            <h2 className="mb-4 text-light">Edit Your Quiz Questions</h2>
            <p className="mb-6 text-light">
              You can now update your questions and options. Make sure all details are accurate before saving.
            </p>
         </div>

          <h3 className="mt-5" style={{ marginLeft: "16.2em" }}>Quiz: {quizName}</h3>

            {
               editedQuestions.map((questionObj, index) => {
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
                          {optionsShown[index] ? "Hide Options" : "Show Options"}
                        </button>
                      </div>

                    
                     {optionsShown[index] && (
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
                                          <span style={CreateOptionNumberStyle}>
                                            {optIndex + 1}
                                          </span>
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
                                            onChange={e => handleOptionChange(index, optIndex, e.target.value)}
                                          />
                                          <input type="radio" name={`${index}-option`} style={{ height: "30px", width: "30px"}} defaultChecked={optionObj.isCorrect ? true : false} className="mt-3" onClick={() => handleCorrectOptionChange(index, optIndex)}/>
                                        </div>
                                      ))}
                                      </div>
                                    )}
                  </div>
            )
            })
          }

           <div>
              <button
                style={{
                  backgroundColor: "#004e89",
                  color: "#fff",
                  borderRadius: "var(--border-radius)",
                  padding: "8px",
                  width: "200px",
                  border: "none",
                  cursor: "pointer",
                  marginLeft: "29em",
                  fontSize: "18px",
                }}
                onClick={saveEditedQuestions}
                className="mb-4"
              >
                Save Changes
              </button>
            </div>
     </>
  )
}

export default QuizEditQuestions
