import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import RangeSelector from "../Pages/UsesComponents";
import User from "../Pages/User";
import Login from "../Pages/Authentication/Login";
import Signup from "../Pages/Authentication/Signup";
import DashboardLayout from "../Layout/DashboardLayout";
import AddCategoriy from "../Pages/Dashboard/AddCategoriy";
import ProductsPageLayout from "../Layout/ProductsPageLayout";
import Products from "../Pages/Products";

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
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/products",
        element: <ProductsPageLayout />,
        children: [
          {
            path: "/products",
            element: <Products />,
          },
        ],
      },
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          {
            path: "/dashboard",
            element: <AddCategoriy />,
          },
          {
            path: "/dashboard/addCategoriy",
            element: <AddCategoriy />,
          },
        ],
      },
    ],
  },
]);
