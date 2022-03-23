import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getTrends } from "../actions/post.actions";
import { isEmpty } from "./Utils";

const Trends = () => {
  const posts = useSelector((state) => state.allPostsReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const trendList = useSelector((state) => state.trendingReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isEmpty(posts[0])) {
      const postsArr = Object.keys(posts).map((i) => posts[i]);
      let sortedArray = postsArr.sort((a, b) => {
        return b.nb_likes.length - a.nb_likes.length;
      });
      sortedArray.length = 3;
      dispatch(getTrends(sortedArray));
    }
  }, [posts, dispatch]);

  return (
    <div className="trending-container">
      <h4>Trending</h4>
      <NavLink exact to="/trending">
        <ul>
          {trendList.length &&
            trendList.map((post) => {
              return (
                <li key={post.usr_id}>
                  <div>
                    {post.picture && <img src={post.picture} alt="post-pic" />}
                    {post.video && (
                      <iframe
                        src={post.video}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={post.usr_id}
                      ></iframe>
                    )}
                    {isEmpty(post.picture) && isEmpty(post.video) && (
                      <img
                        src={
                          !isEmpty(usersData[0]) &&
                          usersData
                            .map((user) => {
                              for (let i = 0; i < usersData.length; i++) {
                                if (user.usr_id === post.res_id)
                                  return `${
                                    process.env.REACT_APP_API_URL +
                                    "public/upload/images/avatar/" +
                                    usersData[i].avatar_img
                                  }`;
                                else return null;
                              }
                            })
                            .join("")
                        }
                        alt="profil-pic"
                      />
                    )}
                  </div>
                  <div className="trend-content">
                    <p>{post.answers}</p>
                    <span>Lire</span>
                  </div>
                </li>
              );
            })}
        </ul>
      </NavLink>
    </div>
  );
};

export default Trends;
