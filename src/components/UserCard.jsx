import React from "react";
import { Link } from "react-router-dom";

import { useUser } from "../contexts/UserContext";
import { toast } from "react-toastify";
function UserCard({ user }) {
  const { followHandler } = useUser();

  return (
    <div className="flex flex-row relative flex-grow  ">
      {" "}
      <div className="flex flex-row">
        <div>
          <Link to={`/profile/${user.username}`}>
            <img
              className="  h-14 w-14 rounded-full object-cover m-2"
              src={user?.avatarUrl}
              // src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
              alt="avatar"
            />
          </Link>
        </div>
        <div>
          <Link to={`/profile/${user.username}`}>
            <div className="flex flex-col">
              <p>
                {user.firstName}
                {user.lastName}
              </p>
              <p className="text-gray">@{user.username}</p>
            </div>
          </Link>
        </div>
      </div>
      <div>
        <button
          className="  absolute right-5 top-4  text-white bg-primary border-solid border-2  py-1 px-2 border-white rounded-2xl hover:bg-white hover:text-primary hover:border-primary "
          onClick={() => {
            followHandler(user._id);
            toast.success(`you started following ${user.username}`);
          }}
        >
          Follow
        </button>
      </div>
    </div>
  );
}

export default UserCard;
