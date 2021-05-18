import { useState } from "react";
import { Link } from "react-router-dom";
import { usePlaylists, useAlert } from "../../contexts";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Popover } from "../Popover/Popover";
import { AddToPlaylistPopup } from "../AddToPlaylistPopup/AddToPlaylistPopup";
import "./videoCardSmall.css";
import { deleteVideoFromPlaylist } from "../../api";

export const VideoCardSmall = ({ playlistId, playlistTitle, video }) => {
  const [popoverVisibilty, setPopoverVisibility] = useState(false);
  const [addToPlaylistPopupVisibility, setAddToPlaylistPopupVisibility] =
    useState(false);

  const { dispatch } = usePlaylists();
  const { setSnackbar } = useAlert();

  const popoverMenu = [
    {
      text: "Save to playlist",
      performAction: () => setAddToPlaylistPopupVisibility(true),
      onClose: () => setPopoverVisibility(false),
    },
    {
      text: `Remove from ${playlistTitle}`,
      performAction: () => {
        const loginStatus = JSON.parse(localStorage?.getItem("glabslogin"));

        if (loginStatus) {
          (async () => {
            dispatch({
              type: "SET_APP_STATE",
              payload: { appState: "loading" },
            });
            let playlist = await deleteVideoFromPlaylist(playlistId, video.id);
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
                payload: { playlistId: playlistId, videoId: video.id },
              });
            }
            dispatch({
              type: "SET_APP_STATE",
              payload: { appState: "success" },
            });
          })();
        }
      },
      onClose: () => setPopoverVisibility(false),
    },
  ];

  return (
    <div className="card-videoSmall">
      <Link to={`/video/${video.id}`} state={{ video }}>
        <img src={video.thumbnail} alt={video.title} />
      </Link>
      <div className="details">
        <Link to={`/video/${video.id}`} state={{ video }}>
          <div className="heading">{video.title}</div>
        </Link>
        <span className="icon icon-menu remove-tap-highlight">
          <HiOutlineDotsVertical
            onClick={() => setPopoverVisibility((prev) => !prev)}
          />
          {popoverVisibilty && <Popover popoverMenu={popoverMenu} />}
        </span>
      </div>
      {addToPlaylistPopupVisibility && (
        <AddToPlaylistPopup
          onClose={(arg) => setAddToPlaylistPopupVisibility(arg)}
          video={video}
        />
      )}
    </div>
  );
};
