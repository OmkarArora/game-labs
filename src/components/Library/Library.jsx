import { useEffect, useState } from "react";
import { useNav, usePlaylists } from "../../contexts";
import { PlaylistNameCard } from "../PlaylisNametCard/PlaylistNameCard";
import { CreatePlaylistModal } from "../CreatePlaylistModal/CreatePlaylistModal";
import { FiPlus, FiClock } from "react-icons/fi";
import { RiHistoryLine } from "react-icons/ri";
import { MdPlaylistPlay } from "react-icons/md";
import BlankImage from "../../images/blank.png";
import "./library.css";

export const Library = () => {
  const { setActiveNavLink } = useNav();
  useEffect(() => setActiveNavLink("library"));

  const [modalVisibility, setModalVisibility] = useState(false);

  const { playlists, history, watchLater } = usePlaylists();

  return (
    <div className="library">
      {history && history.id && (
        <>
          <div className="heading">
            <span className="library-icon">
              <RiHistoryLine />
            </span>
            History
          </div>
          <div className="container-playlists">
            <PlaylistNameCard
              key={`playlist${history.id}`}
              id={history.id}
              image={
                history.videos.length === 0
                  ? BlankImage
                  : history.videos[0].thumbnail
              }
              title={history.title}
              numOfVideos={history.videos.length}
              showPopover={false}
            />
          </div>
        </>
      )}
      {watchLater && watchLater.id && (
        <>
          <div className="heading">
            <span className="library-icon">
              <FiClock />
            </span>
            Watch Later
          </div>
          <div className="container-playlists">
            <PlaylistNameCard
              key={`playlist${history.id}`}
              id={watchLater.id}
              image={
                watchLater.videos.length === 0
                  ? BlankImage
                  : watchLater.videos[0].thumbnail
              }
              title={watchLater.title}
              numOfVideos={watchLater.videos.length}
              showPopover={false}
            />
          </div>
        </>
      )}

      <div className="heading">
        <span className="library-icon">
          <MdPlaylistPlay />
        </span>
        Playlists
      </div>
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
        {playlists.length !== 0 &&
          playlists.map((playlist) => (
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
              showPopover={true}
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
