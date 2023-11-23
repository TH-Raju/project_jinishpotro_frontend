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
  // const { data: userRoles } = useQuery({
  //   queryKey: ["userRole"],
  //   queryFn: async () => {
  //     const res = await fetch(`http://localhost:5000/api/v1/user/${userId}`);
  //     const data = await res.json();

  //     // Check if data is undefined before accessing properties
  //     if (data && data?.data && data?.data[0] && data?.data[0].role) {
  //       setUserRole(data.data[0].role);
  //       return data.data[0].role;
  //     } else {
  //       // Handle the case where the data is not as expected
  //       console.error("Unexpected data format:", data);
  //       return null; // or handle accordingly
  //     }
  //   },
  // });

  // useEffect(() => {
  //   fetch(`http://localhost:5000/api/v1/user/${userId}`)
  //     .then((res) => res.json())
  //     .then((data) => setUserData(data?.data));
  // }, [userId]);
  // setUserRole(userData?.role);
  // console.log(userData);
  // console.log(userId);
  if (accessToken) {
    accessToken = accessToken.replace("bearer", "");

    const decoded = jwtDecode(accessToken);
    // setUserRole(decoded.role);
    userRole = decoded.role;
    console.log(decoded);
  } else {
    console.log("No Access token here");
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
