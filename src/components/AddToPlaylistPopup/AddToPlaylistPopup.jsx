import { FiCheck, FiPlus } from "react-icons/fi";
import { usePlaylists } from "../../contexts";
import "./addToPlaylistPopup.css";

export const AddToPlaylistPopup = ({ video: propsVideo }) => {
  const { playlists, dispatch } = usePlaylists();

  let selectedPlaylists = [];
  for (let i = 0; i < playlists.length; i++) {
    if (playlists[i].videos.find((video) => video.id === propsVideo.id)) {
      selectedPlaylists.push(playlists[i].id);
      break;
    }
  }

  const handlePlaylistCheckbox = (playlistId, isChecked) => {
    let playlist = playlists.find((item) => item.id === playlistId);

    if (isChecked) {
      if (!playlist.videos.find((item) => item.id === propsVideo.id)) {
        return dispatch({
          type: "ADD_VIDEO_TO_PLAYLIST",
          payload: { playlistId: playlistId, video: propsVideo },
        });
      }
    } else {
      if (playlist.videos.find((item) => item.id === propsVideo.id)) {
        return dispatch({
          type: "REMOVE_VIDEO_FROM_PLAYLIST",
          payload: { playlistId: playlistId, videoId: propsVideo.id },
        });
      }
    }
  };

  const isPlaylistChecked = (id) => {
    //   needed so first time we dont get null/undefined as checked value
    if (selectedPlaylists.length === 0) return false;
    return selectedPlaylists.find((_id) => _id === id);
  };

  return (
    <div className="container-addToPlaylist">
      <div className="header">
        <div>Save video to...</div>
        <button className="btn-addNewPlaylist">
          <span className="icon icon-plus">
            <FiPlus />
          </span>{" "}
          NEW PLAYLIST
        </button>
      </div>
      <div className="container-playlists">
        {playlists.map((item) => (
          <div className="playlist" key={item.id}>
            <input
              type="checkbox"
              checked={isPlaylistChecked(item.id)}
              onChange={(e) =>
                handlePlaylistCheckbox(item.id, e.target.checked)
              }
            />
            Valo
          </div>
        ))}
      </div>
      <div className="footer">
        <button className="btn-done">
          <span className="icon icon-check">
            <FiCheck />
          </span>
          Done
        </button>
      </div>
    </div>
  );
};
