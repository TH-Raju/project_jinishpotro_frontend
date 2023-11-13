/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const ContextData = createContext();

const ShareContextData = ({ children }) => {
  const [theme, setTheme] = useState(true);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);

  let imgbbAPIKey = "cedfa53cc1e836179f47e98c08ae1930";
  const siteName = "JinishPotro";

  const share = {
    siteName,
    setTheme,
    theme,
    loading,
    setLoading,
    imgbbAPIKey,
    count,
    setCount,
    selectedOptions,
    setSelectedOptions,
  };
  return <ContextData.Provider value={share}>{children}</ContextData.Provider>;
};

export default ShareContextData;
