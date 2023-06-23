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
    (user) => user.username !== authUser?.username
  );
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
