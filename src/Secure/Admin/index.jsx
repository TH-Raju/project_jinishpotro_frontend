/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { ContextData } from "../../Context";
import Cookies from "universal-cookie";
import { Navigate, useLocation } from "react-router-dom";

const Admins = ({ children }) => {
  const { userRole } = useContext(ContextData);
  const cookies = new Cookies();
  const userId = cookies.get("id");
  const email = cookies.get("email");
  const location = useLocation();
  let verify = false;
  const validRoles = ["admin", "super_admin"];

  if (validRoles.includes(userRole)) {
    verify = true;
  }

  if (verify && userId && email) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default Admins;
