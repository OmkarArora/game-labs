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
import { useState } from "react";

export const VideoCard = ({ id, title, category, thumbnail, runtime }) => {
  const primaryBgColor = "#181818";
  const [popoverVisibilty, setPopoverVisibility] = useState(false);
  const [
    addToPlaylistPopupVisibility,
    setAddToPlaylistPopupVisibility,
  ] = useState(false);

  return (
    <div className="container-videoCard">
      <CardCustom>
        <CardImage image={thumbnail} title="yoru" />
        <div className="content-videoCard">
          <CardContent>
            <Avatar
              alt={category}
              src={getIcon(category)}
              bgColor={primaryBgColor}
              height="2rem"
              width="2rem"
            />
            <div>{title}</div>
          </CardContent>
          <CardActions>
            <span className="icon-menu remove-tap-highlight">
              <HiOutlineDotsVertical
                onClick={() => setPopoverVisibility(true)}
              />
              {popoverVisibilty && (
                <Popover
                  onClose={(arg) => setPopoverVisibility(arg)}
                  performAction={(arg) => setAddToPlaylistPopupVisibility(arg)}
                />
              )}
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
