export const initialState = {
  playlists: [],
};

export const reducerFn = (state, action) => {
  let _state = JSON.parse(JSON.stringify(state));
  let playlist = null;
  let watchLater = null;
  let history = null;
  if (action) {
    switch (action.type) {
      case "SET_PLAYLISTS":
        //payload: {playlists}
        return { ..._state, playlists: action.payload.playlists };

      case "SET_WATCH_LATER":
        //payload: {playlists}
        return { ..._state, watchLater: action.payload.watchLater };

      case "SET_HISTORY":
        //payload: {playlists}
        return { ..._state, history: action.payload.history };

      case "ADD_VIDEO_TO_WATCH_LATER":
        //payload: { video: {id, title, thumbnail, runtime}}
        watchLater = _state.watchLater;
        watchLater.videos.push(action.payload.video);
        return _state;

      case "REMOVE_VIDEO_FROM_WATCH_LATER":
        //payload: {videoId: ""}
        watchLater = _state.watchLater;
        watchLater.videos = watchLater.videos.filter(
          (video) => video.id !== action.payload.videoId
        );
        return _state;

      case "ADD_VIDEO_TO_HISTORY":
        //payload: { video: {id, title, thumbnail, runtime}}
        history = _state.history;
        history.videos.push(action.payload.video);
        return _state;

      case "REMOVE_VIDEO_FROM_HISTORY":
        //payload: {videoId: ""}
        history = _state.history;
        history.videos = history.videos.filter(
          (video) => video.id !== action.payload.videoId
        );
        return _state;

      case "ADD_VIDEO_TO_PLAYLIST":
        //payload: {playlistId: "", video: {id, title, thumbnail, runtime}}
        const { playlistId, video } = action.payload;
        playlist = _state.playlists.find((item) => item.id === playlistId);
        playlist.videos.push(video);
        return _state;

      case "REMOVE_VIDEO_FROM_PLAYLIST":
        //payload: {playlistId: "", videoId: ""}
        playlist = _state.playlists.find(
          (item) => item.id === action.payload.playlistId
        );
        playlist.videos = playlist.videos.filter(
          (video) => video.id !== action.payload.videoId
        );
        return _state;

      case "CREATE_NEW_PLAYLIST":
        //payload:{playlist: {}}
        return {
          ..._state,
          playlists: [...state.playlists, action.payload.playlist],
        };

      case "DELETE_PLAYLIST":
        //payload: {playlistId : ""}
        const playlists = _state.playlists.filter(
          (playlist) => playlist.id !== action.payload.playlistId
        );
        return { ..._state, playlists: playlists };

      case "SET_APP_STATE":
        return { ...state, appState: action.payload.appState };

      default:
        return state;
    }
  }
};
