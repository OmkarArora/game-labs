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
import { getIcon } from "./getIcon";
import "./videoCard.css";

export const VideoCard = ({ id, title, category, thumbnail, runtime }) => {
  const primaryBgColor = "#181818";
  const [popoverVisibilty, setPopoverVisibility] = useState(false);
  const [
    addToPlaylistPopupVisibility,
    setAddToPlaylistPopupVisibility,
  ] = useState(false);

  const popoverMenu = [
    {
      text: "Save to playlist",
      performAction: () => setAddToPlaylistPopupVisibility(true),
      onClose: () => setPopoverVisibility(false),
    },
  ];

  return (
    <div className="container-videoCard">
      <CardCustom>
        <Link to={`/video/${id}`}>
          <CardImage image={thumbnail} title="yoru" />
        </Link>
        <div className="content-videoCard">
          <CardContent>
            <Avatar
              alt={category}
              src={getIcon(category)}
              bgColor={primaryBgColor}
              height="2rem"
              width="2rem"
            />
           <Link to={`/video/${id}`}><div>{title}</div></Link>
          </CardContent>
          <CardActions>
            <span className="icon icon-menu remove-tap-highlight">
              <HiOutlineDotsVertical
                onClick={() => setPopoverVisibility(prev => !prev)}
              />
              {popoverVisibilty && <Popover popoverMenu={popoverMenu} />}
            </span>
          </CardActions>
        </div>
      </CardCustom>
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
