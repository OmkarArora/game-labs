import { useEffect } from "react";
import { useNav, useCategory } from "../../contexts";
import "./guides.css";

export const Guides = () => {
  const { setActiveNavLink } = useNav();
  useEffect(() => setActiveNavLink("guides"), [setActiveNavLink]);

  const { categories } = useCategory();

  return (
    <div>
      <div className="container-categorySelect">
        {categories.map((category) => (
          <div key={`Category${category.id}`} className="pill">
            {category.title}
          </div>
        ))}
      </div>
    </div>
  );
};
