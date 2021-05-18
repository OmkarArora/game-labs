import { useState } from "react";
import { FiCheck, FiPlus } from "react-icons/fi";
import { addVideoToPlaylist, deleteVideoFromPlaylist } from "../../api";
import { usePlaylists, useAlert } from "../../contexts";
import { CreatePlaylistModal } from "../CreatePlaylistModal/CreatePlaylistModal";
import { LoadingModal } from "../LoadingModal/LoadingModal";
import "./addToPlaylistPopup.css";

export const AddToPlaylistPopup = ({ onClose, video: propsVideo }) => {
  console.log({ propsVideo });
  const { playlists, appState, dispatch } = usePlaylists();
  const [modalVisibility, setModalVisibility] = useState(false);
  const [isPlaylistUpdated, setPlaylistUpdate] = useState(false);
  const { setSnackbar } = useAlert();

  const handlePlaylistCheckbox = (playlistId, isChecked) => {
    setPlaylistUpdate(true);
    let playlist = playlists.find((item) => item.id === playlistId);

    if (isChecked) {
      if (!playlist.videos.find((item) => item.id === propsVideo.id)) {
        const loginStatus = JSON.parse(localStorage?.getItem("glabslogin"));

        if (loginStatus) {
          (async () => {
            dispatch({
              type: "SET_APP_STATE",
              payload: { appState: "loading" },
            });
            let playlist = await addVideoToPlaylist(playlistId, propsVideo.id);
            if ("isAxiosError" in playlist) {
              // set error
              setSnackbar({
                open: true,
                type: "error",
                data: "Error adding video to playlist",
              });
            } else {
              dispatch({
                type: "ADD_VIDEO_TO_PLAYLIST",
                payload: { playlistId: playlistId, video: propsVideo },
              });
            }
            dispatch({
              type: "SET_APP_STATE",
              payload: { appState: "success" },
            });
          })();
        }
      }
    } else {
      if (playlist.videos.find((item) => item.id === propsVideo.id)) {
        const loginStatus = JSON.parse(localStorage?.getItem("glabslogin"));

        if (loginStatus) {
          (async () => {
            dispatch({
              type: "SET_APP_STATE",
              payload: { appState: "loading" },
            });
            let playlist = await deleteVideoFromPlaylist(
              playlistId,
              propsVideo.id
            );
            if ("isAxiosError" in playlist) {
              // set error
              setSnackbar({
                open: true,
                type: "error",
                data: "Error deleting video from playlist",
              });
            } else {
               dispatch({
                type: "REMOVE_VIDEO_FROM_PLAYLIST",
                payload: { playlistId: playlistId, videoId: propsVideo.id },
              });
            }
            dispatch({
              type: "SET_APP_STATE",
              payload: { appState: "success" },
            });
          })();
        }
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
        <button
          className="btn-done"
          onClick={() => {
            onClose(false);
            if (isPlaylistUpdated)
              return setSnackbar({
                openStatus: true,
                type: "info",
                data: "Playlist updated",
              });
          }}
        >
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
      {appState === "loading" && <LoadingModal />}
    </div>
  );
};
