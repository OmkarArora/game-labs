import { createContext, useContext, useReducer } from "react";
import { reducerFn } from "./playlistsReducer";
import { data } from "./mockData";

const PlaylistsContext = createContext();

export const usePlaylists = () => useContext(PlaylistsContext);

export const PlaylistsProvider = ({ children }) => {
  const [{ playlists }, dispatch] = useReducer(reducerFn, {
    playlists: [...data],
  });
  const value = { playlists, dispatch };
  return (
    <PlaylistsContext.Provider value={value}>
      {children}
    </PlaylistsContext.Provider>
  );
};
