import React, { useState } from "react";
import UserCard from "./UserCard";
import { useUser } from "../contexts/UserContext";
import { useAuth } from "../contexts/AuthContext";
import { BsClock, BsFire } from "react-icons/bs";
import { useLocation } from "react-router-dom";

function Suggestions() {
  const location = useLocation();

  const {
    userState: { users },
  } = useUser();
  const { authUser } = useAuth();
  const suggestedUsers = users.filter(
    (outeruser) =>
      !authUser?.following?.find(
        (user) => outeruser.username === user.username
      ) && outeruser.username !== authUser?.username
  );
  const [clickedSort, setClickedSort] = useState("latest");
  console.log(authUser);
  console.log(suggestedUsers, "suggestedUsers");

  return (
    <div className="grid col-span-3 bg-slate-200 ">
      <div>
        {location.pathname === "/" && (
          <div className="flex flex-row flex-grow justify-evenly m-4">
            <div
              className={`flex flex-row items-center rounded-md bg-offwhite border-gray-300 hover:bg-offwhite py-2 px-6 cursor-pointer ml-3 ${
                clickedSort === "trending" && "bg-pink"
              }`}
              onClick={() => setClickedSort("trending")}
            >
              <BsFire />
              <span className=" font-semibold">Trending</span>
            </div>
            <div
              className={`flex flex-row items-center rounded-md bg-offwhite border-gray-300 hover:bg-offwhite py-2 px-6 cursor-pointer mr-3 ${
                clickedSort === "latest" && " bg-pink"
              }`}
              onClick={() => setClickedSort("latest")}
            >
              <BsClock className="mr-1" />
              <span className=" font-semibold ">Latest</span>
            </div>
          </div>
        )}
        <p className=" text-start font-semibold m-4 text-xl">
          Suggestions for you
        </p>
        <div className="divide-y">
          {suggestedUsers.map((user) => (
            <UserCard user={user} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Suggestions;
