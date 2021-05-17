import { useCategory } from "../contexts"
import BlankImg from "../images/blank.png";

export const useIcon = (category) => {
	const {allCategories} = useCategory();
	const categoryObj = allCategories.find(item => item.id===category);
	if(categoryObj)
		return categoryObj.icon;
	return BlankImg;
}