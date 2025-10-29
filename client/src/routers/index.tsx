import { createBrowserRouter } from "react-router-dom";
import HomePage from "../page/home/HomePage";
import Register from "../components/forms/Register";
import AuthPage from "../page/auth/AuthPage";
import Login from "../components/forms/Login";
import Header from "../components/common/Header";
import NotFound404 from "../page/NotFound404";
import ProtectedRoute from "../components/ProtectedRoute";
import BookingPage from "../page/user/BookingPage";
import ManageCourses from "../page/admin/ManageCourses";

export const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <HomePage />,
  // },
  // {
  //   path: "/auth/Login",
  //   element: <AuthPage />,
  //   children: [
  //     {
  //       index: true,
  //       element: <Login />,
  //     },
  //   ],
  // },
  {
    path: "/",
    errorElement: <NotFound404 />,
    element: <Header />,
    children: [
      {
        index: true,
        // path: "/homePage",
        element: <HomePage />,
      },
      {
        path: "/auth",
        element: <AuthPage />,
        children: [
          {
            path: "/auth/login",
            element: <Login />,
          },
          {
            path: "/auth/register",
            element: <Register />,
          },
        ],
      },
      {
        path: "/booking",
        element: (
          <ProtectedRoute>
            <BookingPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/admin",
    children: [
      {
        path: "/admin/manage-courses",
        element: <ManageCourses />,
      },
      {
        path: "/admin/statistical-courses",
        element: <ManageCourses />,
      },
    ],
  },
]);
