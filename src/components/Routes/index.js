import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Home from "../../pages/Home";
import Profil from "../../pages/Profil";
import Trending from "../../pages/Trending";
import Perso from "../../pages/Perso";
import Navbar from "../Navbar";


const index = () => {
  return (
    <Router>
      <div>        
          <Navbar />       
        <Switch>			
          <Route path="/" exact component={Home} />
          <Route path="/profil" exact component={Profil} />
          <Route path="/trending" exact component={Trending} />
		  <Route path="/perso" exact component={Perso} />
          <Redirect to="/" />		  
        </Switch>
      </div>
    </Router>
  );
};

export default index;
