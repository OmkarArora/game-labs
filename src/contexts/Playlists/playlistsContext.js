import { createContext, useContext, useReducer, useEffect } from "react";
import { fetchPlaylists } from "../../api/playlists.api";
import { reducerFn } from "./playlistsReducer";

const PlaylistsContext = createContext();

export const usePlaylists = () => useContext(PlaylistsContext);

export const PlaylistsProvider = ({ children }) => {
  const [{ playlists, appState }, dispatch] = useReducer(reducerFn, {
    playlists: [], appState: "success"
  });

  useEffect(() => {
    const loginStatus = JSON.parse(localStorage?.getItem("glabslogin"));
    if(loginStatus){
      (async () => {
        const userId = JSON.parse(localStorage.getItem("glabslogin")).userId;
        const fetchedPlaylists = await fetchPlaylists(userId);
        dispatch({type:"SET_PLAYLISTS", payload: {playlists: fetchedPlaylists}});
      })();
    }
  }, [])

  const value = { playlists, appState, dispatch };
  return (
    <PlaylistsContext.Provider value={value}>
      {children}
    </PlaylistsContext.Provider>
  );
};
