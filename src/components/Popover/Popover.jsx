import { useRef } from "react";
import { useOutsideClick } from "../../hooks";
import "./popover.css";

export const Popover = ({ popoverMenu }) => {
  const ref = useRef(null);
  useOutsideClick(ref, () => popoverMenu[0].onClose());
  return (
    <div className="popover" ref={ref}>
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
