import { v4 as uuid } from "uuid";

export const reducerFn = (state, action) => {
  let _state = JSON.parse(JSON.stringify(state));
  let playlist = null;
  if (action) {
    switch (action.type) {
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
        //payload:{title: "", id: ""}
        playlist = {
          id: action.payload.id ? action.payload.id : uuid(),
          title: action.payload.title,
          videos: [],
        };
        return { ..._state, playlists: [..._state.playlists, playlist] };
        
      case "DELETE_PLAYLIST":
        //payload: {playlisId : ""}
        const playlists = _state.playlists.filter(
          (playlist) => playlist.id !== action.payload.playlistId
        );
        return { ..._state, playlists: playlists };
      default:
        return state;
    }
  }
};
