import React, { useEffect, useState } from "react";
import CreatePost from "./CreatePost";

import DisplayPost from "./DisplayPost";
import { usePost } from "../../contexts/PostContext";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, useNavigation } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const {
    clickedSort,
    postState: { posts },
  } = usePost();

  const [followingPosts, setFollowingPosts] = useState([]);
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
  const sortedposts =
    clickedSort === "trending"
      ? [
          ...followingPosts.filter(
            (post) => post.likes?.likeCount > 0 || post.comments?.length > 0
          ),
        ].sort(
          (a, b) =>
            b?.likes?.likeCount +
            b?.comments?.length -
            (a?.likes?.likeCount + a?.comments?.length)
          //  || b.comments.length - a.comments.length
        )
      : [...followingPosts].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

  return (
    <div className="flex flex-col  justify-items-center w-3/5	gap-4">
      <CreatePost />

      {sortedposts.length > 0 ? (
        sortedposts.map((post) => (
          <DisplayPost post={post} key={post?._id} individualpage={false} />
        ))
      ) : (
        <div>
          <div className="text-primary font-semibold text-lg my-2 py-5">
            No Posts to display! Follow some users or create your own Post...{" "}
          </div>
          <div className=" text-lg text-center">
            {" "}
            <span
              className=" text-blue font-semibold cursor-pointer hover:text-pink"
              onClick={() => navigate("/explore")}
            >
              Explore{" "}
            </span>{" "}
            Feed
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
