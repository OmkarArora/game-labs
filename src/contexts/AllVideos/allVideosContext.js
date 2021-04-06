// All videos context acts as a big database

import { createContext, useContext } from "react";
import { data } from "./mockData";

const AllVideosContext = createContext();

export const useAllVideos = () => useContext(AllVideosContext);

export const AllVideosProvider = ({ children }) => {
  const value = { allVideos: data };
  return (
    <AllVideosContext.Provider value={value}>
      {children}
    </AllVideosContext.Provider>
  );
};
