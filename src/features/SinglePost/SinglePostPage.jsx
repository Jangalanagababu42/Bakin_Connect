import React from "react";
import { useParams } from "react-router-dom";
import { usePost } from "../../contexts/PostContext";
import DisplayPost from "../home/DisplayPost";

function SinglePostPage() {
  const { postId } = useParams();
  const {
    postState: { posts },
  } = usePost();
  const singlePost = posts.find((currpost) => currpost._id === postId);

  return (
    <div className="flex flex-col  justify-items-center w-3/5	gap-4">
      <DisplayPost
        post={singlePost}
        key={singlePost?._id}
        individualpage={true}
      />
    </div>
  );
}

export default SinglePostPage;
