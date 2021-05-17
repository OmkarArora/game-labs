import { useEffect } from "react";
import { useNav, useCategory } from "../../contexts";
import "./allGames.css";
import checkSubscription from "./checkSubscription";

export const AllGames = () => {
  const { setActiveNavLink } = useNav();
  useEffect(() => setActiveNavLink("all-games"), [setActiveNavLink]);

  const { allCategories, userSubscriptions } = useCategory();
  return (
    <div className="container-games">
      {allCategories &&
        allCategories.map((category) => (
          <div key={category.id} className="card-game">
            <div
              className="card-game-inner-container
			  "
            >
              <img src={category.thumbnail} alt={`${category.name}`} />
              <div className="game-details">
                <div>
                  <div className="game-name">{category.name}</div>
                  <div className="game-publishers">
                    {category.publishers.join(", ")}
                  </div>
                </div>
                {checkSubscription(userSubscriptions, category.id) ? (
                  <button className="btn-subscribe btn-tonedown">
                    UNSUBSCRIBE
                  </button>
                ) : (
                  <button className="btn-subscribe btn-highlight">
                    SUBSCRIBE
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
