import "../styles/home.css";
import Testimonial from "./Testimonial";

import progress from "../assets/illustrations/progress.jpg";

import userOne from "../assets/users/user-one.png";
import userTwo from "../assets/users/user-two.png";
import userThree from "../assets/users/user-three.png";
import Quiz from "./Quiz";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="row">
        <div className="col-6 py-2 px-5">
          <img src={progress} alt="Illustration for progress" style={{ borderRadius: "30px", border: "2px solid black"}} width={550} height={450} />
        </div>
        <div className="col-6" style={{ marginTop: "93px"}}>
          <h2 id="tag-line">Test Your Knowledge. Track Your Growth</h2>
          <h4>
            Welcome to the smarter way to learn. <br /> Take quizzes across
            multiple topics, challenge yourself. <br /> Get instant feedback —
            all in one place.
          </h4>
          <div id="progress-buttons" className="mt-5">
            <button id="quiz-btn"><NavLink to="quizzes/quizlist" style={{ color: "#fff", textDecoration: "none" }}>Explore Quizzes</NavLink></button>
            <button className="btn btn-dark" id="about-btn">
              About Us
            </button>
          </div>
        </div>
      </div>

      <div className="row text-center p-4" style={{ marginTop: "60px" }}>
        <h3 className="mb-5">Your Thoughts Matter</h3>
        <div className="col-4 ">
          <Testimonial
            userAvatar={userOne}
            userName="abc"
            feedback="The quiz was intuitive and easy to navigate Great user experience!"
            date="23 May, 2024"
          />
        </div>
        <div className="col-4">
          <Testimonial
            userAvatar={userTwo}
            userName="xyz"
            feedback="Clean design and fast loading made taking the quiz smooth and efficient."
            date="03 January, 2022"
          />
        </div>
        <div className="col-4">
          <Testimonial
            userAvatar={userThree}
            userName="mnq"
            feedback="I liked the instant feedback after each question, it helped me learn quickly."
            date="13 April, 2024"
          />
        </div>
      </div>

      <Quiz />
    </>
  );
};

export default Home;
