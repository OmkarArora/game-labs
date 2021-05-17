import axios from "axios";

export const fetchAllCategories = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND}/categories`
    );
    if (data.success) {
      const categories = data.categories.map((category) => ({
        id: category._id,
        name: category.name,
        developers: category.developers,
        publishers: category.publishers,
        release: category.release,
        genre: category.genre,
        thumbnail: category.thumbnail,
        icon: category.icon,
        gallery: category.gallery,
        description: category.description,
        platforms: category.platforms,
      }));
      return categories;
    }
  } catch (error) {
    console.error({ error });
    return error;
  }
};

export const fetchUserSubscriptions = async (userId) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND}/users/${userId}/category-subscriptions`
    );
    if (data.success) {
      let categorySubscriptions = data.categorySubscriptions;
      categorySubscriptions = categorySubscriptions.map((category) => ({
        id: category._id,
        name: category.name,
        developers: category.developers,
        publishers: category.publishers,
        release: category.release,
        genre: category.genre,
        thumbnail: category.thumbnail,
        icon: category.icon,
        gallery: category.gallery,
        description: category.description,
        platforms: category.platforms,
      }));
      return categorySubscriptions;
    }
  } catch (error) {
    console.error({ error });
    return error;
  }
};

export const subToCategory = async (userId, categoryId) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND}/users/${userId}/category-subscriptions/sub`,
      {
        categoryId,
      }
    );
    if (data.success) {
      let category = data.category;
      category = {
        id: category._id,
        name: category.name,
        developers: category.developers,
        publishers: category.publishers,
        release: category.release,
        genre: category.genre,
        thumbnail: category.thumbnail,
        icon: category.icon,
        gallery: category.gallery,
        description: category.description,
        platforms: category.platforms,
      };
      return category;
    }
  } catch (error) {
    console.error({ error });
    return error;
  }
};

export const unsubFromCategory = async (userId, categoryId) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND}/users/${userId}/category-subscriptions/unsub`,
      {
        categoryId,
      }
    );
    if (data.success) {
      let category = data.category;
      category = {
        id: category._id,
        name: category.name,
        developers: category.developers,
        publishers: category.publishers,
        release: category.release,
        genre: category.genre,
        thumbnail: category.thumbnail,
        icon: category.icon,
        gallery: category.gallery,
        description: category.description,
        platforms: category.platforms,
      };
      return category;
    }
  } catch (error) {
    console.error({ error });
    return error;
  }
};
