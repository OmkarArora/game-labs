import { useState } from "react";
import { Link } from "react-router-dom";
import { usePlaylists } from "../../contexts";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Popover } from "../Popover/Popover";
import { AddToPlaylistPopup } from "../AddToPlaylistPopup/AddToPlaylistPopup";
import "./videoCardSmall.css";

export const VideoCardSmall = ({
  playlistId,
  playlistTitle,
  id,
  thumbnail,
  title,
  categoryId,
  video
}) => {
  const [popoverVisibilty, setPopoverVisibility] = useState(false);
  const [
    addToPlaylistPopupVisibility,
    setAddToPlaylistPopupVisibility,
  ] = useState(false);

  const { dispatch } = usePlaylists();

  const popoverMenu = [
    {
      text: "Save to playlist",
      performAction: () => setAddToPlaylistPopupVisibility(true),
      onClose: () => setPopoverVisibility(false),
    },
    {
      text: `Remove from ${playlistTitle}`,
      performAction: () =>
        dispatch({
          type: "REMOVE_VIDEO_FROM_PLAYLIST",
          payload: { playlistId, videoId: id },
        }),
      onClose: () => setPopoverVisibility(false),
    },
  ];

  return (
    <div className="card-videoSmall">
      <Link to={`/video/${id}`} state={{video}}>
        <img src={thumbnail} alt={title} />
      </Link>
      <div className="details">
        <Link to={`/video/${id}`} state={{video}}>
          <div className="heading">{title}</div>
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
          video={{
            id,
            title,
            thumbnail,
          }}
        />
      )}
    </div>
  );
};
