import ValorantIcon from "../../images/valorant-icon.png";
import FortniteIcon from "../../images/fortnite-icon.png";

export const getIcon = (category) => {
	switch(category){
		case "valorant":
			return ValorantIcon;
		case "fortnite":
			return FortniteIcon;
		default:
			return ValorantIcon;
	}
}