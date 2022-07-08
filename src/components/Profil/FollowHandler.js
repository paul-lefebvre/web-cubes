import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../../actions/user.actions";
import { isEmpty } from "../Utils";

const FollowHandler = ({ idToFollow, type }) => {
  const userData = useSelector((state) => state.userReducer);
  let [isFollowed, setIsFollowed] = useState(false);
  const dispatch = useDispatch();

  const handleFollow = () => {
    dispatch(followUser(userData.usr_id, idToFollow));
    setIsFollowed(true);
	window.location.reload();
  };

  const handleUnfollow = () => {
    dispatch(unfollowUser(userData.usr_id, idToFollow ));
    setIsFollowed(false);
	window.location.reload();
  };

  useEffect(() => {
     userData.abonnements?.forEach(async(abonnement, index) => {
       if (idToFollow === abonnement.followed_id) {
       setIsFollowed(true);
      }
    });
  }, [userData, idToFollow]);

  return (
    <>
      {isFollowed && (
        <span onClick={handleUnfollow}>
          {type === "suggestion" && (
            <button className="unfollow-btn">Abonné</button>
          )}
          {type === "card" && (
            <img src="./img/icons/checked.svg" alt="checked" />
          )}
        </span>
      )}
      {isFollowed === false && !isEmpty(userData) && (
        <span onClick={handleFollow}>
          {type === "suggestion" && <button>Suivre</button>}
          {type === "card" && <img src="./img/icons/check.svg" alt="check" />}
        </span>
      )}
    </>
  );
};

export default FollowHandler;
