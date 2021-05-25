import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useCallback,
} from "react";
import { authReducer } from "./authReducer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  setupAuthHeaderForServiceCalls,
  setupAuthExceptionHandler,
} from "../axiosMethods";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  let local_token =
    JSON.parse(localStorage?.getItem("glabslogin"))?.token || null;
  const [
    { isUserLoggedIn, appState, errorMessage, userData, token },
    dispatch,
  ] = useReducer(authReducer, {
    isUserLoggedIn: false,
    appState: "success",
    errorMessage: "",
    userData: undefined,
    token: local_token,
  });

  const navigate = useNavigate();

  const logoutUser = useCallback(() => {
    dispatch({ type: "LOGOUT_USER" });
    localStorage.removeItem("glabslogin");
    setupAuthHeaderForServiceCalls(null);
    navigate("/");
  }, [navigate]);

  useEffect(
    () => setupAuthExceptionHandler(logoutUser, navigate),
    [logoutUser, navigate]
  );

  useEffect(() => {
    const loginStatus = JSON.parse(localStorage?.getItem("glabslogin"));

    setupAuthHeaderForServiceCalls(loginStatus?.token);

    if (loginStatus?.isUserLoggedIn) {
      if (!userData) {
        (async () => {
          try {
            const { data } = await axios.get(
              `${process.env.REACT_APP_BACKEND}/users/${loginStatus.userId}`
            );
            dispatch({ type: "SET_USER_DATA", payload: data.user });
          } catch (error) {
            console.error({ error });
          }
        })();
      }
    }
    loginStatus?.isUserLoggedIn &&
      dispatch({ type: "LOGIN_USER", payload: true });
  }, [userData, logoutUser]);

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
        dispatch({ type: "SET_USER_DATA", payload: response.data.user });
        dispatch({
          type: "SET_TOKEN",
          payload: { token: response.data.token },
        });
        dispatch({
          type: "SET_ERROR_MESSAGE",
          payload: "",
        });
        localStorage?.setItem(
          "glabslogin",
          JSON.stringify({
            isUserLoggedIn: true,
            userId: response.data.user.id,
            token: response.data.token,
          })
        );
        setupAuthHeaderForServiceCalls(token || response.data.token);
      }
      dispatch({ type: "SET_APP_STATE", payload: "success" });
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
        dispatch({ type: "SET_USER_DATA", payload: response.data.user });
        dispatch({
          type: "SET_TOKEN",
          payload: { token: response.data.token },
        });
        dispatch({
          type: "SET_ERROR_MESSAGE",
          payload: "",
        });
        localStorage?.setItem(
          "login",
          JSON.stringify({
            isUserLoggedIn: true,
            userId: response.data.user.id,
            token: response.data.token,
          })
        );
        setupAuthHeaderForServiceCalls(token || response.data.token);
      }
      dispatch({ type: "SET_APP_STATE", payload: "success" });
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
