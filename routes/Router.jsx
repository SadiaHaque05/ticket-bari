import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Login from "../Pages/login/login";
import ErrorPage from "../Pages/ErrorPage";
import SignUp from "../Pages/signup/SignUp";
import Home from "../components/Home/Home";

export const router = createBrowserRouter([
  {
     path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
]);