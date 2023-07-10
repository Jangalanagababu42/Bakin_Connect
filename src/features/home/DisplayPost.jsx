import {
  faBookmark,
  faEllipsis,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { CiHeart } from "react-icons/ci";
import { FcLike } from "react-icons/fc";
import { BsBookmark, BsShare } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { LiaEdit } from "react-icons/lia";
import { toast } from "react-toastify";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { useAuth } from "../../contexts/AuthContext";
import { usePost } from "../../contexts/PostContext";
import { useLocation, useNavigate } from "react-router-dom";
import EditPostModal from "./EditPostModal";

function DisplayPost({ post, index, individualpage }) {
  const { editopenModal, setEditOpenModal } = usePost();
  console.log(editopenModal, setEditOpenModal, "setEditOpenModal ");
  console.log(post, "post");
  const [openMenu, setOpenMenu] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();
  const {
    addBookmarkHandler,
    removePostFromBookmarkHandler,
    DisLikeHandler,
    LikeHandler,
    DeletePostHandler,
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
    if (likedByUser()) {
      DisLikeHandler(post._id);
    } else {
      LikeHandler(post._id);
    }
  };
  const bookmarkClickHandler = () => {
    if (bookmarkedByUser()) {
      removePostFromBookmarkHandler(post._id);
      toast.success("Removed From BookMarks");
    } else {
      addBookmarkHandler(post._id);
      toast.success("Added to BookMarks ");
    }
  };

  const copyHandler = () => {
    navigator.clipboard.writeText(
      `https://bakin-connect.vercel.app/post/${post._id}`
    );
    toast.info("Link Copied. Start sharing!");
  };

  return (
    <>
      {userDetails && (
        <div className="flex flex-col gap-4 rounded-lg shadow-2xl p-5 mb-10">
          <div className="flex gap-4 flex-grow">
            <img
              className="rounded-full cursor-pointer w-14 h-14 object-cover"
              src={userDetails.avatarUrl}
              onClick={() => navigate(`/profile/${userDetails.username}`)}
              alt="pic"
            />
            <div className="flex justify-between flex-grow">
              <div
                className="flex flex-col"
                onClick={() => navigate(`/profile/${userDetails.username}`)}
              >
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
              <div className="relative cursor-pointer">
                {userDetails.username === authUser?.username && (
                  <FontAwesomeIcon
                    className="absolute right-0"
                    icon={faEllipsis}
                    onClick={() => setOpenMenu(true)}
                  />
                )}
                {openMenu && (
                  <div className="absolute right-0 top-5  ">
                    <div className=" w-40 flex flex-col items-start rounded-md p-2 bg-bgpink">
                      <button
                        className="flex flex-row items-baseline p-2  hover:text-blue"
                        onClick={() => {
                          setEditOpenModal(true);
                          // setOpenMenu(false);
                          console.log("onclick, true");
                        }}
                      >
                        {editopenModal && (
                          <EditPostModal
                            editpost={post}
                            setOpenMenu={setOpenMenu}
                          />
                        )}
                        <LiaEdit className="mr-1" />
                        Edit
                      </button>
                      <button
                        className="flex flex-row items-baseline p-2 hover:text-red"
                        onClick={() => {
                          DeletePostHandler(post._id);
                          setOpenMenu(false);
                          toast.success("Post Deleted Successfully");
                          if (individualpage) navigate("/");
                        }}
                      >
                        {" "}
                        <FontAwesomeIcon
                          icon={faTrashCan}
                          style={{ color: "#f41515" }}
                          className="mr-1"
                        />
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div
            className="cursor-pointer flex flex-col gap-6 flex-grow"
            onClick={() => navigate(`/post/${post._id}`)}
          >
            <p className="px-4">{post?.content}</p>
            {post.mediaURL && (
              <img
                src={post.mediaURL}
                alt="logo"
                className="rounded-lg max-h-80 w-full object-contain"
              />
            )}
            <hr />
          </div>
          <div className="flex gap-4 flex-grow py-1 items-center justify-evenly font-normal">
            <div
              className="flex items-center gap-1 cursor-pointer"
              onClick={(e) => likeClickHandler()}
            >
              {likedByUser() ? (
                // <FontAwesomeIcon icon={faHeart} style={{ color: "red" }} />
                <FcLike className=" text-2xl" />
              ) : (
                <CiHeart className=" text-2xl" />
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
                <BsBookmark />
              )}
            </div>
            <div
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => !individualpage && navigate(`/post/${post._id}`)}
            >
              <FaRegComment />
            </div>
            <div className="flex items-center gap-1 cursor-pointer">
              <BsShare onClick={() => copyHandler()} />
            </div>
          </div>
          {individualpage && <div>Hello comments</div>}
        </div>
      )}
    </>
  );
}

export default DisplayPost;
