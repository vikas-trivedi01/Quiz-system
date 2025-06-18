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
import About from "./components/About";

import Quiz from "./components/Quiz";
import QuizCode from "./components/QuizCode";
import QuizList from "./components/QuizList";
import QuizResult from "./components/QuizResult";
import QuizReview from "./components/QuizReview";
import QuizCreate from "./components/QuizCreate";
import QuizPreview from "./components/QuizPreview";
import QuizAll from "./components/QuizAll";
import QuizDeletionConfirmation from "./components/QuizDeletionConfirmation";
import QuizEditQuestions from "./components/QuizEditQuestions";
import QuizEditDetails from "./components/QuizEditDetails";
import QuizParticipants from "./components/QuizParticipants";

import Signup from "./components/SignUp";
import Login from "./components/Login";

import UserAuthenticationContextProvider from "./context/UserAuthenticationContextProvider";
import ProtectedRoute from "./ProtectedRoute";

import UserProfile from "./components/UserProfile";
import AdminProfile from "./components/AdminProfile";
import ChangePassword from "./components/ChangePassword";
import EditProfile from "./components/EditProfile";
import QuizViewQuestions from "./components/QuizViewQuestions";


const router = createBrowserRouter(
  createRoutesFromElements(
<>
      <Route path="users">
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
      </Route>
      
      <Route
        path="unauthorized"
        element={
                 <div style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100vh",
                  textAlign: "center"
                }}>
                  <h1>403 - Not Authorized</h1>
                  <button type="button" onClick={() => window.location.href = "/"} style={{width: "300px"}}>
                    Back to Home
                  </button>
                </div>

                }
      />

    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />

      <Route path="quizzes">
          <Route
            path="quiz"
            element={
              <ProtectedRoute requiredRole="user">
                <Quiz />
              </ProtectedRoute>
            }
          />

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
              <ProtectedRoute requiredRole="user">
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

          <Route
            path="delete"
            element={
              <ProtectedRoute requiredRole="admin">
                <QuizDeletionConfirmation />
              </ProtectedRoute>
            }
          />
          <Route
            path="questions"
            element={
              <ProtectedRoute requiredRole="admin">
                <QuizViewQuestions />
              </ProtectedRoute>
            }
          />
          
            <Route path="edit">
                <Route path="questions" element={
                    <ProtectedRoute requiredRole="admin">
                        <QuizEditQuestions />
                      </ProtectedRoute>
                  }/>

                <Route path="quiz" element={
                    <ProtectedRoute requiredRole="admin">
                        <QuizEditDetails />
                      </ProtectedRoute>
                  }/>
                
            </Route>

          <Route path="participants" element={
            <ProtectedRoute requiredRole="admin">
              <QuizParticipants />
            </ProtectedRoute>
          }/>
        </Route>

        

      <Route path="profile" >
          <Route path="user" element={
            <ProtectedRoute requiredRole="user">
              <UserProfile />
            </ProtectedRoute>
          } />

          <Route path="admin" element={
            <ProtectedRoute requiredRole="admin">
              <AdminProfile />
            </ProtectedRoute>
          } />

          <Route path="change-password" element={
              <ChangePassword />
          } />

          <Route path="edit-profile" element={
              <EditProfile />
          } />
        
        </Route>

      
      <Route path="info">
        <Route path="terms" element={<Terms />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="about" element={<About />} />
      </Route>
    </Route>
  </> 
  )
);

createRoot(document.getElementById("root")).render(
  <UserAuthenticationContextProvider>
    <RouterProvider router={router} />
  </UserAuthenticationContextProvider>
);
