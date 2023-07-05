import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { EditUsetService, UserService } from "../services/UserService";
import {
  USER_ACTIONS,
  UserReducer,
  initialUserState,
} from "../reducers/UserReducer";
import { useAuth } from "./AuthContext";
import { FollowService, UnFollowService } from "../services/PostService";

const UserContext = createContext();

function UserProvider({ children }) {
  const [userState, userDispatch] = useReducer(UserReducer, initialUserState);
  const [profileModal, setprofileModal] = useState(false);
  const [followingModal, setFollowingModal] = useState(false);
  const [followerModal, setFollowerModal] = useState(false);
  const { authUser, authToken, setAuthUser } = useAuth();
  const getAllUsers = async () => {
    const response = await UserService();
    const {
      data: { users },
    } = response;
    userDispatch({ type: USER_ACTIONS.getusers, payload: users });
  };
  const editUser = async (profileData) => {
    const response = await EditUsetService(authToken, profileData);
    const {
      data: { user },
    } = response;
    console.log(user, "edituser");
    userDispatch({ type: USER_ACTIONS.edituser, payload: user });
  };
  const followHandler = async (followuserId) => {
    const response = await FollowService(authToken, followuserId);
    console.log(response);
    const {
      data: { followUser, user },
    } = response;
    console.log(followUser, "followUser");
    userDispatch({ type: USER_ACTIONS.edituser, payload: followUser });
    userDispatch({ type: USER_ACTIONS.edituser, payload: user });
    setAuthUser(user);
  };
  const unFollowHandler = async (followuserId) => {
    const response = await UnFollowService(authToken, followuserId);
    console.log(response);
    const {
      data: { followUser, user },
    } = response;
    console.log(followUser, "followUser");
    userDispatch({ type: USER_ACTIONS.edituser, payload: followUser });
    userDispatch({ type: USER_ACTIONS.edituser, payload: user });
    setAuthUser(user);
  };

  useEffect(() => {
    getAllUsers();
  }, []);
  console.log(userState.users, "checkuser1");
  console.log(authUser, "checkuser2");

  const filterAuthUser = userState?.users?.find(
    (curruser) => curruser.username === authUser?.username
  );
  console.log(filterAuthUser, "filterAuthUser");
  return (
    <UserContext.Provider
      value={{
        userState,
        userDispatch,
        filterAuthUser,
        editUser,
        followHandler,
        unFollowHandler,
        profileModal,
        setprofileModal,
        followingModal,
        setFollowingModal,
        followerModal,
        setFollowerModal,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

const useUser = () => useContext(UserContext);

export { useUser, UserProvider };
