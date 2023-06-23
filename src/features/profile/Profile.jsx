import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import DisplayPost from "../home/DisplayPost";
import { useUser } from "../../contexts/UserContext";
import ProfileCard from "./ProfileCard";
import { usePost } from "../../contexts/PostContext";

function Profile() {
  const {
    postState: { posts },
  } = usePost();
  const [userProfile, setUserProfile] = useState();
  const [userPosts, setUserPosts] = useState();
  const { username } = useParams();

  const {
    userState: { users },
  } = useUser();
  useEffect(() => {
    if (username) {
      const filteredProfile = users.filter(
        (user) => user.username === username
      )[0];
      const userPosts = posts.filter((post) => post.username === username);

      setUserPosts(userPosts);
      setUserProfile(filteredProfile);
    }
  }, [username, users, posts]);

  return (
    <main className="p-2 mt-4">
      <div className="flex justify-center">
        <div className="flex flex-col w-2/5 xl:3/5 lg:w-4/5 md:4/5 sm:w-full  gap-4">
          {/* xl:3/5 lg:w-4/5 md:4/5 sm:w-full  */}
          {userProfile && (
            <>
              <ProfileCard profile={userProfile} key={userProfile._id} />
              {userPosts &&
                userPosts.map((post) => (
                  <DisplayPost post={post} key={post._id} />
                ))}
              <>
                {userPosts.length === 0 && (
                  <div className=" px-5 w-full  rounded-lg shadow-2xl">
                    <p className="text-center text-xl">
                      {" "}
                      You haven't posted anything yet, {""} Start Posting
                      Something
                    </p>
                  </div>
                )}
              </>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default Profile;
