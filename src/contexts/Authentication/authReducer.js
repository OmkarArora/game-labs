export const authReducer = (state, action) => {
	if (action) {
	  switch (action.type) {
		case "LOGIN_USER":
		  return { ...state, isUserLoggedIn: true };
		case "LOGOUT_USER":
		  return { ...state, isUserLoggedIn: false, userData: {} };
		case "SET_USER_DATA":
		  return { ...state, userData: action.payload }
		case "SET_APP_STATE":
		  return { ...state, appState: action.payload };
		case "SET_ERROR_MESSAGE":
		  return { ...state, errorMessage: action.payload, appState: "error" };
		default:
		  return state;
	  }
	}
	return state;
  };
  