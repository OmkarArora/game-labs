

export const reducerFn = (state, action) => {
  let _state = JSON.parse(JSON.stringify(state));
  let playlist = null;
  if (action) {
    switch (action.type) {
      case "SET_PLAYLISTS":
        //payload: {playlists}
        return { ..._state, playlists: action.payload.playlists };

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
        return {..._state, playlists: [...state.playlists, action.payload.playlist]};

      case "DELETE_PLAYLIST":
        //payload: {playlisId : ""}
        console.log({action});
        const playlists = _state.playlists.filter(
          (playlist) => playlist.id !== action.payload.playlistId
        );
        return { ..._state, playlists: playlists };
      default:
        return state;
    }
  }
};
