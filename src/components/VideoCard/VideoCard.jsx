import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  CardCustom,
  CardImage,
  CardContent,
  CardActions,
} from "shoto-ui";
import { Popover } from "../Popover/Popover";
import { AddToPlaylistPopup } from "../AddToPlaylistPopup/AddToPlaylistPopup";
import { HiOutlineDotsVertical } from "react-icons/hi";
import "./videoCard.css";
import { useIcon } from "../../hooks";

export const VideoCard = ({ video }) => {
  const categoryIcon = useIcon(video.category);

  const [popoverVisibilty, setPopoverVisibility] = useState(false);
  const [addToPlaylistPopupVisibility, setAddToPlaylistPopupVisibility] =
    useState(false);

  const popoverMenu = [
    {
      text: "Save to playlist",
      performAction: () => setAddToPlaylistPopupVisibility(true),
      onClose: () => setPopoverVisibility(false),
    },
  ];

  const getShortendedVideoTitle = (title) => {
    const maxLength = 45;
    if (title.length > maxLength) {
      return `${title.substring(0, maxLength)}...`;
    }
    return title;
  };

  return (
    <div className="container-videoCard">
      <CardCustom>
        <Link to={`/video/${video.id}`}>
          <CardImage image={video.thumbnail} title="yoru" />
        </Link>
        <div className="content-videoCard">
          <CardContent>
            <Avatar
              alt={video.category}
              src={categoryIcon}
              bgColor={"white"}
              height="2rem"
              width="2rem"
            />
            <Link to={`/video/${video.id}`} className="link-videoTitle">
              <div>{getShortendedVideoTitle(video.title)}</div>
            </Link>
          </CardContent>
          <CardActions>
            <span className="icon icon-menu remove-tap-highlight">
              <HiOutlineDotsVertical
                onClick={() => setPopoverVisibility((prev) => !prev)}
              />
              {popoverVisibilty && <Popover popoverMenu={popoverMenu} />}
            </span>
          </CardActions>
        </div>
      </CardCustom>
      {addToPlaylistPopupVisibility && (
        <AddToPlaylistPopup
          onClose={(arg) => setAddToPlaylistPopupVisibility(arg)}
          video={video}
        />
      )}
    </div>
  );
};
