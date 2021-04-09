// All videos context acts as a big database

import { createContext, useContext } from "react";
import { data } from "./mockData";

const GuidesContext = createContext();

export const useGuides = () => useContext(GuidesContext);

export const GuidesProvider = ({ children }) => {
  const value = { guideVideos: data };
  return (
    <GuidesContext.Provider value={value}>
      {children}
    </GuidesContext.Provider>
  );
};
