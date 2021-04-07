import { useEffect } from "react";
import { useNav } from "../../contexts";
import { VideoCard } from "../VideoCard/VideoCard";
import { useAllVideos } from "../../contexts";
import "./home.css";
import { AddToPlaylistPopup } from "../AddToPlaylistPopup/AddToPlaylistPopup";

export const Home = () => {
  const { setActiveNavLink } = useNav();
  const { allVideos } = useAllVideos();

  useEffect(() => setActiveNavLink("home"));

  return (
    <div className="home">
      {allVideos.map(({ id, title, category, thumbnail, runtime }) => (
        <VideoCard
          key={id}
          id={id}
          title={title}
          category={category}
          thumbnail={thumbnail}
          runtime={runtime}
        />
      ))}
      <AddToPlaylistPopup
        video={{
          id: "vid1",
          title: "Viper lineups",
          thumbnail:
            "https://i.ytimg.com/vi/6JGEmOoR_x4/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBy0Pg7kFLMAg9-cghsGIb5GChEHg",
        }}
      />
    </div>
  );
};
