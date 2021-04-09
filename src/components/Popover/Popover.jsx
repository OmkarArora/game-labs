import "./popover.css";

export const Popover = ({ popoverMenu }) => {
  return (
    <div className="popover">
      {popoverMenu.map((item, index) => (
        <div
          key={`popover-item${index}`}
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
