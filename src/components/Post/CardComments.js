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
      dispatch(addComment(post.usr_id, userData.usr_id, text, userData.pseudo))
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
            key={comment.id_owner}
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
                  {usersData.map((user) => {
                        if (user.usr_id === comment.id_owner) return user.pseudo;
                        else return null;
                      })
                      .join("")}
                </h3>
                  {comment.id_owner !== userData.usr_id && (
                    <FollowHandler
                      abonnements={comment.com_id}
                      type={"card"}
                    />
                  )}
                </div>
                <span>{timestampParser(comment.created_at)}</span>
              </div>
              <p>{comment.answers}</p>
              <EditDelteComment comment={comment} res_id={post.usr_id} />
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
