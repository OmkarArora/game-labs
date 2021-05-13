import axios from "axios";

export const fetchPlaylists = async (userId) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND}/users/${userId}/playlists`
    );
    if (data.success) {
      let playlists = data.playlists;
      playlists = playlists.map((item) => ({
        id: item._id,
        title: item.title,
        videos: item.videos.map((video) => ({
          id: video._id,
          title: video.title,
          video: video.video,
          thumbnail: video.thumbnail,
          description: video.description,
          category: video.category,
          runtime: video.runtime,
        })),
      }));
      return playlists;
    }
  } catch (error) {
    console.error({ error });
    return error;
  }
};
