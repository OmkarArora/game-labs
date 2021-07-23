import { reducerFn, initialState } from "./playlistsReducer";

describe("testing playlist reducer", () => {
  test("Set playlists", () => {
    let action = {
      type: "SET_PLAYLISTS",
      payload: {
        playlists: [
          { id: "1234", videos: [], title: "playlist 1" },
          {
            id: "4321",
            videos: [
              {
                id: "6095448a4f244d00f7030c8a",
                category: "60954124884f48008464d902",
                description: "video description",
                runtime: { minutes: 13, seconds: 26 },
                thumbnail: "thumbnail url",
                title: "video title",
                video: "video url",
              },
            ],
            title: "playlist 2",
          },
        ],
      },
    };

    let state = reducerFn(initialState, action);
    expect(state).toEqual({
      playlists: [
        { id: "1234", videos: [], title: "playlist 1" },
        {
          id: "4321",
          videos: [
            {
              id: "6095448a4f244d00f7030c8a",
              category: "60954124884f48008464d902",
              description: "video description",
              runtime: { minutes: 13, seconds: 26 },
              thumbnail: "thumbnail url",
              title: "video title",
              video: "video url",
            },
          ],
          title: "playlist 2",
        },
      ],
    });
  });

  test("Add video to playlist", () => {
    const initialState = {
      playlists: [
        { id: "1234", videos: [], title: "playlist 1" },
        {
          id: "4321",
          videos: [
            {
              id: "video11",
              category: "category22",
              description: "video description",
              runtime: { minutes: 13, seconds: 26 },
              thumbnail: "thumbnail url",
              title: "video title",
              video: "video url",
            },
          ],
          title: "playlist 2",
        },
      ],
    };

    const action = {
      type: "ADD_VIDEO_TO_PLAYLIST",
      payload: {
        playlistId: "1234",
        video: {
          id: "video12",
          category: "category23",
          description: "video description",
          runtime: { minutes: 10, seconds: 0 },
          thumbnail: "thumbnail url",
          title: "video title",
          video: "video url",
        },
      },
    };

    const finalState = {
      playlists: [
        {
          id: "1234",
          videos: [
            {
              id: "video12",
              category: "category23",
              description: "video description",
              runtime: { minutes: 10, seconds: 0 },
              thumbnail: "thumbnail url",
              title: "video title",
              video: "video url",
            },
          ],
          title: "playlist 1",
        },
        {
          id: "4321",
          videos: [
            {
              id: "video11",
              category: "category22",
              description: "video description",
              runtime: { minutes: 13, seconds: 26 },
              thumbnail: "thumbnail url",
              title: "video title",
              video: "video url",
            },
          ],
          title: "playlist 2",
        },
      ],
    };

    const reducerState = reducerFn(initialState, action);
    expect(reducerState).toEqual(finalState);
  });

  test("Remove video from playlist", () => {
    const initialState = {
      playlists: [
        { id: "1234", videos: [], title: "playlist 1" },
        {
          id: "4321",
          videos: [
            {
              id: "video11",
              category: "category22",
              description: "video description",
              runtime: { minutes: 13, seconds: 26 },
              thumbnail: "thumbnail url",
              title: "video title",
              video: "video url",
            },
          ],
          title: "playlist 2",
        },
      ],
    };

    const action = {
      type: "REMOVE_VIDEO_FROM_PLAYLIST",
      payload: {
        playlistId: "4321",
        videoId: "video11",
      },
    };

    const finalState = {
      playlists: [
        {
          id: "1234",
          videos: [],
          title: "playlist 1",
        },
        {
          id: "4321",
          videos: [],
          title: "playlist 2",
        },
      ],
    };

    const reducerState = reducerFn(initialState, action);
    expect(reducerState).toEqual(finalState);
  });

  test("Create new playlist", () => {
    const initialState = {
      playlists: [
        { id: "1234", videos: [], title: "playlist 1" },
        {
          id: "4321",
          videos: [
            {
              id: "video11",
              category: "category22",
              description: "video description",
              runtime: { minutes: 13, seconds: 26 },
              thumbnail: "thumbnail url",
              title: "video title",
              video: "video url",
            },
          ],
          title: "playlist 2",
        },
      ],
    };

    const action = {
      type: "CREATE_NEW_PLAYLIST",
      payload: {
        playlist: {
          id: "2222",
          videos: [],
          title: "playlist 3",
        },
      },
    };

    const finalState = {
      playlists: [
        { id: "1234", videos: [], title: "playlist 1" },
        {
          id: "4321",
          videos: [
            {
              id: "video11",
              category: "category22",
              description: "video description",
              runtime: { minutes: 13, seconds: 26 },
              thumbnail: "thumbnail url",
              title: "video title",
              video: "video url",
            },
          ],
          title: "playlist 2",
        },
        {
          id: "2222",
          videos: [],
          title: "playlist 3",
        },
      ],
    };

    const reducerState = reducerFn(initialState, action);
    expect(reducerState).toEqual(finalState);
  });

  test("Delete playlist", () => {
    const initialState = {
      playlists: [
        { id: "1234", videos: [], title: "playlist 1" },
        {
          id: "4321",
          videos: [
            {
              id: "video11",
              category: "category22",
              description: "video description",
              runtime: { minutes: 13, seconds: 26 },
              thumbnail: "thumbnail url",
              title: "video title",
              video: "video url",
            },
          ],
          title: "playlist 2",
        },
      ],
    };

    const action = {
      type: "DELETE_PLAYLIST",
      payload: {
        playlistId: "1234",
      },
    };

    const finalState = {
      playlists: [
        {
          id: "4321",
          videos: [
            {
              id: "video11",
              category: "category22",
              description: "video description",
              runtime: { minutes: 13, seconds: 26 },
              thumbnail: "thumbnail url",
              title: "video title",
              video: "video url",
            },
          ],
          title: "playlist 2",
        }
      ],
    };

    const reducerState = reducerFn(initialState, action);
    expect(reducerState).toEqual(finalState);
  });
});
