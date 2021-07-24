import { categoryReducer, initialState } from "./categoryReducer";

describe("testing category reducer", () => {
  test("Set user subscriptions", () => {
    const action = {
      type: "SET_USER_SUBSCRIPTIONS",
      payload: {
        userSubscriptions: [
          {
            id: "sub1",
            developers: ["epic games"],
          },
        ],
      },
    };

    const finalState = {
      allCategories: [],
      userSubscriptions: [
        {
          id: "sub1",
          developers: ["epic games"],
        },
      ],
      appState: "success"
    };

    const reducerState = categoryReducer(initialState, action);
    expect(reducerState).toEqual(finalState);
  });

  test("Set all categories", () => {
    const action = {
      type: "SET_ALL_CATEGORIES",
      payload: {
        allCategories: [
          {
            id: "cat1",
            developers: ["riot games"],
          },
        ],
      },
    };

    const finalState = {
      allCategories: [
        {
          id: "cat1",
          developers: ["riot games"],
        },
      ],
      userSubscriptions: [],
      appState: "success"
    };

    const reducerState = categoryReducer(initialState, action);
    expect(reducerState).toEqual(finalState);
  });

  test("Subscribe to a category", () => {
    let action = {
      type: "SUB_TO_CATEGORY",
      payload: {
        category: {
          id: "cat11",
          developers: ["epic games"],
        },
      },
    };

    let finalState = {
      userSubscriptions: [
        {
          id: "cat11",
          developers: ["epic games"],
        },
      ],
      allCategories: [],
      appState: "success",
    };

    let reducerState = categoryReducer(initialState, action);
    expect(reducerState).toEqual(finalState);

    action = {
      type: "SUB_TO_CATEGORY",
      payload: {
        category: {
          id: "cat22",
          developers: ["riot games"],
        },
      },
    };

    finalState = {
      userSubscriptions: [
        {
          id: "cat11",
          developers: ["epic games"],
        },
        {
          id: "cat22",
          developers: ["riot games"],
        },
      ],
      allCategories: [],
      appState: "success",
    };
    reducerState = categoryReducer(reducerState, action);
    expect(reducerState).toEqual(finalState);
  });

  test("Unsubscribe from a category", () => {
    const initialState = {
      allCategories: [],
      userSubscriptions: [
        {
          id: "cat11",
        },
        {
          id: "cat22",
        },
      ],
    };

    let action = {
      type: "UNSUB_FROM_CATEGORY",
      payload: {
        category: {
          id: "cat11",
        },
      },
    };

    let finalState = {
      allCategories: [],
      userSubscriptions: [{ id: "cat22" }],
      appState: "success",
    };

    let reducerState = categoryReducer(initialState, action);
    expect(reducerState).toEqual(finalState);

    action = {
      type: "UNSUB_FROM_CATEGORY",
      payload: {
        category: {
          id: "cat22",
        },
      },
    };

    finalState = {
      allCategories: [],
      userSubscriptions: [],
      appState: "success",
    };

    reducerState = categoryReducer(reducerState, action);
    expect(reducerState).toEqual(finalState);
  });
});
