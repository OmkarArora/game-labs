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

export const fetchHistory = async (userId) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND}/users/${userId}/playlists/history`
    );
    if (data.success) {
      let history = data.history;
      history.id = history._id;
      history.videos = history.videos.map((video) => ({
        id: video._id,
        title: video.title,
        video: video.video,
        thumbnail: video.thumbnail,
        description: video.description,
        category: video.category,
        runtime: video.runtime,
      }));
      return history;
    }
  } catch (error) {
    console.error({ error });
    return error;
  }
};

export const fetchWatchLater = async (userId) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND}/users/${userId}/playlists/watch-later`
    );
    if (data.success) {
      let watchLater = data.watchLater;
      watchLater.id = watchLater._id;
      watchLater.videos = watchLater.videos.map((video) => ({
        id: video._id,
        title: video.title,
        video: video.video,
        thumbnail: video.thumbnail,
        description: video.description,
        category: video.category,
        runtime: video.runtime,
      }));
      return watchLater;
    }
  } catch (error) {
    console.error({ error });
    return error;
  }
};

export const createPlaylist = async (userId, title) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND}/users/${userId}/playlists/create`,
      {
        title,
      }
    );
    if (data.success) {
      let playlist = data.playlist;
      playlist = {
        id: playlist._id,
        title: playlist.title,
        videos: playlist.video || [],
      };
      return playlist;
    }
  } catch (error) {
    console.error({ error });
    return error;
  }
};

export const deletePlaylist = async (userId, playlistId) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND}/users/${userId}/playlists/delete`,
      {
        playlistId,
      }
    );
    if (data.success) {
      let playlist = data.playlist;
      playlist = {
        id: playlist._id,
        title: playlist.title,
        videos: playlist.video,
      };
      return playlist;
    }
  } catch (error) {
    console.error({ error });
    return error;
  }
};

export const addVideoToPlaylist = async (playlistId, videoId) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND}/playlists/${playlistId}/video/add`,
      {
        video: videoId,
      }
    );
    if (data.success) {
      if (data.playlist) {
        let playlist = data.playlist;
        playlist.id = playlist._id;
        playlist.videos = playlist.videos.map((video) => ({
          id: video._id,
          _id: video._id,
          title: video.title,
          video: video.video,
          thumbnail: video.thumbnail,
          description: video.description,
          category: video.category,
          runtime: video.runtime,
        }));
        return playlist;
      } else {
        return new Error(
          data.message || data.errorMessage || "Something went wrong"
        );
      }
    }
  } catch (error) {
    console.error({ error });
    return error;
  }
};

export const deleteVideoFromPlaylist = async (playlistId, videoId) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND}/playlists/${playlistId}/video/delete`,
      {
        video: videoId,
      }
    );
    if (data.success) {
      let playlist = data.playlist;
      playlist.id = playlist._id;
      playlist.videos = playlist.videos.map((video) => ({
        id: video._id,
        _id: video._id,
        title: video.title,
        video: video.video,
        thumbnail: video.thumbnail,
        description: video.description,
        category: video.category,
        runtime: video.runtime,
      }));
      return playlist;
    }
  } catch (error) {
    console.error({ error });
    return error;
  }
};
