import { useEffect } from "react";
import { useNav } from "../../contexts";

export const Home = () => {
	const { setActiveNavLink } = useNav();
	useEffect(() => setActiveNavLink("home"));
	return <div>HOME</div>
}