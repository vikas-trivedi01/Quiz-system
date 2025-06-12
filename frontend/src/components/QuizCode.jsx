import { useState } from "react";
import quizCodeImg from "../assets/illustrations/quiz-code.jpg";

import "../styles/variables.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { BACKEND_URL } from "../assets/constants.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { refreshAccessToken } from "../assets/tokens.js";

const QuizCode = () => { 
  const [code, setCode] = useState(null);
  const [isValidCode, setIsValidCode] = useState(false);

  const navigate = useNavigate();

  const validate = (e) => {
    const userCode = e.target.value;
    setCode(userCode);
    if (userCode.length == 6) {
      setIsValidCode(true);
    }
  };

  useEffect(() => {
     const checkCode = async () => {
          try {
            const response = await axios.post(
              `${BACKEND_URL}/join-code/participate`,
              {
                quizCode: code
              },
              {
                withCredentials: true,
              }
            );
    
            if (response?.status == 200) {
              navigate(`/quizzes/quiz?quizId=${response?.data?.data?.quizId}`);
            }
          } catch (error) {
            if (error?.response?.status == 401) {
              try {
                await refreshAccessToken();
                await checkCode();
              } catch (refreshError) {
                alert("Please login again");
                navigate("/users/login");
              }
            } else {
              alert(error?.message);
            }
          }
        };
    
        checkCode();
  }, [code]);

  const joinButtonStyle = {
    backgroundColor: `var(--clr-primary)`,
    color: "#fff",
    borderRadius: `var(--border-radius)`,
    padding: "8px",
    width: "150px",
    border: "none",
    cursor: "pointer",
  };

  return (
    <div className="text-center m-5 d-flex justify-content-between align-items-center">
      <div>
        <img
          src={quizCodeImg}
          alt="Person illustration"
          width={600}
          height={440}
          style={{ borderRadius: "15px", marginBottom: "10px" }}
        />
      </div>

      <div>
        <h3 className="mt-5" style={{ marginLeft: "60px" }}>
          Received a code from a known? <br />
          <br /> Use it here to join the quiz instantly.
        </h3>

        <br />

        <input
          type="text"
          placeholder="Enter Quiz Code"
          onChange={(e) => validate(e)}
          style={{
            height: "40px",
            width: "300px",
            marginRight: "40px",
            padding: "10px",
          }}
        />
        <button disabled={!isValidCode} style={joinButtonStyle}>
          Join Quiz
          <FontAwesomeIcon
            icon={faUpRightFromSquare}
            style={{ marginLeft: "10px" }}
          />
        </button>
      </div>
    </div>
  );
};

export default QuizCode;
