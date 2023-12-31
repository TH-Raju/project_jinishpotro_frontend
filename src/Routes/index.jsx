import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Authentication/Login";
import Signup from "../Pages/Authentication/Signup";
import DashboardLayout from "../Layout/DashboardLayout";
import AddCategoriy from "../Pages/Dashboard/AddCategoriy";
import ProductsPageLayout from "../Layout/ProductsPageLayout";
import Products from "../Pages/Products";
import AddProduct from "../Pages/Dashboard/AddProduct";
import CategoriesProduct from "../Pages/CategoryProducts";
import CategoriyAllProduct from "../Pages/CategoriyAllProduct";
import Orders from "../Pages/Dashboard/Orders";
import ErrorPage from "../Shared/ErrorPage";
import Profile from "../Pages/Dashboard/Profile";
import AllUser from "../Pages/Dashboard/AllUser";
import AllProduct from "../Pages/Dashboard/AllProduct";
import AllCategoriy from "../Pages/Dashboard/AllCategoriy";

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
        path: "/categoriy/:categoryId/:productId",
        loader: ({ params }) =>
          fetch(
            `https://jinishpotro-backend-5zxijrpet-th-raju.vercel.app/api/v1/categoriy/${params.categoryId}/product/${params.productId}`
          ),
        element: <CategoriesProduct />,
      },
      {
        path: "/categoriy/:id",
        loader: ({ params }) =>
          fetch(
            `https://jinishpotro-backend-5zxijrpet-th-raju.vercel.app/api/v1/categoriy/${params.id}`
          ),
        element: <CategoriyAllProduct />,
      },
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          {
            path: "/dashboard",
            element: <Profile />,
          },
          {
            path: "/dashboard/profile",
            element: <Profile />,
          },
          {
            path: "/dashboard/addCategoriy",
            element: <AddCategoriy />,
          },
          {
            path: "/dashboard/addProduct",
            element: <AddProduct />,
          },
          {
            path: "/dashboard/orders",
            element: <Orders />,
          },
          {
            path: "/dashboard/alluser",
            element: <AllUser />,
          },
          {
            path: "/dashboard/allcategoriy",
            element: <AllCategoriy />,
          },
          {
            path: "/dashboard/allproduct",
            element: <AllProduct />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
