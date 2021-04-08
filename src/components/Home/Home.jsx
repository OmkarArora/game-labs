import { useEffect } from "react";
import { useNav } from "../../contexts";
import { VideoCard } from "../VideoCard/VideoCard";
import { useAllVideos } from "../../contexts";
import "./home.css";

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
    </div>
  );
};
