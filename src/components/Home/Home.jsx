import { useEffect } from "react";
import { useNav } from "../../contexts";
import { VideoCard } from "../VideoCard/VideoCard";
import { useAllVideos, usePlaylists } from "../../contexts";
import "./home.css";
import { AddToPlaylistPopup } from "../AddToPlaylistPopup/AddToPlaylistPopup";

export const Home = () => {
  const { setActiveNavLink } = useNav();
  const { allVideos } = useAllVideos();
  const {playlists} = usePlaylists();
  console.log({playlists})

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
      <AddToPlaylistPopup/>
    </div>
  );
};
