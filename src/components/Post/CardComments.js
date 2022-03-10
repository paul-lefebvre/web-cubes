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
              comment.commenterId === userData.usr_id
                ? "comment-container client"
                : "comment-container"
            }
            key={comment.usr_id}
          >
            <div className="left-part">
              <img
                src={
                  !isEmpty(usersData[0]) &&
                  usersData
                    .map((user) => {
                      if (user.usr_id === comment.commenterId)
                        return user.picture;
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
                  <h3>{comment.commenterPseudo}</h3>
                  {comment.commenterId !== userData.usr_id && (
                    <FollowHandler
                      idToFollow={comment.commenterId}
                      type={"card"}
                    />
                  )}
                </div>
                <span>{timestampParser(comment.timestamp)}</span>
              </div>
              <p>{comment.text}</p>
              <EditDelteComment comment={comment} postId={post.usr_id} />
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
