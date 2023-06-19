import React from "react";

import DisplayPost from "../home/DisplayPost";
import { usePost } from "../../contexts/PostContext";

function ExplorePage() {
  const { postState } = usePost();
  const { posts } = postState;
  //console.log(posts, "posts");
  return (
    <div className="flex flex-col  justify-items-center w-3/5	gap-4">
      {posts.map((post) => (
        <DisplayPost post={post} key={post?._id} />
      ))}
      {/* <DisplayPost />
      <DisplayPost />
      <DisplayPost />
      <DisplayPost />
      <DisplayPost /> */}
    </div>
  );
}

export default ExplorePage;
