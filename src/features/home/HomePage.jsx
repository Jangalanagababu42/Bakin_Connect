import React, { useEffect, useState } from "react";
import CreatePost from "./CreatePost";

import DisplayPost from "./DisplayPost";
import { usePost } from "../../contexts/PostContext";
import { useAuth } from "../../contexts/AuthContext";

function HomePage() {
  const {
    postState: { posts },
  } = usePost();
  const [followingPosts, setFollowingPosts] = useState();
  const { authUser } = useAuth();

  useEffect(() => {
    const filterposts = posts.filter(
      (currPost) =>
        authUser.following.find(
          (user) => user.username === currPost.username
        ) || authUser.username === currPost.username
    );
    setFollowingPosts(filterposts);
  }, [authUser, posts]);

  return (
    <div className="flex flex-col  justify-items-center w-3/5	gap-4">
      <CreatePost />

      {followingPosts &&
        [...followingPosts]
          .reverse()
          .map((post) => <DisplayPost post={post} key={post?._id} />)}
    </div>
  );
}

export default HomePage;
