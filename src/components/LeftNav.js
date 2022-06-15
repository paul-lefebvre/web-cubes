import React from "react";
import { NavLink } from "react-router-dom";

const LeftNav = () => {
  return (
    <div className="left-nav-container">
      <div className="icons">
        <div className="icons-bis">
          <NavLink to="/" exact activeClassName="active-left-nav">
            <img src="./img/icons/home.svg" alt="home" />
          </NavLink>
          <br />
          <NavLink to="/trending" exact activeClassName="active-left-nav">
            <img src="./img/icons/trending.png" alt="trending" style={{width:"35px", marginTop:"5px", marginLeft:"5px"}} />
          </NavLink>
          <br />
          <NavLink to="/profil" exact activeClassName="active-left-nav">
            <img src="./img/icons/user.svg" alt="user" />
          </NavLink>
          <br />
        </div>
      </div>
    </div>
  );
};

export default LeftNav;
