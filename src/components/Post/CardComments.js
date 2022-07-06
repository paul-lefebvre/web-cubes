import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getPosts } from "../../actions/post.actions";
import FollowHandler from "../Profil/FollowHandler";
import { isEmpty, timestampParser } from "../Utils";
import EditDelteComment from "./EditDeleteComment";

const CardComments = ({ post }) => {
  const [text, setText] = useState("");
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleComment = (e) => {
    e.preventDefault();

    if (text) {
      const data = new FormData();
      data.append("id_owner", userData.usr_id);
      data.append("answers", text);
      data.append("res_id", post.res_id);

      dispatch(addComment(post.res_id, data))
        .then(() => dispatch(getPosts()))
        .then(() => setText(""));
    }
  };

  return (
    <div className="comments-container">
      {post.comments.map((comment) => {
        return (
          <div
            className={
              comment.id_owner === userData.usr_id
                ? "comment-container client"
                : "comment-container"
            }
            key={comment.com_id}
          >
            <div className="left-part">
              <img
                src={
                  !isEmpty(usersData[0]) &&
                  usersData
                    .map((user) => {
                      if (user.usr_id === comment.id_owner)
                        return `${
                          process.env.REACT_APP_API_URL +
                          "public/upload/images/avatar/" +
                          user.avatar_img
                        }`;
                      else return null;
                    })
                    .join("")
                }
                alt="commenter-pic"
              />
            </div>
            <div className="right-part">
              <div className="comment-header">
                <div className="pseudo">
                  <h3>
                    {usersData
                      .map((user) => {
                        if (user.usr_id === comment.id_owner)
                          return user.pseudo;
                        else return null;
                      })
                      .join("")}
                  </h3>
                  {comment.id_owner !== userData.usr_id && (
                    <FollowHandler
                      idToFollow={comment.id_owner}
                      type={"card"}
                    />
                  )}
                </div>
                <span>{timestampParser(comment.created_at)}</span>
              </div>
              <p>{comment.answers}</p>
              <EditDelteComment comment={comment} res_id={post.res_id} />
            </div>
          </div>
        );
      })}
      {userData.usr_id && (
        <form action="" onSubmit={handleComment} className="comment-form">
          <input
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder="Laisser un commentaire"
          />
          <br />
          <input type="submit" value="Envoyer" />
        </form>
      )}
    </div>
  );
};

export default CardComments;
