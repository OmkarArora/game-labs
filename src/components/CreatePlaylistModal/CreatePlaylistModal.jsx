import { v4 as uuid } from "uuid";
import { useState } from "react";
import { usePlaylists } from "../../contexts";
import "./createPlaylistModal.css";

export const CreatePlaylistModal = ({ video, setModalVisibility }) => {
  const [title, setTitle] = useState("");
  const { dispatch } = usePlaylists();

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
	
    setModalVisibility(false);
  };

  return (
    <div className="overlay-createPlaylist">
      <div className="modal-createPlaylist">
        <div className="header">New playlist</div>
        <input
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
