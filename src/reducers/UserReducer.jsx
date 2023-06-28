export const USER_ACTIONS = {
  getusers: "get_users",
  adduser: "add_users",
};

export const initialUserState = {
  users: [],
};

export function UserReducer(state, action) {
  console.log(action.type, "action");
  switch (action.type) {
    case USER_ACTIONS.getusers:
      return { ...state, users: action.payload };
    case USER_ACTIONS.adduser:
      console.log(action.payload, "action.payload");
      return {
        ...state,
        users: [...state.users, action.payload.user],
      };
    default:
      break;
  }
}
// ...productState,
// addressList: [...productState.addressList, action.payload.address],
