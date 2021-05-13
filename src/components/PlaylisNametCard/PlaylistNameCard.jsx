import { useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Popover } from "../Popover/Popover";
import { usePlaylists, useAlert } from "../../contexts";
import "./playlistNameCard.css";
import { deletePlaylist } from "../../api";

export const PlaylistNameCard = ({ id, image, title, numOfVideos }) => {
  const [popoverVisibilty, setPopoverVisibility] = useState(false);
  const { dispatch } = usePlaylists();
  const { setSnackbar } = useAlert();
  const popoverMenu = [
    {
      text: `Delete ${title}`,
      performAction: () => {
        const loginStatus = JSON.parse(localStorage?.getItem("glabslogin"));
        if (loginStatus) {
          (async () => {
            const userId = JSON.parse(
              localStorage.getItem("glabslogin")
            ).userId;
            const deletedPlaylist = await deletePlaylist(userId, id);
            if ("isAxiosError" in deletedPlaylist) {
              // set error
              setSnackbar({
                open: true,
                type: "error",
                data: "Error occurred while deleting playlist",
              });
            } else {
              dispatch({
                type: "DELETE_PLAYLIST",
                payload: { playlistId: deletedPlaylist.id },
              });

              setSnackbar({
                openStatus: true,
                type: "success",
                data: "Playlist deleted",
              });
            }
          })();
        }
      },
      onClose: () => setPopoverVisibility(false),
    },
  ];

  return (
    <div className="card-playlist">
      <Link to={`/playlist/${id}`}>
        <img src={image} alt={title} />
      </Link>
      <div className="details-playlist">
        <div>
          <Link to={`/playlist/${id}`}>
            <div className="title">{title}</div>{" "}
          </Link>
          <div className="video-count">
            {numOfVideos === 0 ? "No" : numOfVideos}{" "}
            {numOfVideos === 1 ? "video" : "videos"}
          </div>
        </div>
        <div>
          <span className="icon icon-menu remove-tap-highlight">
            <HiOutlineDotsVertical
              onClick={() => setPopoverVisibility((prev) => !prev)}
            />
            {popoverVisibilty && <Popover popoverMenu={popoverMenu} />}
          </span>
        </div>
      </div>
    </div>
  );
};
