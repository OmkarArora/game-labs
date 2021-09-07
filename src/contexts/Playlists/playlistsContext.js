import { createContext, useContext, useReducer, useEffect } from "react";
import {
  fetchPlaylists,
  fetchHistory,
  fetchWatchLater,
} from "../../api/playlists.api";
import { setupAuthHeaderForServiceCalls } from "../axiosMethods";
import { reducerFn } from "./playlistsReducer";

const PlaylistsContext = createContext();

export const usePlaylists = () => useContext(PlaylistsContext);

export const PlaylistsProvider = ({ children }) => {
  const [{ playlists, appState, watchLater, history }, dispatch] = useReducer(
    reducerFn,
    {
      playlists: [],
      watchLater: {},
      history: {},
      appState: "success",
    }
  );

  useEffect(() => {
    const loginStatus = JSON.parse(localStorage?.getItem("glabslogin"));
    if (loginStatus) {
      setupAuthHeaderForServiceCalls(loginStatus.token);
      const userId = JSON.parse(localStorage.getItem("glabslogin")).userId;
      (async () => {
        const fetchedPlaylists = await fetchPlaylists(userId);
        if (!("isAxiosError" in fetchedPlaylists))
          dispatch({
            type: "SET_PLAYLISTS",
            payload: { playlists: fetchedPlaylists },
          });
      })();

      // fetch user history
      (async () => {
        const history = await fetchHistory(userId);
        if (!("isAxiosError" in history)) {
          dispatch({
            type: "SET_HISTORY",
            payload: { history },
          });
        }
      })();

      // fetch user watch later
      (async () => {
        const watchLater = await fetchWatchLater(userId);
        if (!("isAxiosError" in watchLater)) {
          dispatch({
            type: "SET_WATCH_LATER",
            payload: { watchLater },
          });
        }
      })();
    }
  }, []);

  const value = { playlists, watchLater, history, appState, dispatch };
  return (
    <PlaylistsContext.Provider value={value}>
      {children}
    </PlaylistsContext.Provider>
  );
};
