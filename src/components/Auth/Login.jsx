import { useState, useEffect } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useAuth, useAlert, usePlaylists, useCategory } from "../../contexts";
import { LoadingState } from "../LoadingState/LoadingState";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchPlaylists, fetchUserSubscriptions } from "../../api";
import "./auth.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisibility] = useState(false);

  const { isUserLoggedIn, loginUserWithCredentials, appState } = useAuth();

  const { setSnackbar } = useAlert();

  const { state } = useLocation();
  const navigate = useNavigate();

  const { dispatch: playlistDispatch } = usePlaylists();
  const {dispatch: categoryDispatch} = useCategory();

  useEffect(() => {
    if (isUserLoggedIn) {
      if (state && state.from) {
        navigate(state.from);
      } else navigate("/");
    }
  }, [isUserLoggedIn, navigate, state]);

  const loginHandler = async (email, password) => {
    const msg = await loginUserWithCredentials(email, password);
    if (!msg.success) {
      setSnackbar({
        openStatus: true,
        type: "error",
        data: msg.errorMessage,
      });
    } else {
      setSnackbar({
        openStatus: true,
        type: "success",
        data: "Signed in successfully",
      });

      // fetch playlists
      (async () => {
        const userId = msg.user.id;
        const playlists = await fetchPlaylists(userId);
        if("isAxiosError" in playlists){
          return setSnackbar({
            openStatus: true,
            type: "error",
            data: "Error in loading playlists",
          });
        }
        playlistDispatch({type: "SET_PLAYLISTS", payload: {playlists: playlists}});
      })();

      //fetch user subscriptions
      (async () => {
        const userId = msg.user.id;
        const subscriptions = await fetchUserSubscriptions(userId);
        if("isAxiosError" in subscriptions){
          return setSnackbar({
            openStatus: true,
            type: "error",
            data: "Error in loading subscriptions",
          });
        }
        categoryDispatch({type: "SET_USER_SUBSCRIPTIONS", payload: {userSubscriptions: subscriptions}});
      })()
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    loginHandler(email, password);
  };

  return (
    <div className="page-auth container-form-login">
      <h2>LOGIN</h2>
      <form className="form-login" onSubmit={onSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label className="label-password">
          <input
            className="input-password"
            type={passwordVisible ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className="icon icon-eye"
            onClick={() => setPasswordVisibility((prev) => !prev)}
          >
            {passwordVisible ? <AiFillEye /> : <AiFillEyeInvisible />}
          </span>
        </label>
        {appState === "loading" ? (
          <LoadingState />
        ) : (
          <button type="submit" className="btn-submit">
            LOGIN
          </button>
        )}
      </form>

      <div>
        <Link to="/signup">Not a member yet? Sign Up</Link>
      </div>
    </div>
  );
};
