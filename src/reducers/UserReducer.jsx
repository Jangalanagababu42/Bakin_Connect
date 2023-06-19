export const USER_ACTIONS = {
  getusers: "get_users",
};

export const initialUserState = {
  users: [],
};

export function UserReducer(state, action) {
  switch (action.type) {
    case USER_ACTIONS.getusers:
      return { ...state, users: action.payload };
    default:
      break;
  }
}
