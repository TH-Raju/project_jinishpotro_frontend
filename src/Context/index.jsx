/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const ContextData = createContext();

const ShareContextData = ({ children }) => {
  const [theme, setTheme] = useState(true);
  const siteName = "JinishPotro";

  const share = {
    siteName,
    setTheme,
    theme,
  };
  return <ContextData.Provider value={share}>{children}</ContextData.Provider>;
};

export default ShareContextData;
