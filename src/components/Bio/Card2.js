import React, { useEffect, useState } from "react";
import { useSelector} from "react-redux";
import { isEmpty, birthParser } from "../Utils";

const Card2 = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const usersData = useSelector((state) => state.usersReducer);

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);

  return (
    <li className="card-container" key={post.usr_id}>
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <>
          <div className="card-left">
            <img
              src={
                !isEmpty(usersData[0]) &&
                usersData
                  .map((user) => {
                    if (user.usr_id === post.usr_id)
                      return `${
                        process.env.REACT_APP_API_URL +
                        "public/upload/images/avatar/" +
                        user.avatar_img
                      }`;
                    else return null;
                  })
                  .join("")
              }
              alt="poster-pic"
            />
          </div>
          <div className="card-right">
            <div className="card-header" style={{ marginTop: "15px" }}>
              <div className="pseudo">
                <h3>
                  {!isEmpty(usersData[0]) &&
                    usersData
                      .map((user) => {
                        if (user.usr_id === post.usr_id)
                          return user.pseudo + " :";
                        else return null;
                      })
                      .join("")}
                </h3>
              </div>
              <span>
                {!isEmpty(usersData[0]) &&
                  usersData
                    .map((user) => {
                      if (user.usr_id === post.usr_id) return "Naissance : " + birthParser(user.birth_date);
                      else return null;
                    })
                    .join("")}
              </span>
            </div>
            <p>
              {!isEmpty(usersData[0]) &&
                usersData
                  .map((user) => {
                    if (user.usr_id === post.usr_id) return user.bio;
                    else return null;
                  })
                  .join("")}
            </p>
          </div>
        </>
      )}
    </li>
  );
};

export default Card2;
