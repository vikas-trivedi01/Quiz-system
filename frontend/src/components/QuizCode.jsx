import { useState } from "react"
import quizCodeImg from "../assets/illustrations/quiz-code.png"

import "../styles/variables.css";

const QuizCode = () => {

  const [code, setCode] = useState(null);
  const [isValidCode, setIsValidCode] = useState(false);

  const validate = e => {
    const userCode  = e.target.value;
    if( userCode.length == 6) {
        setCode(userCode);
        setIsValidCode(true);
    }
  }

  const joinButtonStyle = {
    backgroundColor : `var(--clr-primary)`,
    color: "#fff",
    borderRadius: `var(--border-radius)`
  }

  return (
    <div>
        <img src={quizCodeImg} alt="" />
      <p>Received a code from your teacher or friend? Use it here to join the quiz instantly.</p>
      <input type="text" name="code" placeholder="Enter Quiz Code" onChange={(e) => validate(e)}/>
      <button disabled={!isValidCode} style={joinButtonStyle}>Join Quiz</button>
    </div>
  )
}

export default QuizCode
