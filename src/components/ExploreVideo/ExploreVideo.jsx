import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAllVideos } from "../../contexts/AllVideos/allVideosContext";

import "./exploreVideo.css";

export const ExploreVideo = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState({});
  const { allVideos } = useAllVideos();
  useEffect(() => {
    const video = allVideos.find((item) => item.id === videoId);
    setVideo(video);
  }, [allVideos, videoId]);
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
        {video.description}
      </div>
    </div>
  );
};
