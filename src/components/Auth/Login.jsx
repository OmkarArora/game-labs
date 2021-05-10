import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useAuth, useAlert } from "../../contexts";
import { LoadingState } from "../LoadingState/LoadingState";
import { Link } from "react-router-dom";
import "./auth.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisibility] = useState(false);

  const { loginUserWithCredentials, appState } = useAuth();

  const { setSnackbar } = useAlert();

  const loginHandler = async (email, password) => {
    const msg = await loginUserWithCredentials(email, password);
    if (!msg.success) {
      setSnackbar({
        openStatus: true,
        type: "error",
        data: msg.errorMessage,
      });
    } else {
      // fetch cart
      //   (async () => {
      // 	const userId = msg.user.id;
      // 	try {
      // 	  const { data } = await axios.get(
      // 		`${process.env.REACT_APP_BACKEND}/users/${userId}/cart`
      // 	  );
      // 	  if (data.success) {
      // 		const fetchedCart = data.cart;
      // 		cartDispatch({ type: "SET_CART", payload: fetchedCart });
      // 	  }
      // 	} catch (error) {
      // 	  cartDispatch({ type: "SET_APP_STATE", payload: "error" });
      // 	}
      //   })();

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
