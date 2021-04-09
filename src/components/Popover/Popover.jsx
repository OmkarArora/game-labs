import "./popover.css";

export const Popover = ({ popoverMenu }) => {
  return (
    <div className="popover">
      {popoverMenu.map((item) => (
        <div
          onClick={() => {
            item.performAction();
            item.onClose();
          }}
        >
          {item.text}
        </div>
      ))}
    </div>
  );
};
