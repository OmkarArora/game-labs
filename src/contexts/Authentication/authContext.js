import { createContext, useContext, useEffect, useReducer } from "react";
import { authReducer } from "./authReducer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [
    { isUserLoggedIn, appState, errorMessage, userData },
    dispatch,
  ] = useReducer(authReducer, {
    isUserLoggedIn: false,
    appState: "success",
    errorMessage: "",
    userData: {},
  });

  const navigate = useNavigate();

  useEffect(() => {
    const loginStatus = JSON.parse(localStorage?.getItem("glabslogin"));

    loginStatus?.isUserLoggedIn &&
      dispatch({ type: "LOGIN_USER", payload: true });
  }, []);

  async function loginUserWithCredentials(email, password) {
    try {
      dispatch({ type: "SET_APP_STATE", payload: "loading" });
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND}/login`,
        {
          email,
          password,
        }
      );
      if (response.data.success) {
        dispatch({ type: "LOGIN_USER" });
        dispatch({ type: "SET_APP_STATE", payload: "success" });
        dispatch({ type: "SET_USER_DATA", payload: response.data.user });
        dispatch({
          type: "SET_ERROR_MESSAGE",
          payload: "",
        });
        localStorage?.setItem(
          "glabslogin",
          JSON.stringify({
            isUserLoggedIn: true,
            userId: response.data.user.id,
          })
        );
      } else {
        dispatch({ type: "SET_APP_STATE", payload: "success" });
      }
      return response.data;
    } catch (error) {
      dispatch({ type: "SET_APP_STATE", payload: "error" });
      dispatch({
        type: "SET_ERROR_MESSAGE",
        payload: error.message,
      });
      return { success: false, error };
    }
  }

  function logoutUser() {
    dispatch({ type: "LOGOUT_USER" });
    localStorage.removeItem("glabslogin");
    navigate("/");
  }

  async function signupUser(name, email, password) {
    try {
      dispatch({ type: "SET_APP_STATE", payload: "loading" });
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND}/users`,
        {
          name,
          email,
          password,
        }
      );
      if (response.data.success) {
        dispatch({ type: "LOGIN_USER" });
        dispatch({ type: "SET_APP_STATE", payload: "success" });
        dispatch({ type: "SET_USER_DATA", payload: response.data.user });
        dispatch({
          type: "SET_ERROR_MESSAGE",
          payload: "",
        });
        localStorage?.setItem(
          "login",
          JSON.stringify({
            isUserLoggedIn: true,
            userId: response.data.user.id,
          })
        );
      } else {
        dispatch({ type: "SET_APP_STATE", payload: "success" });
      }
      return response.data;
    } catch (error) {
      dispatch({ type: "SET_APP_STATE", payload: "error" });
      dispatch({
        type: "SET_ERROR_MESSAGE",
        payload: error.message,
      });
      return { success: false, errorMessage: error.response.data.errorMessage };
    }
  }

  const value = {
    isUserLoggedIn,
    loginUserWithCredentials,
    logoutUser,
    signupUser,
    appState,
    errorMessage,
    userData,
    dispatch,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
