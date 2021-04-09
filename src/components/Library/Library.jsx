import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
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
      <div className="container-playlists">
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
        {playlists.map((playlist) => (
          <Link to={`/playlist/${playlist.id}`} key={playlist.id}>
            <PlaylistNameCard
              image={
                playlist.videos.length === 0
                  ? BlankImage
                  : playlist.videos[0].thumbnail
              }
              title={playlist.title}
              numOfVideos={playlist.videos.length}
            />
          </Link>
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
