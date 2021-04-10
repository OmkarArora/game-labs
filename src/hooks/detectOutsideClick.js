import { useEffect } from "react";

export const useOutsideClick = (ref, performAction) => {
  useEffect(() => {
    function handleClickOutside(event) {;
      if (ref.current && !ref.current.contains(event.target)) {
        performAction();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, performAction]);
};
