// reducers/userReducer.js
const initialState = { loggedIn: false };
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN": return { loggedIn: true };
    case "LOGOUT": return { loggedIn: false };
    default: return state;
  }
}
