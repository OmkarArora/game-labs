import { useState, useEffect } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useAuth, useAlert, usePlaylists, useCategory } from "../../contexts";
import { LoadingModal } from "../LoadingModal/LoadingModal";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchPlaylists, fetchUserSubscriptions } from "../../api";
import "./auth.css";
import { fetchHistory, fetchWatchLater } from "../../api/playlists.api";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisibility] = useState(false);

  const { isUserLoggedIn, loginUserWithCredentials, appState } = useAuth();

  const { setSnackbar } = useAlert();

  const { state } = useLocation();
  const navigate = useNavigate();

  const { dispatch: playlistDispatch } = usePlaylists();
  const { dispatch: categoryDispatch } = useCategory();

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
        if ("isAxiosError" in playlists) {
          return setSnackbar({
            openStatus: true,
            type: "error",
            data: "Error in loading playlists",
          });
        }
        playlistDispatch({
          type: "SET_PLAYLISTS",
          payload: { playlists: playlists },
        });
      })();

      // fetch user history
      (async () => {
        const userId = msg.user.id;
        const history = await fetchHistory(userId);
        if ("isAxiosError" in history) {
          return setSnackbar({
            openStatus: true,
            type: "error",
            data: "Error in loading user history",
          });
        }
        playlistDispatch({
          type: "SET_HISTORY",
          payload: { history },
        });
      })();

      // fetch user watch later
      (async () => {
        const userId = msg.user.id;
        const watchLater = await fetchWatchLater(userId);
        if ("isAxiosError" in watchLater) {
          return setSnackbar({
            openStatus: true,
            type: "error",
            data: "Error in loading user history",
          });
        }
        playlistDispatch({
          type: "SET_WATCH_LATER",
          payload: { watchLater },
        });
      })();

      //fetch user subscriptions
      (async () => {
        const userId = msg.user.id;
        const subscriptions = await fetchUserSubscriptions(userId);
        if ("isAxiosError" in subscriptions) {
          return setSnackbar({
            openStatus: true,
            type: "error",
            data: "Error in loading subscriptions",
          });
        }
        categoryDispatch({
          type: "SET_USER_SUBSCRIPTIONS",
          payload: { userSubscriptions: subscriptions },
        });
      })();
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    loginHandler(email, password);
  };

  const onSubmitTestCreds = (e) => {
    e.preventDefault();
    loginHandler("user@gmail.com", "abcd@1234");
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
        {/* {appState === "loading" ? (
          <LoadingModal />
        ) : (
          <button type="submit" className="btn-submit">
            LOGIN
          </button>
        )} */}
        <button type="submit" className="btn-submit">
          Login
        </button>
      </form>
      <form className="form-login test-creds" onSubmit={onSubmitTestCreds}>
        <button type="submit" className="btn-submit">
          Login with Test Credentials
        </button>
      </form>

      <div>
        <Link to="/signup" className="link-login">
          Not a member yet? Sign Up
        </Link>
      </div>

      {appState === "loading" && <LoadingModal />}
    </div>
  );
};
