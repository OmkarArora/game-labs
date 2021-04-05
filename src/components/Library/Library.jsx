import { useEffect } from "react";
import { useNav } from "../../contexts";

export const Library = () => {
  const { setActiveNavLink } = useNav();
  useEffect(() => setActiveNavLink("library"));
  return <div>LIBRARY</div>;
};
