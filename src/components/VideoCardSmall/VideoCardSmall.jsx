import { useState } from "react";
import { Link } from "react-router-dom";
import { usePlaylists, useAlert, useAuth } from "../../contexts";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Popover } from "../Popover/Popover";
import { AddToPlaylistPopup } from "../AddToPlaylistPopup/AddToPlaylistPopup";
import "./videoCardSmall.css";
import { deleteVideoFromPlaylist, addVideoToPlaylist } from "../../api";

export const VideoCardSmall = ({ playlistId, playlistTitle, video, type }) => {
  const { isUserLoggedIn } = useAuth();
  const [popoverVisibilty, setPopoverVisibility] = useState(false);
  const [addToPlaylistPopupVisibility, setAddToPlaylistPopupVisibility] =
    useState(false);

  const { dispatch, watchLater } = usePlaylists();
  const { setSnackbar } = useAlert();

  const popoverMenu = [
    {
      text: "Save to playlist",
      performAction: () => setAddToPlaylistPopupVisibility(true),
      onClose: () => setPopoverVisibility(false),
    },
    {
      text: "Save to Watch Later",
      performAction: () => addToWatchLater(),
      onClose: () => setPopoverVisibility(false),
    },
    {
      text: `Remove from ${playlistTitle}`,
      performAction: () => {
        const loginStatus = JSON.parse(localStorage?.getItem("glabslogin"));

        if (loginStatus && video && video.id) {
          (async () => {
            dispatch({
              type: "SET_APP_STATE",
              payload: { appState: "loading" },
            });
            let playlist = await deleteVideoFromPlaylist(playlistId, video.id);
            if ("isAxiosError" in playlist || playlist instanceof Error) {
              // set error
              setSnackbar({
                open: true,
                type: "error",
                data: "Error deleting video from playlist",
              });
            } else {
              if (type === "history") {
                dispatch({
                  type: "REMOVE_VIDEO_FROM_HISTORY",
                  payload: { videoId: video.id },
                });
              } else if (type === "watchLater") {
                dispatch({
                  type: "REMOVE_VIDEO_FROM_WATCH_LATER",
                  payload: { videoId: video.id },
                });
              } else
                dispatch({
                  type: "REMOVE_VIDEO_FROM_PLAYLIST",
                  payload: { playlistId: playlist.id, videoId: video.id },
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

  const addToWatchLater = async () => {
    if (watchLater && watchLater.id) {
      dispatch({ type: "SET_APP_STATE", payload: { appState: "loading" } });
      let fetchedWatchLater = await addVideoToPlaylist(watchLater.id, video.id);
      if (
        !(
          "isAxiosError" in fetchedWatchLater ||
          fetchedWatchLater instanceof Error
        )
      ) {
        dispatch({
          type: "SET_WATCH_LATER",
          payload: { watchLater: fetchedWatchLater },
        });
        setSnackbar({
          openStatus: true,
          type: "success",
          data: "Video added to Watch Later",
        });
      } else {
        setSnackbar({
          openStatus: true,
          type: "error",
          data: fetchedWatchLater.errorMessage
            ? fetchedWatchLater.errorMessage
            : fetchedWatchLater.message,
        });
      }
      dispatch({ type: "SET_APP_STATE", payload: { appState: "success" } });
    }
  };

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
      {isUserLoggedIn && addToPlaylistPopupVisibility && (
        <AddToPlaylistPopup
          onClose={(arg) => setAddToPlaylistPopupVisibility(arg)}
          video={video}
        />
      )}
    </div>
  );
};
