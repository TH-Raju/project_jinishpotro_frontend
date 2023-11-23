/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";

export const ContextData = createContext();
const ShareContextData = ({ children }) => {
  const [theme, setTheme] = useState(true);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const cookies = new Cookies();
  let userId = cookies.get("id");
  const [maxCount, setMaxCount] = useState(0);
  let accessToken = localStorage.getItem("accessToken");
  const [minCount, setMinCount] = useState(0);
  const [userData, setUserData] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState();
  // const [userRole, setUserRole] = useState("buyer");
  let imgbbAPIKey = "cedfa53cc1e836179f47e98c08ae1930";
  const siteName = "JinishPotro";
  let userRole;


  if (accessToken) {
    accessToken = accessToken.replace("bearer", "");

    const decoded = jwtDecode(accessToken);
    // setUserRole(decoded.role);
    userRole = decoded.role;
    console.log(decoded);
  } else {
    userRole = "buyer";
  }

  const share = {
    siteName,
    setTheme,
    theme,
    loading,
    setLoading,
    imgbbAPIKey,
    count,
    setCount,
    maxCount,
    setMaxCount,
    minCount,
    setMinCount,
    selectedOptions,
    setSelectedOptions,
    userRole,
    // setUserRole,
  };
  return <ContextData.Provider value={share}>{children}</ContextData.Provider>;
};

export default ShareContextData;
