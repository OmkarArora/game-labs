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
import { useIcon } from "../../hooks";
import { useAlert, useAllVideos, useAuth, usePlaylists } from "../../contexts";
import { addVideoToPlaylist } from "../../api";
import "./videoCard.css";

export const VideoCard = ({ video }) => {
  const categoryIcon = useIcon(video.category);
  const { isUserLoggedIn } = useAuth();
  const { watchLater, dispatch } = usePlaylists();
  const { dispatch: homeDispatch } = useAllVideos();
  const { setSnackbar } = useAlert();

  const [popoverVisibilty, setPopoverVisibility] = useState(false);
  const [addToPlaylistPopupVisibility, setAddToPlaylistPopupVisibility] =
    useState(false);

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
  ];

  const getShortendedVideoTitle = (title) => {
    const maxLength = 45;
    if (title.length > maxLength) {
      return `${title.substring(0, maxLength)}...`;
    }
    return title;
  };

  const addToWatchLater = async () => {
    if (watchLater && watchLater.id) {
      homeDispatch({ type: "SET_APP_STATE", payload: { appState: "loading" } });
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
      homeDispatch({ type: "SET_APP_STATE", payload: { appState: "success" } });
    }
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
          {isUserLoggedIn && (
            <CardActions>
              <span className="icon icon-menu remove-tap-highlight">
                <HiOutlineDotsVertical
                  onClick={() => setPopoverVisibility((prev) => !prev)}
                />
                {popoverVisibilty && <Popover popoverMenu={popoverMenu} />}
              </span>
            </CardActions>
          )}
        </div>
      </CardCustom>
      {isUserLoggedIn && addToPlaylistPopupVisibility && (
        <AddToPlaylistPopup
          onClose={(arg) => setAddToPlaylistPopupVisibility(arg)}
          video={video}
        />
      )}
    </div>
  );
};
