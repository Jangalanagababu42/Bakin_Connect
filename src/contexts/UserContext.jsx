import React, { createContext, useContext, useEffect, useReducer } from "react";
import { UserService } from "../services/UserService";
import {
  USER_ACTIONS,
  UserReducer,
  initialUserState,
} from "../reducers/UserReducer";
import { useAuth } from "./AuthContext";

const UserContext = createContext();

function UserProvider({ children }) {
  const [userState, userDispatch] = useReducer(UserReducer, initialUserState);
  const { authUser } = useAuth();
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
  const filterAuthUser = userState?.users?.find(
    (curruser) => curruser.username === authUser?.username
  );
  console.log(filterAuthUser, "filterAuthUser");
  return (
    <UserContext.Provider value={{ userState, userDispatch, filterAuthUser }}>
      {children}
    </UserContext.Provider>
  );
}

const useUser = () => useContext(UserContext);

export { useUser, UserProvider };
