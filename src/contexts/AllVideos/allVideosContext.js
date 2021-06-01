// All videos context acts as a big database

import { createContext, useContext, useReducer, useEffect } from "react";
import { fetchAllVideos } from "../../api";
import { allVideosReducer } from "./allVideosReducer";

const AllVideosContext = createContext();

export const useAllVideos = () => useContext(AllVideosContext);

export const AllVideosProvider = ({ children }) => {
  const [{ videos, appState }, dispatch] = useReducer(allVideosReducer, {
    videos: [],
    appState: "success",
  });

  useEffect(() => {
    (async () => {
      dispatch({ type: "SET_APP_STATE", payload: { appState: "loading" } });
      const fetchedVideos = await fetchAllVideos();
      if ("isAxiosError" in fetchedVideos) {
        //set error
        dispatch({ type: "SET_APP_STATE", payload: { appState: "error" } });
      } else {
        dispatch({ type: "SET_VIDEOS", payload: { videos: fetchedVideos } });
        dispatch({ type: "SET_APP_STATE", payload: { appState: "success" } });
      }
    })();
  }, []);

  const value = { videos, appState, dispatch };

  return (
    <AllVideosContext.Provider value={value}>
      {children}
    </AllVideosContext.Provider>
  );
};
