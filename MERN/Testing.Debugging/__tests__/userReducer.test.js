// __tests__/userReducer.test.js
import userReducer from "../reducers/userReducer";

test("handles LOGIN action", () => {
  const state = userReducer(undefined, { type: "LOGIN" });
  expect(state.loggedIn).toBe(true);
});
