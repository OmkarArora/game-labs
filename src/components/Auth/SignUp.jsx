import { useState, useEffect } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useAuth, useAlert } from "../../contexts";
import { LoadingState } from "../LoadingState/LoadingState";
import { useLocation, useNavigate } from "react-router-dom";
import "./auth.css";

export const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisibility] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisibility] = useState(
    false
  );

  const { isUserLoggedIn, signupUser, appState } = useAuth();

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

  const signupHandler = async () => {
    const msg = await signupUser(name, email, password);
    if (!msg.success) {
      if (msg.errorMessage.includes("duplicate key error")) {
        setSnackbar({
          openStatus: true,
          type: "error",
          data: "Email already registered",
        });
      } else {
        setSnackbar({
          openStatus: true,
          type: "error",
          data: msg.errorMessage,
        });
      }
    } else {
      setSnackbar({
        openStatus: true,
        type: "success",
        data: "Registration successful",
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) return signupHandler();
    setSnackbar({
      openStatus: true,
      type: "error",
      data: "Confirm password must match password",
    });
  };

  return (
    <div className="page-auth container-form-login">
      <h2>LOGIN</h2>
      <form className="form-login" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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
            placeholder="Create a new password"
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

        <label className="label-password">
          <input
            className="input-password"
            type={confirmPasswordVisible ? "text" : "password"}
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <span
            className="icon icon-eye"
            onClick={() => setConfirmPasswordVisibility((prev) => !prev)}
          >
            {confirmPasswordVisible ? <AiFillEye /> : <AiFillEyeInvisible />}
          </span>
        </label>
        {appState === "loading" ? (
          <LoadingState />
        ) : (
          <button
            type="submit"
            className="btn-submit"
            disabled={
              password !== confirmPassword ||
              password.length < 8 ||
              email.length === 0
            }
          >
            SIGNUP
          </button>
        )}
      </form>
    </div>
  );
};
