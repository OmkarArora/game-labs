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
    };

    const reducerState = categoryReducer(initialState, action);
    expect(reducerState).toEqual(finalState);
  });
});
