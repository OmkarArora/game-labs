import "./popover.css";

export const Popover = ({ onClose, performAction }) => {
  return (
    <div className="popover">
      <div
        onClick={() => {
          performAction(true);
          onClose(false);
        }}
      >
        Save to playlist
      </div>
    </div>
  );
};
