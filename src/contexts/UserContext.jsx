import React, { createContext, useContext, useEffect, useReducer } from "react";
import { UserService } from "../services/UserService";
import {
  USER_ACTIONS,
  UserReducer,
  initialUserState,
} from "../reducers/UserReducer";

const UserContext = createContext();

function UserProvider({ children }) {
  const [userState, userDispatch] = useReducer(UserReducer, initialUserState);
  const getAllUsers = async () => {
    const response = await UserService();
    const {
      data: { users },
    } = response;
    userDispatch({ type: USER_ACTIONS.getusers, payload: users });
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <UserContext.Provider value={{ userState }}>
      {children}
    </UserContext.Provider>
  );
}

const useUser = () => useContext(UserContext);

export { useUser, UserProvider };
