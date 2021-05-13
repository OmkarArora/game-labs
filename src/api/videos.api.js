import axios from "axios";

export const fetchVideoDetails = async (videoId) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND}/videos/${videoId}`
    );
    if (data.success) {
      let video = data.video;
      console.log({ video });
      return video;
    }
  } catch (error) {
    console.error({ error });
    return error;
  }
};
