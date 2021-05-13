export const allVideosReducer = (state, action) => {
	if (action) {
	  switch (action.type) {
		case "SET_VIDEOS":
		  return { ...state, videos: action.payload.videos };
		default:
		  return state;
	  }
	}
	return state;
  };
  