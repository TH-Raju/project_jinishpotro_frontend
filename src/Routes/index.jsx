import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import RangeSelector from "../Pages/UsesComponents";
import User from "../Pages/User";
import Login from "../Pages/Authentication/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/range",
        element: <RangeSelector />,
      },
      {
        path: "/wishlist",
        element: <User />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);
