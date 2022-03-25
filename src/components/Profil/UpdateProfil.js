import React, { useState } from "react";
import LeftNav from "../LeftNav";
import { useDispatch, useSelector } from "react-redux";
import UploadImg from "./UploadImg";
import { updateBio } from "../../actions/user.actions";
import { dateParser } from "../Utils";
import FollowHandler from "./FollowHandler";

const UpdateProfil = () => {
  const [bio, setBio] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const error = useSelector((state) => state.errorReducer.userError);
  const dispatch = useDispatch();
  const [followedPopup, setfollowedPopup] = useState(false);
  const [followersPopup, setFollowersPopup] = useState(false);

  const handleUpdate = () => {
    dispatch(updateBio(userData.usr_id, bio));
    setUpdateForm(false);
  };

  return (
    <div className="profil-container">
      <LeftNav />
      <h1>Profil de {userData.firstname}</h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Photo de profil</h3>
          <img src={process.env.REACT_APP_API_URL + "public/upload/images/avatar/" + userData.avatar_img} alt="user-pic" />
          <UploadImg />
          <p>{error.maxSize}</p>
          <p>{error.format}</p>
        </div>
        <div className="right-part">
          <div className="bio-update">
            <h3>Bio</h3>
            {updateForm === false && (
              <>
                <p onClick={() => setUpdateForm(!updateForm)}>{userData.bio}</p>
                <button onClick={() => setUpdateForm(!updateForm)}>
                  Modifier bio
                </button>
              </>
            )}
            {updateForm && (
              <>
                <textarea
                  type="text"
                  defaultValue={userData.bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
                <button onClick={handleUpdate}>
                  Valider les modifications
                </button>
              </>
            )}
          </div>
          <h4>Membre depuis le : {dateParser(userData.created_at)}</h4>
          <h5 onClick={() => setfollowedPopup(true)}>
            Abonnements : {userData.abonnements ? userData.abonnements.length : ""}
          </h5>
          <h5 onClick={() => setFollowersPopup(true)}>
            Abonnés : {userData.abonnes ? userData.abonnes.length : ""}
          </h5>
        </div>
      </div>
      {followedPopup && (
        <div className="popup-profil-container">
          <div className="modal">
            <h3>Abonnements</h3>
            <span className="cross" onClick={() => setfollowedPopup(false)}>
              &#10005;
            </span>
            <ul>
              {usersData.map((user) => {
                for (let i = 0; i < userData.abonnements.length; i++) {
                 if (user.usr_id === userData.abonnements[i].followed_id) {
                    return (
                      <li key={user.usr_id}>
                        <img src={process.env.REACT_APP_API_URL + "public/upload/images/avatar/" + user.avatar_img} alt="user-pic" />
                        <h4>{user.pseudo}</h4>
                        <div className="follow-handler">
                          <FollowHandler
                            followed_id={user.usr_id}
                            type={"suggestion"}
                          />
                        </div>
                      </li>
                    );
                  }
                }
                return null;
              })}
            </ul>
          </div>
        </div>
      )}
      {followersPopup && (
        <div className="popup-profil-container">
          <div className="modal">
            <h3>Abonnés</h3>
            <span className="cross" onClick={() => setFollowersPopup(false)}>
              &#10005;
            </span>
            <ul>
              {usersData.map((user) => {
                for (let i = 0; i < userData.abonnes.length; i++) {
                  if (user.usr_id === userData.abonnes[i].follower_id) {
                    return (
                      <li key={user.usr_id}>
                        <img src={process.env.REACT_APP_API_URL + "public/upload/images/avatar/" + user.avatar_img} alt="user-pic" />
                        <h4>{user.pseudo}</h4>
                        <div className="follow-handler">
                          <FollowHandler
                            followed_id={user.usr_id}
                            type={"suggestion"}
                          />
                        </div>
                      </li>
                    );
                  }
                }
                return null;
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateProfil;
