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
import QuizAll from "./components/QuizAll";

import Signup from "./components/SignUp";
import Login from "./components/Login";

import UserAuthenticationContextProvider from "./context/UserAuthenticationContextProvider";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
<>
      <Route path="users">
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
      </Route>

    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route
        path="unauthorized"
        element={<h1 className="text-center">403 - Not Authorized</h1>}
      />

      <Route path="quizzes">
          <Route
            path="quizcode"
            element={
              <ProtectedRoute requiredRole="user">
                <QuizCode />
              </ProtectedRoute>
            }
          />

          <Route
            path="result"
            element={
              <ProtectedRoute requiredRole="user">
                <QuizResult />
              </ProtectedRoute>
            }
          />
          <Route
            path="review"
            element={
              <ProtectedRoute requiredRole="user">
                <QuizReview />
              </ProtectedRoute>
            }
          />

           <Route
            path="quizlist"
            element={
              <ProtectedRoute requiredRole="admin">
                <QuizList />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="preview"
            element={
              <ProtectedRoute requiredRole="admin">
                <QuizPreview />
              </ProtectedRoute>
            }
          />
          <Route
            path="create"
            element={
              <ProtectedRoute requiredRole="admin">
                <QuizCreate />
              </ProtectedRoute>
            }
          />

          <Route
            path="allquizzes"
            element={
              <ProtectedRoute requiredRole="admin">
                <QuizAll />
              </ProtectedRoute>
            }
          />
      </Route>

      <Route path="terms" element={<Terms />} />
      <Route path="privacy" element={<Privacy />} />
    </Route>
</>
  )
);

createRoot(document.getElementById("root")).render(
  <UserAuthenticationContextProvider>
    <RouterProvider router={router} />
  </UserAuthenticationContextProvider>
);
