import { createContext, useContext, useState } from "react";

const NavContext = createContext();

export const useNav = () => useContext(NavContext);

export const NavProvider = ({ children }) => {
  const [activeNavLink, setActiveNavLink] = useState("home");
  const value = { activeNavLink, setActiveNavLink };
  return <NavContext.Provider value={value}>{children}</NavContext.Provider>;
};
