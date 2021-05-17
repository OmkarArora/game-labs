import { useEffect } from "react";
import { subToCategory, unsubFromCategory } from "../../api/categories.api";
import { useNav, useCategory, useAuth, useAlert } from "../../contexts";
import "./allGames.css";
import checkSubscription from "./checkSubscription";

export const AllGames = () => {
  const { setActiveNavLink } = useNav();
  useEffect(() => setActiveNavLink("all-games"), [setActiveNavLink]);
  const {
    allCategories,
    userSubscriptions,
    dispatch: categoryDispatch,
  } = useCategory();
  const { isUserLoggedIn, userData } = useAuth();
  const { setSnackbar } = useAlert();

  const subscribeUser = (categoryId) => {
    (async () => {
      try {
        const category = await subToCategory(userData.id, categoryId);
        categoryDispatch({
          type: "SUB_TO_CATEGORY",
          payload: { category },
        });
      } catch (error) {
        setSnackbar({
          openStatus: true,
          type: "error",
          data: "Error occurred while subscribing",
        });
      }
    })();
  };

  const unsubscribeUser = (categoryId) => {
    (async () => {
      try {
        const category = await unsubFromCategory(userData.id, categoryId);
        
        categoryDispatch({
          type: "UNSUB_FROM_CATEGORY",
          payload: { category },
        });
      } catch (error) {
        setSnackbar({
          openStatus: true,
          type: "error",
          data: "Error occurred while unsubscribing",
        });
      }
    })();
  };

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
                {isUserLoggedIn &&
                  (checkSubscription(userSubscriptions, category.id) ? (
                    <button
                      className="btn-subscribe btn-tonedown"
                      onClick={() => unsubscribeUser(category.id)}
                    >
                      UNSUBSCRIBE
                    </button>
                  ) : (
                    <button
                      className="btn-subscribe btn-highlight"
                      onClick={() => subscribeUser(category.id)}
                    >
                      SUBSCRIBE
                    </button>
                  ))}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
