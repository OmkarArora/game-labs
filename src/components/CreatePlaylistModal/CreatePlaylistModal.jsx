import { useState, useRef, useEffect } from "react";
import { usePlaylists, useAlert } from "../../contexts";
import { createPlaylist, addVideoToPlaylist } from "../../api";
import "./createPlaylistModal.css";

export const CreatePlaylistModal = ({
  onClosePopup,
  video,
  setModalVisibility,
}) => {
  const [title, setTitle] = useState("");
  const { setSnackbar } = useAlert();
  const { dispatch } = usePlaylists();

  const inputRef = useRef(null);
  useEffect(() => inputRef.current.focus());

  const createNewPlaylist = () => {
    const loginStatus = JSON.parse(localStorage?.getItem("glabslogin"));

    if (loginStatus) {
      (async () => {
        const userId = JSON.parse(localStorage.getItem("glabslogin")).userId;
        let playlist = await createPlaylist(userId, title);
        if ("isAxiosError" in playlist) {
          // set error
          setSnackbar({
            open: true,
            type: "error",
            data: "Unable to create playlist",
          });
        } else {
          dispatch({
            type: "CREATE_NEW_PLAYLIST",
            payload: { playlist },
          });

          if (video){
            (async () => {
              let updatedPlaylist = await addVideoToPlaylist(
                playlist.id,
                video.id
              );
              if ("isAxiosError" in updatedPlaylist) {
                // set error
                setSnackbar({
                  open: true,
                  type: "error",
                  data: "Unable to add video to playlist",
                });
              } else {
                dispatch({
                  type: "ADD_VIDEO_TO_PLAYLIST",
                  payload: { playlistId: playlist.id, video: video },
                });
              }
            })();
          }

          setSnackbar({
            openStatus: true,
            type: "success",
            data: "Playlist created",
          });
        }
      })();

      setModalVisibility(false);
      if (onClosePopup) onClosePopup(false);
    }
  };
  return (
    <div className="overlay-createPlaylist">
      <div className="modal-createPlaylist">
        <div className="header">New playlist</div>
        <input
          ref={inputRef}
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <div className="area-action">
          <button onClick={() => setModalVisibility(false)}>CANCEL</button>
          <button disabled={title.length === 0} onClick={createNewPlaylist}>
            CREATE
          </button>
        </div>
      </div>
    </div>
  );
};
