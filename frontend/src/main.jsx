import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Layout from "./components/Layout";
import QuizCode from "./components/QuizCode";
import QuizList from "./components/QuizList";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={ <Layout/> }>
      
      <Route path="" element={ <Home /> } />
      
      <Route path="quizzes">
        <Route path="quizcode" element={ <QuizCode /> } />
        <Route path="quizlist" element={ <QuizList /> } />
      </Route>

      <Route path="terms" element={ <Home /> } />

      <Route path="privacy" element={ <Home /> } />

    </Route>
  )
);

createRoot(document.getElementById("root")).render( 
  <RouterProvider router={router} />
);
