import {
  ADD_COMMENT,
  DELETE_COMMENT,
  DELETE_POST,
  EDIT_COMMENT,
  GET_POSTS,
  LIKE_POST,
  UNLIKE_POST,
  UPDATE_POST,
} from "../actions/post.actions";

const initialState = {};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return action.payload;
    case LIKE_POST:
      return state.map((post) => {
        if (post.usr_id === action.payload.res_id) {
          return {
            ...post,
            likers: [action.payload.usr_id, ...post.likers],
          };
        }
        return post;
      });
    case UNLIKE_POST:
      return state.map((post) => {
        if (post.usr_id === action.payload.res_Id) {
          return {
            ...post,
            likers: post.likers.filter((id) => id !== action.payload.usr_id),
          };
        }
        return post;
      });
    case UPDATE_POST:
      return state.map((post) => {
        if (post.usr_id === action.payload.res_Id) {
          return {
            ...post,
            message: action.payload.message,
          };
        } else return post;
      });
    case DELETE_POST:
      return state.filter((post) => post.usr_id !== action.payload.res_id);
    case ADD_COMMENT:
      return state.filter((post) => post.usr_id !== action.payload.res_id);
	  case DELETE_COMMENT:
		return state.filter((comment) => comment.com_id !== action.payload.com_id);
	  case EDIT_COMMENT:
      return state.map((post) => {
        if (post.usr_id === action.payload.res_Id) {
          return {
            ...post,
            comments: post.comments.map((comment) => {
              if (comment.usr_id === action.payload.commentId) {
                return {
                  ...comment,
                  text: action.payload.text,
                };
              } else {
                return comment;
              }
            }),
          };
        } else {
          return post;
        }
      });
     default:
       return state;
  }
}
