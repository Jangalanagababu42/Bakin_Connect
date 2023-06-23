import React, { createContext, useContext, useEffect, useReducer } from "react";
import {
  AddBookMarkService,
  AddPostService,
  DislikeService,
  LikeService,
  PostService,
  RemoveBookMarkService,
  getAllBookMarksService,
} from "../services/PostService";
import {
  POST_ACTIONS,
  PostReducer,
  initialPostState,
} from "../reducers/PostReducer";
import { useAuth } from "./AuthContext";

const PostContext = createContext();

function PostProvider({ children }) {
  const { authToken, authUser, setAuthUser } = useAuth();
  const [postState, postDispatch] = useReducer(PostReducer, initialPostState);

  const getAllPosts = async () => {
    const response = await PostService();
    const {
      data: { posts },
    } = response;

    postDispatch({ type: POST_ACTIONS.getposts, payload: { posts: posts } });
  };
  const addPostHandler = async (content) => {
    const response = await AddPostService(authToken, content, authUser._id);

    const {
      data: { posts },
    } = response;
    postDispatch({ type: POST_ACTIONS.addpost, payload: { posts: posts } });
  };
  const getAllBookMarks = async () => {
    const response = await getAllBookMarksService(authToken);

    const {
      data: { bookmarks },
    } = response;

    postDispatch({
      type: POST_ACTIONS.getbookmarks,
      payload: { bookmarks: bookmarks },
    });
  };

  const addBookmarkHandler = async (postId) => {
    const response = await AddBookMarkService(authToken, postId);

    const {
      data: { bookmarks },
    } = response;

    postDispatch({
      type: POST_ACTIONS.addbookmark,
      payload: { bookmarks: bookmarks },
    });
    setAuthUser((prev) => ({ ...prev, bookmarks: bookmarks }));
  };

  const removePostFromBookmarkHandler = async (postId) => {
    const response = await RemoveBookMarkService(authToken, postId);

    const {
      data: { bookmarks },
    } = response;

    postDispatch({
      type: POST_ACTIONS.removebookmark,
      payload: { bookmarks: bookmarks },
    });
    setAuthUser((prev) => ({ ...prev, bookmarks: bookmarks }));
  };

  const LikeHandler = async (postId) => {
    const response = await LikeService(authToken, postId);

    const {
      data: { posts },
    } = response;

    postDispatch({ type: POST_ACTIONS.like, payload: { posts: posts } });
  };
  const DisLikeHandler = async (postId) => {
    const response = await DislikeService(authToken, postId);

    const {
      data: { posts },
    } = response;

    postDispatch({ type: POST_ACTIONS.dislike, payload: { posts: posts } });
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <PostContext.Provider
      value={{
        postState,
        postDispatch,
        addPostHandler,
        addBookmarkHandler,
        getAllBookMarks,
        removePostFromBookmarkHandler,
        LikeHandler,
        DisLikeHandler,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
const usePost = () => useContext(PostContext);
export { PostProvider, usePost };
