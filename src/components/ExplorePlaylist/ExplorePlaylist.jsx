import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePlaylists, useNav } from "../../contexts";
import { LoadingModal } from "../LoadingModal/LoadingModal";
import { VideoCardSmall } from "../VideoCardSmall/VideoCardSmall";

import "./explorePlaylist.css";

export const ExplorePlaylist = () => {
  const { playlistId } = useParams();
  const { appState, playlists, watchLater, history } = usePlaylists();
  const [playlist, setPlaylist] = useState({});
  const [type, setType] = useState("");

  const { setActiveNavLink } = useNav();
  useEffect(() => setActiveNavLink("library"), [setActiveNavLink]);

  useEffect(() => {
    let playlist = playlists.find((item) => item.id === playlistId);
    if (!playlist) {
      if (playlistId === watchLater.id) {
        playlist = watchLater;
        setType("watchLater");
      } else if (playlistId === history.id) {
        playlist = history;
        setType("history");
      }
    }
    setPlaylist(playlist);
  }, [playlistId, playlists, watchLater, history]);

  return (
    <div className="explore-playlist">
      <div className="playlist-title">{playlist && playlist.title}</div>
      <div className="container-videos">
        {playlist && playlist.videos && playlist.videos.length === 0 && (
          <div className="disclaimer-empty">No videos added</div>
        )}
        {playlist &&
          playlist.videos &&
          playlist.videos.map((video) => {
            if (video && video.id) {
              return (
                <VideoCardSmall
                  key={video.id}
                  playlistId={playlistId}
                  playlistTitle={playlist.title}
                  video={video}
                  type={type}
                />
              );
            }
            return null;
          })}
      </div>
      {appState === "loading" && <LoadingModal />}
    </div>
  );
};
