import ValorantIcon from "../../images/valorant-icon.png";
import FortniteIcon from "../../images/fortnite-icon.png";

export const getIcon = (category) => {
	switch(category){
		case "1":
			return ValorantIcon;
		case "2":
			return FortniteIcon;
		default:
			return ValorantIcon;
	}
}