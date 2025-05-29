import { useState } from "react";
import quizCodeImg from "../assets/illustrations/quiz-code.png";

import "../styles/variables.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

const QuizCode = () => {
  const [code, setCode] = useState(null);
  const [isValidCode, setIsValidCode] = useState(false);

  const validate = (e) => {
    const userCode = e.target.value;
    if (userCode.length == 6) {
      setCode(userCode);
      setIsValidCode(true);
    }
  };

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
          width={500}
          height={400}
          style={{ borderRadius: "15px" }}
        />
      </div>

      <div>
        <h3 className="mt-5">
          Received a code from your teacher or friend? <br /> Use it here to
          join the quiz instantly.
        </h3>

        <br />

        <input
          type="text"
          name="code"
          placeholder="Enter Quiz Code"
          onChange={(e) => validate(e)}
          style={{
            height: "40px",
            width: "300px",
            marginRight: "40px",
            padding: "10px",
          }}
        />
        <button
          disabled={!isValidCode}
          style={joinButtonStyle}
        >
          Join Quiz
        <FontAwesomeIcon icon={faUpRightFromSquare} style={{ marginLeft: "10px" }}/>
        </button>
      </div>
    </div>
  );
};

export default QuizCode;
