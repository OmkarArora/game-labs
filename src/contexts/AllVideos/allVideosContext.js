// All videos context acts as a big database

import { createContext, useContext, useReducer, useEffect } from "react";
import { fetchAllVideos } from "../../api";
import { allVideosReducer } from "./allVideosReducer";

const AllVideosContext = createContext();

export const useAllVideos = () => useContext(AllVideosContext);

export const AllVideosProvider = ({ children }) => {
  const [{ videos }, dispatch] = useReducer(allVideosReducer, { videos: [] });
  
  useEffect(() => {
    (async () => {
      const fetchedVideos = await fetchAllVideos();
      if ("isAxiosError" in fetchedVideos) {
        //set error
      } else {
        dispatch({ type: "SET_VIDEOS", payload: { videos: fetchedVideos } });
      }
    })();
  }, []);

  const value = { videos, dispatch };

  return (
    <AllVideosContext.Provider value={value}>
      {children}
    </AllVideosContext.Provider>
  );
};
