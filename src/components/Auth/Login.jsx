import { useState, useEffect } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useAuth, useAlert } from "../../contexts";
import { LoadingState } from "../LoadingState/LoadingState";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./auth.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisibility] = useState(false);

  const { isUserLoggedIn, loginUserWithCredentials, appState } = useAuth();

  const { setSnackbar } = useAlert();

  const { state } = useLocation();

  const navigate = useNavigate();

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
      // fetch playlists
        (async () => {
      	const userId = msg.user.id;
      	try {
      	  const { data } = await axios.get(
      		`${process.env.REACT_APP_BACKEND}/users/${userId}/playlists`
      	  );
      	  if (data.success) {
      		// const fetchedCart = data.cart;
          console.log({data});
      		// cartDispatch({ type: "SET_CART", payload: fetchedCart });
      	  }
      	} catch (error) {
      	  // cartDispatch({ type: "SET_APP_STATE", payload: "error" });
          console.log({error})
      	}
        })();

      setSnackbar({
        openStatus: true,
        type: "success",
        data: "Signed in successfully",
      });
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
