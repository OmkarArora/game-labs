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

function setupAuthHeaderForServiceCalls(token) {
  if (token) {
    return (axios.defaults.headers.common["Authorization"] = token);
  }
  delete axios.defaults.headers.common["Authorization"];
}

function setupAuthExceptionHandler(logoutUser, navigate) {
  const UNAUTHORIZED = 401;
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === UNAUTHORIZED) {
        logoutUser();
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );
}

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [{ isUserLoggedIn, appState, errorMessage, userData }, dispatch] =
    useReducer(authReducer, {
      isUserLoggedIn: false,
      appState: "success",
      errorMessage: "",
      userData: undefined,
    });

  const navigate = useNavigate();

  const logoutUser = useCallback(() => {
    dispatch({ type: "LOGOUT_USER" });
    localStorage.removeItem("glabslogin");
    setupAuthHeaderForServiceCalls(undefined);
    navigate("/");
  }, [navigate]);

  useEffect(
    () => setupAuthExceptionHandler(logoutUser, navigate),
    [logoutUser, navigate]
  );

  useEffect(() => {
    const loginStatus = JSON.parse(localStorage?.getItem("glabslogin"));

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
  }, [userData]);

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
        let userData = { ...response.data.user, token: response.data.token };
        dispatch({ type: "SET_USER_DATA", payload: userData });
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
        setupAuthHeaderForServiceCalls(response.data.token);
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
        let userData = { ...response.user.data, token: response.data.token };
        dispatch({ type: "SET_USER_DATA", payload: userData });
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
        setupAuthHeaderForServiceCalls(response.data.token);
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
