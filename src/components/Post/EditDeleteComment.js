import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, editComment } from "../../actions/post.actions";

const EditDelteComment = ({ comment, res_id }) => {
  const [isAuthor, setIsAuthor] = useState(false);
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("");
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleEdit = (e) => {
    e.preventDefault();

    if (text) {
      dispatch(editComment(res_id, comment.com_id, text));
      setText("");
      setEdit(false);
    }
  };

  const handleDelete = () => {
    dispatch(deleteComment(comment.com_id));
	window.location.reload();
  };

  useEffect(() => {
    const checkAuthor = () => {
      if (userData.usr_id === comment.id_owner) {
        setIsAuthor(true);
      }
    };
    checkAuthor();
  }, [userData, comment]);

  return (
    <div className="edit-comment">
      {isAuthor && !edit ? (
        <>
          <span onClick={() => setEdit(!edit)}>
            <img src="./img/icons/edit.svg" alt="edit-comment" />
            <label
              htmlFor="text"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "right",
                color: "black",
              }}
            >
              Modifier
            </label>
          </span>
        </>
      ) : null}
      {isAuthor && edit && (
        <form action="" onSubmit={handleEdit} className="edit-comment-form">
          <label htmlFor="text" onClick={() => setEdit(!edit)}>
            Fermer
          </label>
          <br />
          <input
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            defaultValue={comment.answers}
          />
          <br />
          <div className="btn">
            <span
              onClick={() => {
                if (window.confirm("Voulez-vous supprimer ce commentaire ?")) {
                  handleDelete();
                }
              }}
            >
              <img src="./img/icons/trash.svg" alt="trash" />
            </span>
          </div>
          <input type="submit" value="Valider modification" />
        </form>
      )}
    </div>
  );
};

export default EditDelteComment;
