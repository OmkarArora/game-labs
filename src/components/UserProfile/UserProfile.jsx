import { useAuth, usePlaylists } from "../../contexts";
import "./userProfile.css";

export const UserProfile = () => {
  const { isUserLoggedIn, logoutUser } = useAuth();
  const { dispatch } = usePlaylists();
  const logoutHandler = () => {
    dispatch({type: "SET_PLAYLISTS", payload: {playlists: []}});
    logoutUser();
  };

  return (
    <div className="">
      <div className="container-userProfile">
        Profile
        <br />
        {isUserLoggedIn && <button onClick={logoutHandler}>Log out</button>}
      </div>
    </div>
  );
};
