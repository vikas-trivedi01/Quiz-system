import progress from "../assets/illustrations/progress.png";
import "../styles/home.css";
import Testimonial from "./Testimonial";

const Home = () => {
  return (
    <>
      <div className="row">
        <div className="col-6 bg-danger">
          <img src={progress} alt="Illustration for progress" width={650} />
        </div>
        <div className="col-6 mt-5">
          <h2 id="tag-line">Test Your Knowledge. Track Your Growth</h2>
          <h4>
            Welcome to the smarter way to learn. <br /> Take quizzes across multiple
            topics, challenge yourself. <br /> Get instant feedback — all in one
            place.
          </h4>
          <div id="progress-buttons" className="mt-5">
            <button id="start-btn">Start Quiz</button>
            <button className="btn btn-dark" id="about-btn">
              About Us
            </button>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-4">
            <Testimonial
             userAvatar="import i1 from '../../assets/illustrations/i1.png'"
             userName="abc"
             feedback="feed1"
             date="03 April, 2024"
             
             />
        </div>
        <div className="col-4">
            <Testimonial
             userAvatar="import i1 from '../../assets/illustrations/i1.png'"
             userName="xyz"
             feedback="feed2"
             date="03 April, 2024"

            />
        </div>
      </div>
    </>
  );
};

export default Home;
