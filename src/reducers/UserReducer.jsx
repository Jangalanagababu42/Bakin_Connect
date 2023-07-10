export const USER_ACTIONS = {
  getusers: "get_users",
  adduser: "add_users",
  edituser: "edituser",
  updateusers: "updateusers",
};

export const initialUserState = {
  users: [],
};

export function UserReducer(state, action) {
  switch (action.type) {
    case USER_ACTIONS.getusers:
      return { ...state, users: action.payload };
    case USER_ACTIONS.adduser:
      return {
        ...state,
        users: [...state.users, action.payload.user],
      };
    case USER_ACTIONS.edituser:
      const updatedUsers = state.users.map((user) =>
        user._id === action.payload._id ? (user = action.payload) : user
      );
      return {
        ...state,
        users: updatedUsers,
      };
    default:
      return state;
  }
}
// ...productState,
// addressList: [...productState.addressList, action.payload.address],
