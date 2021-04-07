import { v4 as uuid } from "uuid";

export const reducerFn = (state, action) => {
  let _state = null;
  let playlist = null;
  if (action) {
    switch (action.type) {
      case "ADD_VIDEO_TO_PLAYLIST":
        //payload: {playlistId: "", video: {id, title, thumbnail, runtime}}
        _state = { ...state };
        const { playlistId, video } = action.payload;
        playlist = _state.playlists.find((item) => item.id === playlistId);
        playlist.videos.push(video);
        return _state;
      case "REMOVE_VIDEO_FROM_PLAYLIST":
        //payload: {playlistId: "", videoId: ""}
        _state = { ...state };
        playlist = _state.playlists.find(
          (item) => item.id === action.payload.playlistId
        );
        playlist.videos = playlist.videos.filter(
          (video) => video.id !== action.payload.videoId
        );
        return _state;
      case "CREATE_NEW_PLAYLIST":
        //payload:{title: ""}
        playlist = { id: uuid(), title: action.payload.id, videos: [] };
        return { ...state, playlists: [...state.playlists, playlist] };
      case "DELETE_PLAYLIST":
        //payload: {playlisId : ""}
        const playlists = state.playlists.filter(
          (playlist) => playlist.id !== action.payload.playlistId
        );
        return { ...state, playlists: playlists };
      default:
        return state;
    }
  }
};
