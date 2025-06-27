import "../styles/home.css";
import Testimonial from "./Testimonial";

import progress from "../assets/illustrations/progress.jpg";
import userOne from "../assets/users/user-one.png";
import userTwo from "../assets/users/user-two.png";
import userThree from "../assets/users/user-three.png";

import { NavLink } from "react-router-dom";
import CountUp from "react-countup";
import { useEffect, useState } from "react";
import axios from "axios";

import { BACKEND_URL } from "../assets/constants.js";

const Home = () => {
  const [counts, setCounts] = useState([]);
  useEffect(() => {
    const getCounts = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/counts`, {
          withCredentials: true,
        });

        if (response?.status === 200) {
          setCounts(response?.data?.data?.counts);
        }
      } catch (error) {
        alert(error?.message);
      }
    };
    getCounts();
  }, []);

  return (
    <>
      <section className="bg-gradient text-white py-5">
        <div className="container row align-items-center">
          <div className="col-md-6 text-center">
            <img
              src={progress}
              alt="Progress Illustration"
              className="img-fluid rounded shadow"
              style={{ maxHeight: "420px" }}
            />
          </div>
          <div className="col-md-6 text-dark">
            <h1 className="display-4 fw-bold mb-3">
              Participate.
              <br /> Learn.
              <br /> Grow.
            </h1>
            <p className="lead mb-4">
              Enhance your understanding with engaging quizzes. <br /> 
              Get immediate results and boost your growth.
            </p>
            <div className="d-flex gap-3">
              <NavLink
                to="/quizzes/quizlist"
                className="btn btn-lg text-light"
                style={{ backgroundColor: "var(--clr-primary)" }}
              >
                Explore Quizzes
              </NavLink>
              <NavLink
                to="/info/about"
                className="btn btn-outline-light btn-lg"
                style={{ backgroundColor: "var(--clr-accent)", width: "200px" }}
              >
                About Us
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section py-5 text-center bg-light">
        <div className="container">
          <h2 className="section-title mb-5">Why Choose Us?</h2>
          <div className="row">
            {[
              {
                title: "Wide Range of Topics",
                desc: "Explore quizzes on various categories to enhance your knowledge.",
              },
              {
                title: "Instant Feedback",
                desc: "Get immediate scoring and insights to improve your performance.",
              },
              {
                title: "User-Friendly Interface",
                desc: "Enjoy a clean, intuitive platform designed for everyone.",
              },
            ].map((feature, idx) => (
              <div className="col-md-4 mb-4" key={idx}>
                <div className="feature-card p-4 border rounded shadow-sm h-100">
                  <h4 className="text-primary">{feature.title}</h4>
                  <p className="text-muted">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta bg-dark text-white text-center py-5">
        <div className="container">
          <h2 className="mb-3 text-info">Your Learning Journey Starts Now</h2>
          <p className="fs-5 mb-4">
            Join thousands of learners already mastering wide range of quizzes with us.
          </p>
          <NavLink
            to="/users/signup"
            className="btn btn-lg px-5"
            style={{ backgroundColor: "var(--clr-primary)" }}
          >
            Get Started
          </NavLink>
        </div>
      </section>

      <section className="counter-section py-5 text-center bg-white">
        <div className="container">
          <h2 className="mb-5">Platform Achievements</h2>
          <div className="row justify-content-center g-4">
            {Array.isArray(counts) && counts.length > 0 ? (
              counts.map((count, idx) => {
                return (
                  <div className="col-md-3" key={idx}>
                    <h1
                      className={`display-4 ${
                        ["text-primary", "text-success", "text-warning"][idx]
                      }`}
                    >
                      <CountUp end={count} duration={2} />+
                    </h1>
                    <p className="fs-5">
                      {
                        [
                          "Registered Users",
                          "Quizzes Available",
                          "Categories Available",
                        ][idx]
                      }
                    </p>
                  </div>
                );
              })
            ) : (
              <p className="fs-3 fw-bold">Loading counts...</p>
            )}
          </div>
        </div>
      </section>

      <section className="testimonials py-5 bg-white">
        <div className="container text-center">
          <h3 className="mb-5">Learners Love It</h3>
          <div className="row justify-content-center">
            {[userOne, userTwo, userThree].map((img, idx) => (
              <div className="col-md-4 mb-4" key={idx}>
                <Testimonial
                  userAvatar={img}
                  userName={["Rahul", "Abhay", "Parth"][idx]}
                  feedback={
                    [
                      "I appreciate the diverse range of topics available. It allows me to explore new areas of interest and expand my knowledge!",
                      "The user interface is incredibly intuitive. I can easily navigate through quizzes and track my progress without any hassle!",
                      "This platform has completely transformed my approach to learning. The interactive features keep me engaged and motivated!",
                    ][idx]
                  }
                  date={["23 May, 2024", "03 Jan, 2022", "13 Apr, 2024"][idx]}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
