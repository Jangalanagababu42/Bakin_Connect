import React from "react";
import UserCard from "./UserCard";
import { useUser } from "../contexts/UserContext";
import { useAuth } from "../contexts/AuthContext";

function Suggestions() {
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

  console.log(authUser);
  console.log(suggestedUsers, "suggestedUsers");

  return (
    <div className="grid col-span-3 bg-slate-200 ">
      <div className="divide-y">
        {suggestedUsers.map((user) => (
          <UserCard user={user} />
        ))}
      </div>
    </div>
  );
}

export default Suggestions;
