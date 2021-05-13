import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { AddToPlaylistPopup } from "../AddToPlaylistPopup/AddToPlaylistPopup";
import { MdAddToPhotos } from "react-icons/md";
import "./exploreVideo.css";
import { fetchVideoDetails } from "../../api";
import {useAlert} from "../../contexts";

export const ExploreVideo = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState({});
  const { state } = useLocation();
  const { setSnackbar } = useAlert();

  const [addToPlaylistPopupVisibility, setAddToPlaylistPopupVisibility] =
    useState(false);

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
        <div>{video.description}</div>
        <div
          className="icon icon-add"
          onClick={() => setAddToPlaylistPopupVisibility((prev) => !prev)}
        >
          <MdAddToPhotos />
        </div>
        {addToPlaylistPopupVisibility && (
          <AddToPlaylistPopup
            onClose={(arg) => setAddToPlaylistPopupVisibility(arg)}
            video={video}
          />
        )}
      </div>
    </div>
  );
};
