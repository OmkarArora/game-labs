import { useState } from "react";
import { FiCheck, FiPlus } from "react-icons/fi";
import { usePlaylists } from "../../contexts";
import { CreatePlaylistModal } from "../CreatePlaylistModal/CreatePlaylistModal";
import "./addToPlaylistPopup.css";

export const AddToPlaylistPopup = ({ onClose, video: propsVideo }) => {
  const { playlists, dispatch } = usePlaylists();
  const [modalVisibility, setModalVisibility] = useState(false);

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

  const isPlaylistChecked = (playlistId) => {
    const playlist = playlists.find((item) => item.id === playlistId);
    if (playlist.videos.find((item) => item.id === propsVideo.id)) return true;
    return false;
  };

  return (
    <div className="container-addToPlaylist">
      <div className="header">
        <div>Save video to...</div>
        <button
          className="btn-addNewPlaylist"
          onClick={() => setModalVisibility(true)}
        >
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
            {item.title}
          </div>
        ))}
      </div>
      <div className="footer">
        <button className="btn-done" onClick={() => onClose(false)}>
          <span className="icon icon-check">
            <FiCheck />
          </span>
          Done
        </button>
      </div>
      {modalVisibility && (
        <CreatePlaylistModal
          onClosePopup={(arg) => onClose(arg)}
          video={propsVideo}
          setModalVisibility={(arg) => setModalVisibility(arg)}
        />
      )}
    </div>
  );
};
