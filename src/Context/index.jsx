/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Cookies from "universal-cookie";
export const ContextData = createContext();

const ShareContextData = ({ children }) => {
  const [theme, setTheme] = useState(true);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const cookies = new Cookies();
  let userId = cookies.get("id");
  const [maxCount, setMaxCount] = useState(0);
  const [minCount, setMinCount] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [userRole, setUserRole] = useState("buyer");
  let imgbbAPIKey = "cedfa53cc1e836179f47e98c08ae1930";
  const siteName = "JinishPotro";
  const { data: userRoles } = useQuery({
    queryKey: ["userRole"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/api/v1/user/${userId}`);
      const data = await res.json();
      setUserRole(data?.data[0].role);
      return data?.data[0].role;
    },
  });
  // console.log(userRoles);
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
    setUserRole,
  };
  return <ContextData.Provider value={share}>{children}</ContextData.Provider>;
};

export default ShareContextData;
