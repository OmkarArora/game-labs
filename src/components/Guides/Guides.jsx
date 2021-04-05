import { useEffect } from "react";
import { useNav } from "../../contexts";

export const Guides = () => {
  const { setActiveNavLink } = useNav();
  useEffect(() => setActiveNavLink("guides"));
  return <div>GUIDES</div>;
};
