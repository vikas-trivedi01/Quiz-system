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
import QuizCreate from "./components/QuizCreate";
import QuizPreview from "./components/QuizPreview";

import Signup from "./components/SignUp";
import Login from "./components/Login";

import UserAuthenticationContextProvider from "./context/UserAuthenticationContextProvider";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
   <Route path="/" element={<Layout />}>
  <Route path="" element={<Home />} />

  <Route path="users">
    <Route path="signup" element={<Signup />} />
    <Route path="login" element={<Login />} />
  </Route>

  <Route path="quizzes">
    <Route path="quizcode" element={<ProtectedRoute role="user" ><QuizCode /></ProtectedRoute>} />
    <Route path="quizlist" element={<ProtectedRoute role="user" ><QuizList /></ProtectedRoute>} />
    <Route path="result" element={<ProtectedRoute role="user" ><QuizResult /></ProtectedRoute>} />
    <Route path="review" element={<ProtectedRoute role="user" ><QuizReview /></ProtectedRoute>} />
    <Route path="preview" element={<ProtectedRoute role="admin" ><QuizPreview /></ProtectedRoute>} />
    <Route path="create" element={<ProtectedRoute role="admin" ><QuizCreate /></ProtectedRoute>} />
  </Route>

      <Route path="terms" element={<Terms />} />
      <Route path="privacy" element={<Privacy />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
 <UserAuthenticationContextProvider>
   <RouterProvider router={router} />
 </UserAuthenticationContextProvider>
);
