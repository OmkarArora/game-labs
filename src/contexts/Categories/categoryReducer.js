export const initialState = {
  allCategories: [],
  userSubscriptions: [],
};

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

      case "SUB_TO_CATEGORY":
        return {
          ...state,
          userSubscriptions: [
            ...state.userSubscriptions,
            action.payload.category,
          ],
          appState: "success",
        };

      case "UNSUB_FROM_CATEGORY":
        let userSubs = state.userSubscriptions.filter(
          (item) => item.id !== action.payload.category.id
        );
        return { ...state, userSubscriptions: userSubs, appState: "success" };

      default:
        return state;
    }
  }
};
