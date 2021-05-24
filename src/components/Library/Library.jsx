import { useEffect, useState } from "react";
import { useNav, usePlaylists } from "../../contexts";
import { PlaylistNameCard } from "../PlaylisNametCard/PlaylistNameCard";
import { CreatePlaylistModal } from "../CreatePlaylistModal/CreatePlaylistModal";
import { FiPlus } from "react-icons/fi";
import BlankImage from "../../images/blank.png";
import "./library.css";

export const Library = () => {
  const { setActiveNavLink } = useNav();
  useEffect(() => setActiveNavLink("library"));

  const [modalVisibility, setModalVisibility] = useState(false);

  const { playlists } = usePlaylists();

  return (
    <div className="library">
      <div className="heading">Playlists</div>
      <div
        className="btn-addNewPlaylist"
        onClick={() => setModalVisibility(true)}
      >
        {" "}
        <span className="icon icon-plus">
          <FiPlus />
        </span>{" "}
        New playlist
      </div>
      <div className="container-playlists">
        {playlists && playlists.map((playlist) => (
          <PlaylistNameCard
            key={`playlist${playlist.id}`}
            id={playlist.id}
            image={
              playlist.videos.length === 0
                ? BlankImage
                : playlist.videos[0].thumbnail
            }
            title={playlist.title}
            numOfVideos={playlist.videos.length}
          />
        ))}
      </div>
      {modalVisibility && (
        <CreatePlaylistModal
          setModalVisibility={(arg) => setModalVisibility(arg)}
        />
      )}
    </div>
  );
};
