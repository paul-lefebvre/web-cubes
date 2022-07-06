import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../../actions/user.actions";
import { isEmpty } from "../Utils";

const FollowHandler = ({ idToFollow, type }) => {
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
  let [isFollowed, setIsFollowed] = useState(false);
  const dispatch = useDispatch();

  //console.log("id_suivi" + idToFollow + isFollowed);

  const handleFollow = () => {
    dispatch(followUser(userData.usr_id, idToFollow));
    setIsFollowed(true);
  };

  const handleUnfollow = () => {
    dispatch(unfollowUser(userData.usr_id, idToFollow));
    setIsFollowed(false);
  };

  

  //   const getMesAbonnements = () => {
  // 	console.log("idTofolow" + idToFollow)
  //       for (let i = 0; i < userData.abonnements.length; i++) {
  // 	 console.log("mes id suivis" + userData.abonnements[i].followed_id )
  // 	//var obj = new Compteur();
  //         if (idToFollow === userData.abonnements[i].followed_id) {
  // 			console.log("mes id suivis" + userData.abonnements[i].followed_id )
  // 			setIsFollowed(true);
  //         } else setIsFollowed(false)
  //       }
  //   };
  function Compteur() {
	this.id = 0;
	this.i = 0;
  }

  Compteur.prototype.ajouter = function (tableau) {
	tableau.forEach(function (element) {
	  this.id += element;
	  ++this.i;
	}, this);
  };

  useEffect(() => {
    let i = 0 ;
    i++;
	
    //var obj = new Compteur();
    console.log("idTofolow" + idToFollow);
    console.log("mes id suivis" + userData.abonnements[i].followed_id);

    if (idToFollow === userData.abonnements[i].followed_id) {
      setIsFollowed(true);
    } else setIsFollowed(false);
    //getMesAbonnements();
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
