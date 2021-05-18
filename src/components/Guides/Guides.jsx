import { useEffect, useState } from "react";
import { VideoCard } from "../VideoCard/VideoCard";
import { useNav, useCategory, useAllVideos } from "../../contexts";
import "./guides.css";

export const Guides = () => {
  const { setActiveNavLink } = useNav();
  useEffect(() => setActiveNavLink("guides"), [setActiveNavLink]);

  const { userSubscriptions } = useCategory();
  const { videos: allVideos } = useAllVideos();
  const [activeCategory, setActiveCategory] = useState(
    userSubscriptions ? userSubscriptions[0]?.id : ""
  );

  useEffect(() => {
    if (userSubscriptions && userSubscriptions[0])
      setActiveCategory(userSubscriptions[0].id);
  }, [userSubscriptions]);

  const filterData = (videos) => {
    return videos.filter((video) => video.category === activeCategory);
  };

  const renderData = filterData(allVideos);

  return (
    <div className="guides">
      {userSubscriptions && userSubscriptions.length === 0 && <div>No subscriptions found</div>}
      <div className="container-categorySelect">
        {userSubscriptions.map((category) => (
          <div
            key={`Category${category.id}`}
            className={activeCategory === category.id ? "pill active" : "pill"}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </div>
        ))}
      </div>
      <div className="container-videos">
        {renderData.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};
