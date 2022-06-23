import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import Popup from "reactjs-popup";

const LeftNav = () => {
  const uid = useContext(UidContext);

  return (
    <div className="left-nav-container">
      <div className="icons">
        <div className="icons-bis">
          <NavLink to="/" exact activeClassName="active-left-nav">
            <img src="./img/icons/home.svg" alt="home" />
          </NavLink>
          <br />
          <NavLink to="/trending" exact activeClassName="active-left-nav">
            <img
              src="./img/icons/trending.png"
              alt="trending"
              style={{ width: "35px", marginTop: "5px", marginLeft: "5px" }}
            />
          </NavLink>
          <br />
          {uid ? (
            <NavLink to="/perso" exact activeClassName="active-left-nav">
              <img
                src="./img/icons/life.png"
                alt="life"
                style={{ width: "45px" }}
              />
            </NavLink>
          ) : (
            <Popup
              trigger={
                <img
                  src="./img/icons/life.png"
                  style={{ width: "45px" }}
                  alt="like"
                />
              }
              closeOnDocumentClick
            >
              <div>
                Connectez-vous pour voir les petites bio de tout le monde !
              </div>
            </Popup>
          )}
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
