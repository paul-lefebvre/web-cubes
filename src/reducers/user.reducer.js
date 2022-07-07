import {
  FOLLOW_USER,
  GET_USER,
  UNFOLLOW_USER,
  UPDATE_BIO,
  UPLOAD_PICTURE,
} from "../actions/user.actions";

const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload;
    case UPLOAD_PICTURE:
      return {
        ...state,
        picture: action.payload,
      };
    case UPDATE_BIO:
      return {
        ...state,
        bio: action.payload,
      };
    case FOLLOW_USER:
      //console.log(state.followed);
      return {
        ...state,
        abonnements: [...state.abonnements, action.payload.abonnements ],
        //followed: action.payload.followed
      };
    case UNFOLLOW_USER:
      return {
        ...state,
        abonnements: state.abonnements.filter(
          (id) => id !== action.payload.followed_id
        ),
      };

    default:
      return state;
  }
}
