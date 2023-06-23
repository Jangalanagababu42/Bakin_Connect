import React from "react";

import DisplayPost from "../home/DisplayPost";
import { usePost } from "../../contexts/PostContext";
import { useAuth } from "../../contexts/AuthContext";

function LikesPostPage() {
  const { authUser } = useAuth();

  const {
    postState: { posts },
  } = usePost();

  const likedByAuthUser = posts.filter((post) =>
    post?.likes?.likedBy?.find((user) => user.username === authUser?.username)
  );

  return (
    <div className="flex flex-col  justify-items-center w-3/5	gap-4">
      <div className="flex justify-center font-semibold text-primary text-xl">
        Liked Posts
      </div>
      {likedByAuthUser.length > 0 ? (
        likedByAuthUser.map((post) => (
          <DisplayPost post={post} key={post?._id} />
        ))
      ) : (
        <p className=" flex justify-center font-bold py-20">
          No Liked Posts yet
        </p>
      )}
    </div>
  );
}

export default LikesPostPage;
