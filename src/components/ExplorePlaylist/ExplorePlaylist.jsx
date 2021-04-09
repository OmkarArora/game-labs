import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePlaylists, useNav } from "../../contexts";
import { VideoCardSmall } from "../VideoCardSmall/VideoCardSmall";

import "./explorePlaylist.css";

export const ExplorePlaylist = () => {
  const { playlistId } = useParams();
  const { playlists } = usePlaylists();
  const [playlist, setPlaylist] = useState({});

  const { setActiveNavLink } = useNav();
  useEffect(() => setActiveNavLink("library"), [setActiveNavLink]);

  useEffect(() => {
    const playlist = playlists.find((item) => item.id === playlistId);
    setPlaylist(playlist);
  }, [playlistId, playlists]);

  return (
    <div className="explore-playlist">
      <div className="playlist-title">{playlist.title}</div>
      <div className="container-videos">
        {playlist && playlist.videos && playlist.videos.length === 0 && (
          <div className="disclaimer-empty">No videos added</div>
        )}
        {playlist &&
          playlist.videos &&
          playlist.videos.map((video) => (
            <VideoCardSmall
              key={video.id}
              playlistId={playlistId}
              playlistTitle={playlist.title}
              id={video.id}
              title={video.title}
              thumbnail={video.thumbnail}
            />
          ))}
      </div>
    </div>
  );
};
