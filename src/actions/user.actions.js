import axios from "axios";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_BIO = "UPDATE_BIO";
export const FOLLOW_USER = "FOLLOW_USER";
export const UNFOLLOW_USER = "UNFOLLOW_USER";

export const GET_USER_ERRORS = "GET_USER_ERRORS";

export const getUser = (uid) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/users/${uid}`)
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const uploadPicture = (data, id) => {
  return (dispatch) => {
    return axios
	.post(`${process.env.REACT_APP_API_URL}api/users/${id}/upload`, data)
      .then((res) => {
        if (res.data.errors) {
          dispatch({ type: GET_USER_ERRORS, payload: res.data.errors });
        } else {
          dispatch({ type: GET_USER_ERRORS, payload: "" });
          return axios
            .get(`${process.env.REACT_APP_API_URL}api/users/${id}`)
            .then((res) => {
              dispatch({ type: UPLOAD_PICTURE, payload: res.data.avatar_img });
            });
        }
      })
      .catch((err) => console.log(err));
  };
};

export const updateBio = (userId, bio) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
      data: { bio },
    })
      .then((res) => {
        dispatch({ type: UPDATE_BIO, payload: bio });
      })
      .catch((err) => console.log(err));
  };
};

export const followUser = (follower_id, followed_id) => {
	return (dispatch) => {
	  return axios({
		method: "post",
		url: `${process.env.REACT_APP_API_URL}api/relations/`,
		data: { follower_id, followed_id },
	  })
		.then((res) => {
		  dispatch({ type: FOLLOW_USER, payload: { followed_id } });
		})
		.catch((err) => console.log(err));
	};
  };

export const unfollowUser = ( followed_id) => {
  return (dispatch) => {
	return axios
      .get(`${process.env.REACT_APP_API_URL}api/relations`)
      .then((res) => {
		if (res.data.errors) {
			dispatch({ type: GET_USER_ERRORS, payload: res.data.errors });
		  } else {
			dispatch({ type: GET_USER_ERRORS, payload: "" });
			console.log(res.data.rel_id)
			return axios
			
      .put(`${process.env.REACT_APP_API_URL}api/relations/`+ res.data.rel_id)
      .then((res) => {
        dispatch({ type: UNFOLLOW_USER, payload: {followed_id } });
      })
      .catch((err) => console.log(err));
	}})
  }
};

