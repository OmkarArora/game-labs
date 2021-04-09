import { useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Popover } from "../Popover/Popover";
import { AddToPlaylistPopup } from "../AddToPlaylistPopup/AddToPlaylistPopup";
import "./videoCardSmall.css";
import { usePlaylists } from "../../contexts";

export const VideoCardSmall = ({
  playlistId,
  playlistTitle,
  id,
  thumbnail,
  title,
  categoryId,
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
      <img src={thumbnail} alt={title} />
      <div className="details">
        <div className="heading">{title}</div>
        <span className="icon-menu remove-tap-highlight">
          <HiOutlineDotsVertical onClick={() => setPopoverVisibility(true)} />
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
