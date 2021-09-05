import axios from "axios";

export const fetchVideoDetails = async (videoId) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND}/videos/${videoId}`
    );
    if (data.success) {
      let video = data.video;
      video = {
        id: video._id,
        title: video.title,
        video: video.video,
        thumbnail: video.thumbnail,
        description: video.description,
        category: video.category,
        runtime: video.runtime,
      }
      return video;
    }
  } catch (error) {
    console.error({ error });
    return error;
  }
};

export const fetchAllVideos = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND}/videos`
    );
    if (data.success) {
      let videos = data.videos.map(video => (
        {
          id: video._id,
          title: video.title,
          video: video.video,
          thumbnail: video.thumbnail,
          description: video.description,
          category: video.category,
          runtime: video.runtime,
        }
      ));
      return videos;
    }
  } catch (error) {
    console.error({ error });
    return error;
  }
}


