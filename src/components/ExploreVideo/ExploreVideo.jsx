import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { AddToPlaylistPopup } from "../AddToPlaylistPopup/AddToPlaylistPopup";
import { Avatar } from "shoto-ui";
import { MdAddToPhotos } from "react-icons/md";
import { fetchVideoDetails, addVideoToPlaylist } from "../../api";
import { useAlert, useAuth, usePlaylists } from "../../contexts";
import { useIcon } from "../../hooks";
import "./exploreVideo.css";

export const ExploreVideo = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState({});
  const { state } = useLocation();
  const { setSnackbar } = useAlert();
  const { isUserLoggedIn } = useAuth();
  const { history, dispatch } = usePlaylists();

  const categoryIcon = useIcon(video?.category);

  const [addToPlaylistPopupVisibility, setAddToPlaylistPopupVisibility] =
    useState(false);

  useEffect(() => {
    (async () => {
      if (history && history.id) {
        let fetchedHistory = await addVideoToPlaylist(history.id, videoId);
        if (
          !("isAxiosError" in fetchedHistory || fetchedHistory instanceof Error)
        ) {
          dispatch({
            type: "SET_HISTORY",
            payload: { history: fetchedHistory },
          });
        }
      }
    })();
  }, [dispatch, history, videoId]);

  useEffect(() => {
    if (!state) {
      (async () => {
        const video = await fetchVideoDetails(videoId);
        if ("isAxiosError" in video) {
          return setSnackbar({
            openStatus: true,
            type: "error",
            data: "Error loading video",
          });
        }
        setVideo(video);
      })();
    } else {
      setVideo(state.video);
    }
  }, [state, videoId, setSnackbar]);

  return (
    <div className="explore-video">
      <iframe
        src={video.video}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <div className="video-info">
        <div className="info-top">
          <Avatar
            alt={video?.category}
            src={categoryIcon}
            bgColor={"white"}
            height="2rem"
            width="2rem"
          />
          <div className="video-title">{video?.title}</div>
          {isUserLoggedIn && (
            <div
              className="icon icon-add"
              onClick={() => setAddToPlaylistPopupVisibility((prev) => !prev)}
            >
              <MdAddToPhotos />
            </div>
          )}
        </div>
        <div className="video-description">{video.description}</div>

        {isUserLoggedIn && addToPlaylistPopupVisibility && (
          <AddToPlaylistPopup
            onClose={(arg) => setAddToPlaylistPopupVisibility(arg)}
            video={video}
          />
        )}
      </div>
    </div>
  );
};
