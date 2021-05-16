import { useEffect } from "react";
// import { VideoCard } from "../VideoCard/VideoCard";
// import { useNav, useCategory, useGuides } from "../../contexts";
import { useNav } from "../../contexts";
import "./guides.css";

export const Guides = () => {
  const { setActiveNavLink } = useNav();
  useEffect(() => setActiveNavLink("guides"), [setActiveNavLink]);
  
  // const { allCategories } = useCategory();
  // const { guideVideos } = useGuides();
  // const [activeCategory, setActiveCategory] = useState(
  //   categories ? categories[0].id : ""
  // );

  // const filterData = (videos) => {
  //   return videos.filter((video) => video.categoryId === activeCategory);
  // };

  // const renderData = filterData(guideVideos);

  return (
    <h3>Under construction</h3>
  )
  // return (
  //   <div className="guides">
  //     <div className="container-categorySelect">
  //       {categories.map((category) => (
  //         <div
  //           key={`Category${category.id}`}
  //           className={activeCategory === category.id ? "pill active" : "pill"}
  //           onClick={() => setActiveCategory(category.id)}
  //         >
  //           {category.title}
  //         </div>
  //       ))}
  //     </div>
  //     <div className="container-videos">
  //       {renderData.map(({ id, title, categoryId, thumbnail, runtime }) => (
  //         <VideoCard
  //           key={id}
  //           id={id}
  //           title={title}
  //           category={categoryId}
  //           thumbnail={thumbnail}
  //           runtime={runtime}
  //         />
  //       ))}
  //     </div>
  //   </div>
  // );
};
