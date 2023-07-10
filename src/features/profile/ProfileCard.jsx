import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { usePost } from "../../contexts/PostContext";

import EditProfileModal from "./EditProfileModal";
import { useUser } from "../../contexts/UserContext";
import FollowingModal from "./FollowingModal";
import FollowersModal from "./FollowersModal";
import { toast } from "react-toastify";
function ProfileCard({ profile, totalposts }) {
  console.log(profile, "profiles");
  const { authUser, setAuthToken, setAuthUser } = useAuth();
  const {
    followHandler,
    unFollowHandler,
    profileModal,
    setprofileModal,
    followingModal,
    setFollowingModal,
    followerModal,
    setFollowerModal,
  } = useUser();
  const isFollowing = () =>
    authUser?.following?.filter((user) => user.username === profile.username)
      .length !== 0;
  const navigate = useNavigate();
  const LogoutHandler = () => {
    localStorage.removeItem("authUser");
    localStorage.removeItem("authToken");
    setAuthToken(null);
    setAuthUser(null);
    navigate("/login");
  };
  const checkLoggedInUser = (authUser, profile) =>
    authUser?.username === profile.username;

  return (
    <div className="flex justify-around w-full items-center gap-4 rounded-lg shadow-2xl p-5">
      <img
        src={profile.avatarUrl}
        alt=""
        className="h-48 object-cover w-48 sm:h-28 sm:w-28 rounded-full "
      />
      <div className="flex flex-col justify-center gap-4 sm:gap-2">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xl sm:text-base text-center">
            {profile.firstName} {profile.lastName}
          </p>
          {checkLoggedInUser(authUser, profile) ? (
            <button
              className="py-1 px-2 ring-1 rounded-md text-sm sm:text-xs
          "
              onClick={() => setprofileModal(true)}
            >
              {profileModal && <EditProfileModal profile={profile} />}
              Edit Profile
            </button>
          ) : isFollowing() ? (
            <button
              className="py-1 px-2 ring-1 rounded-md text-sm sm:text-xs"
              onClick={() => {
                unFollowHandler(profile._id);
                toast.success(`unfollowed ${profile.username}`);
              }}
            >
              UnFollow
            </button>
          ) : (
            <button
              className="py-1 px-2 ring-1 rounded-md text-sm sm:text-xs"
              onClick={() => {
                toast.success(`you started following ${profile.username}`);
                followHandler(profile._id);
              }}
            >
              Follow
            </button>
          )}
        </div>
        <div className="flex gap-1 text-sm sm:text-xs">
          <p>@{profile.username}</p>
        </div>
        <div className="flex gap-1 text-sm sm:text-xs">
          <p>{profile.bio}</p>
        </div>
        <div className="flex gap-2 text-sm sm:text-xs">
          <Link className="text-primary no-underline" target="_blank">
            {profile.website}
          </Link>
        </div>
        <div className="flex gap-2 justify-between text-base sm:text-sm ">
          <p className="cursor-pointer">{totalposts} posts</p>
          <p
            className="cursor-pointer"
            onClick={(e) => setFollowingModal(true)}
          >
            {checkLoggedInUser(authUser, profile)
              ? authUser.following.length
              : profile.following.length}{" "}
            following
            {followingModal && (
              <FollowingModal followingData={profile.following} />
            )}
          </p>
          <p className="cursor-pointer" onClick={(e) => setFollowerModal(true)}>
            {checkLoggedInUser(authUser, profile)
              ? authUser.followers.length
              : profile.followers.length}{" "}
            followers
            {followerModal && (
              <FollowersModal followerData={profile.followers} />
            )}
          </p>
        </div>
      </div>
      {checkLoggedInUser(authUser, profile) && (
        <button
          className="text-white text-base sm:text-xs bg-red py-1 px-3 rounded-md "
          onClick={LogoutHandler}
        >
          Logout
        </button>
      )}
    </div>
  );
}

export default ProfileCard;
