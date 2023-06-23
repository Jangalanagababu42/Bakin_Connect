import {
  faBookmark,
  faComment,
  faEllipsis,
  faHeart,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { useAuth } from "../../contexts/AuthContext";
import { usePost } from "../../contexts/PostContext";

function DisplayPost({ post, index }) {
  const [userDetails, setUserDetails] = useState(null);
  const {
    addBookmarkHandler,
    removePostFromBookmarkHandler,
    DisLikeHandler,
    LikeHandler,
  } = usePost();
  const {
    userState: { users },
  } = useUser();
  const { authUser } = useAuth();

  useEffect(() => {
    setUserDetails(users.filter((user) => user.username === post.username)[0]);
  }, [post.username, users]);

  const bookmarkedByUser = () =>
    authUser?.bookmarks.filter((bpost) => bpost._id === post._id).length !== 0;

  const likedByUser = () =>
    post?.likes?.likedBy?.filter((user) => user.username === authUser?.username)
      ?.length !== 0;

  const likeClickHandler = () => {
    if (likedByUser() === true) {
      DisLikeHandler(post._id);
    } else {
      LikeHandler(post._id);
    }
  };
  const bookmarkClickHandler = () => {
    if (bookmarkedByUser()) {
      removePostFromBookmarkHandler(post._id);
    } else {
      addBookmarkHandler(post._id);
    }
  };
  return (
    <>
      {userDetails && (
        <div className="flex flex-col gap-4 rounded-lg shadow-2xl p-5 mb-10">
          <div className="flex gap-4 flex-grow">
            <img
              className="rounded-full cursor-pointer w-14 h-14 object-cover"
              src={
                userDetails.username === authUser?.username
                  ? authUser?.avatarUrl
                  : userDetails.avatarUrl
              }
              // src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
              alt="pic"
            />
            <div className="flex justify-between flex-grow">
              <div className="flex flex-col">
                <p className="text-xl cursor-pointer">
                  {" "}
                  {userDetails.firstName} {userDetails.lastName}
                </p>
                <p className="text-gray">@{userDetails.username}</p>
                <p className="text-sm cursor-pointer">
                  {" "}
                  {` ${new Date(post?.createdAt)
                    .toDateString()
                    .split(" ")
                    .slice(1, 4)
                    .join(" ")}`}
                </p>
              </div>
              <div className="relative">
                {userDetails.username === authUser?.username && (
                  <FontAwesomeIcon
                    className="absolute right-0"
                    icon={faEllipsis}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="cursor-pointer flex flex-col gap-6 flex-grow">
            <p className="px-4">{post?.content}</p>
            {post.mediaURL && (
              <img
                // src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
                src={post.mediaURL}
                alt="logo"
                className="rounded-lg max-h-80 w-full object-contain"
              />
            )}
            <hr />
          </div>
          <div className="flex gap-4 flex-grow py-1 items-center justify-evenly font-normal">
            <div className="flex items-center gap-1 cursor-pointer">
              {likedByUser() ? (
                <FontAwesomeIcon
                  icon={faHeart}
                  style={{ color: "red" }}
                  onClick={(e) => likeClickHandler()}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faHeart}
                  onClick={(e) => likeClickHandler()}
                />
              )}
              {post?.likes?.likeCount > 0 && (
                <span>{post?.likes?.likeCount}</span>
              )}
            </div>
            <div
              className="flex items-center gap-1 cursor-pointer"
              onClick={(e) => bookmarkClickHandler(e)}
            >
              {bookmarkedByUser() ? (
                <FontAwesomeIcon icon={faBookmark} style={{ color: "black" }} />
              ) : (
                <FontAwesomeIcon icon={faBookmark} style={{ color: "grey" }} />
              )}
            </div>
            <div className="flex items-center gap-1 cursor-pointer">
              <FontAwesomeIcon icon={faComment} />
            </div>
            <div className="flex items-center gap-1 cursor-pointer">
              <FontAwesomeIcon icon={faShareNodes} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DisplayPost;
