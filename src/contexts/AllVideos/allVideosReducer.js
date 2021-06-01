export const allVideosReducer = (state, action) => {
  if (action) {
    switch (action.type) {
      case "SET_VIDEOS":
        return { ...state, videos: action.payload.videos };
      case "SET_APP_STATE":
        return { ...state, appState: action.payload.appState };
      default:
        return state;
    }
  }
  return state;
};
