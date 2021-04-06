import { createContext, useContext, useReducer } from "react";
// import { reducerFn } from "./cartReducer";

const PlaylistsContext = createContext();

export const usePlaylists = () => useContext(PlaylistsContext);

export const PlaylistsProvider = ({ children }) => {
  // const [{cart}, dispatch] = useReducer(reducerFn, { cart: [] });
  const value = { };
  return <PlaylistsContext.Provider value={value}>{children}</PlaylistsContext.Provider>;
};
