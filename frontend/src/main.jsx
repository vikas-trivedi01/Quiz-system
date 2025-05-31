import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import "./index.css";

import Home from "./components/Home";
import Layout from "./components/Layout";
import Terms from "./components/Terms";
import Privacy from "./components/Privacy";

import QuizCode from "./components/QuizCode";
import QuizList from "./components/QuizList";
import QuizResult from "./components/QuizResult";
import QuizReview from "./components/QuizReview";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />

      <Route path="quizzes">
        <Route path="quizcode" element={<QuizCode />} />
        <Route path="quizlist" element={<QuizList />} />
        <Route path="result" element={<QuizResult />} />
        <Route path="review" element={<QuizReview />} />
      </Route>

      <Route path="terms" element={<Terms />} />

      <Route path="privacy" element={<Privacy />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
