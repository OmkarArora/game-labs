export const categoryReducer = (state, action) => {
  if (action) {
    switch (action.type) {
      case "SET_USER_SUBSCRIPTIONS":
        return {
          ...state,
          userSubscriptions: action.payload.userSubscriptions,
        };

      case "SET_ALL_CATEGORIES":
        return { ...state, allCategories: action.payload.allCategories };

      case "SET_APP_STATE":
        return { ...state, appState: action.payload.appState };

      default:
        return state;
    }
  }
};
