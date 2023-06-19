import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function ProfileCard({ profile }) {
  const { authUser } = useAuth();
  const navigate = useNavigate();
  const LogoutHandler = () => {
    localStorage.removeItem("authUser");
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  const checkLoggedInUser = (authUser, profile) =>
    authUser.username === profile.username;
  console.log(checkLoggedInUser(authUser, profile));
  return (
    <div className="flex justify-around w-full items-center gap-4 rounded-lg shadow-2xl p-5">
      <img
        src={profile.avatarUrl}
        // src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
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
            >
              Edit Profile
            </button>
          ) : (
            <button
              className="py-1 px-2 ring-1 rounded-md text-sm sm:text-xs
          "
            >
              Follow
            </button>
          )}
        </div>
        <div className="flex gap-1 text-sm sm:text-xs">
          <p>@ {profile.username}</p>
        </div>
        <div className="flex gap-2 text-sm sm:text-xs">
          <Link className="text-blue no-underline" target="_blank">
            {profile.bio}
          </Link>
        </div>
        <div className="flex gap-2 justify-between text-base sm:text-sm ">
          <p className="cursor-pointer">6 posts</p>
          <p className="cursor-pointer">{profile.following.length} following</p>
          <p className="cursor-pointer">{profile.followers.length} followers</p>
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
