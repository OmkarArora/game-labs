import { v4 as uuid } from "uuid";
import { useState, useRef, useEffect } from "react";
import { usePlaylists, useAlert } from "../../contexts";
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
    const playlistId = uuid();
    dispatch({
      type: "CREATE_NEW_PLAYLIST",
      payload: { id: playlistId, title: title },
    });

    if (video)
      dispatch({
        type: "ADD_VIDEO_TO_PLAYLIST",
        payload: { playlistId: playlistId, video: video },
      });

    setSnackbar({
      openStatus: true,
      type: "success",
      data: "Playlist created",
    });

    setModalVisibility(false);
    if(onClosePopup)
      onClosePopup(false);
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
