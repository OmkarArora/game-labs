import { createContext, useContext, useReducer, useEffect } from "react";
import { fetchAllCategories , fetchUserSubscriptions} from "../../api";
import { categoryReducer } from "./categoryReducer";

const CategoryContext = createContext();

export const useCategory = () => useContext(CategoryContext);

export const CategoryProvider = ({ children }) => {
  const [{ allCategories, userSubscriptions, appState }, dispatch] = useReducer(
    categoryReducer,
    {
      allCategories: [],
      userSubscriptions: [],
      appState: "success",
    }
  );

  useEffect(() => {
    (async () => {
      const categories = await fetchAllCategories();
      if ("isAxiosError" in categories) {
        dispatch({ type: "SET_APP_STATE", payload: { appState: "error" } });
      } else {
        dispatch({
          type: "SET_ALL_CATEGORIES",
          payload: { allCategories: categories },
        });
      }
    })();
    if (localStorage?.getItem("glabslogin")) {
      const userId = JSON.parse(localStorage.getItem("glabslogin")).userId;
      //fetch user subscriptions
      (async () => {
        const subscriptions = await fetchUserSubscriptions(userId);
        if ("isAxiosError" in subscriptions) {
          // return setSnackbar({
          //   openStatus: true,
          //   type: "error",
          //   data: "Error in loading subscriptions",
          // });
        }
        dispatch({
          type: "SET_USER_SUBSCRIPTIONS",
          payload: { userSubscriptions: subscriptions },
        });
      })();
    }
  }, []);

  const value = { allCategories, userSubscriptions, appState, dispatch };
  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};
