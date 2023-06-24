import axios from "axios";

export const PostService = () => {
  return axios.get(`/api/posts`);
};

export const AddPostService = (token, content, id) => {
  const body = { postData: { content, userId: id } };
  const config = { headers: { authorization: `${token}` } };
  return axios.post(`/api/posts`, body, config);
};

export const getAllBookMarksService = (token) => {
  const config = { headers: { authorization: `${token}` } };
  return axios.get(`/api/users/bookmark`, config);
};

export const AddBookMarkService = (token, postId) => {
  const config = { headers: { authorization: `${token}` } };
  return axios.post(`/api/users/bookmark/${postId}`, {}, config);
};

export const RemoveBookMarkService = (token, postId) => {
  const config = { headers: { authorization: `${token}` } };
  return axios.post(`/api/users/remove-bookmark/${postId}`, {}, config);
};

export const LikeService = (token, postId) => {
  const config = { headers: { authorization: `${token}` } };
  return axios.post(`/api/posts/like/${postId}`, {}, config);
};

export const DislikeService = (token, postId) => {
  const config = { headers: { authorization: `${token}` } };
  return axios.post(`/api/posts/dislike/${postId}`, {}, config);
};
export const FollowService = (token, followId) => {
  const config = { headers: { authorization: `${token}` } };
  return axios.post(`/api/users/follow/${followId}`, {}, config);
};

export const UnFollowService = (token, followId) => {
  const config = { headers: { authorization: `${token}` } };
  return axios.post(`/api/users/unfollow/${followId}`, {}, config);
};
