import "./playlistNameCard.css";

export const PlaylistNameCard = ({ image, title, numOfVideos }) => {
  return (
    <div className="card-playlist">
      <img src={image} alt={title} />
      <div className="details-playlist">
        <div className="title">{title}</div>
        <div className="video-count">{numOfVideos===0?"No": numOfVideos} {numOfVideos===1?"video":"videos"}</div>
      </div>
    </div>
  );
};
