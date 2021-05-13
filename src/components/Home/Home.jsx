import { useEffect } from "react";
import { useNav } from "../../contexts";
import { VideoCard } from "../VideoCard/VideoCard";
import { useAllVideos } from "../../contexts";
import "./home.css";

export const Home = () => {
  const { setActiveNavLink } = useNav();
  const { videos } = useAllVideos();

  useEffect(() => setActiveNavLink("home"));

  return (
    <div className="home container-videos">
      {videos && videos.map((video) => (
        <VideoCard
          key={video.id}
          video={video}
        />
      ))}
    </div>
  );
};
