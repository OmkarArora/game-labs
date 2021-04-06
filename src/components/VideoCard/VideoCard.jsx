import {
  Avatar,
  CardCustom,
  CardImage,
  CardContent,
  CardActions,
} from "shoto-ui";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { getIcon } from "./getIcon";
import "./videoCard.css";

export const VideoCard = ({ id, title, category, thumbnail, runtime }) => {
  const primaryBgColor = "#181818";
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
              <HiOutlineDotsVertical />
            </span>
          </CardActions>
        </div>
      </CardCustom>
    </div>
  );
};
