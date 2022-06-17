import React, { useContext } from "react";
import LeftNav from "../components/LeftNav";
import Trends from "../components/Trends";
import AllBio from "../components/AllBio";
import FriendsHint from "../components/Profil/FriendsHint";
import { UidContext } from "../components/AppContext";

const Perso = ({ post }) => {
  const uid = useContext(UidContext);

  return (
    <div className="home">
      <LeftNav />
      <div className="profil-page" style={{margin: "0px"}}>        
          <h1 style={{marginTop: "10px", marginBottom: "20px"}}>
		  Les petites bio de tout le monde...</h1>       
        <AllBio />
      </div>
      <div className="right-side">
        <div className="right-side-container">
          <div className="wrapper">
            <Trends />
            {uid && <FriendsHint />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perso;
