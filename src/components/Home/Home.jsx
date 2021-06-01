import { useEffect } from "react";
import { useNav } from "../../contexts";
import { VideoCard } from "../VideoCard/VideoCard";
import { useAllVideos } from "../../contexts";
import "./home.css";
import { LoadingModal } from "../LoadingModal/LoadingModal";

export const Home = () => {
  const { setActiveNavLink } = useNav();
  const { videos, appState } = useAllVideos();

  useEffect(() => setActiveNavLink("home"));

  return (
    <div className="home container-videos">
      {appState === "loading" && <LoadingModal />}
      {appState === "error" && <div>Error occurred</div>}
      {appState === "success" &&
        videos &&
        videos.map((video) => <VideoCard key={video.id} video={video} />)}
    </div>
  );
};
