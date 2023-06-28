export const POST_ACTIONS = {
  getposts: "get_posts",
  addpost: "add_post",
  getbookmarks: "get_bookmarks",
  addbookmark: "add_bookmark",
  removebookmark: "remove_bookmark",
  like: "like",
  dislike: "dislike",
  delete: "delete",
};

export const initialPostState = {
  posts: [],
  bookmarks: [],
};

export function PostReducer(state, action) {
  switch (action.type) {
    case POST_ACTIONS.getposts:
      return { ...state, posts: action.payload.posts };
    case POST_ACTIONS.addpost:
      return { ...state, posts: action.payload.posts };
    case POST_ACTIONS.getbookmarks:
      return { ...state, bookmarks: action.payload.bookmarks };
    case POST_ACTIONS.addbookmark:
      return { ...state, bookmarks: action.payload.bookmarks };
    case POST_ACTIONS.removebookmark:
      return { ...state, bookmarks: action.payload.bookmarks };
    case POST_ACTIONS.like:
      return { ...state, posts: action.payload.posts };
    case POST_ACTIONS.dislike:
      return { ...state, posts: action.payload.posts };
    case POST_ACTIONS.delete:
      return { ...state, posts: action.payload.posts };
    default:
      return state;
  }
}
