import React from "react";
import axios from "axios";

const Logout = () => {
  const remove = () => {
    if (window !== "undefined") {
      localStorage.clear();
    }
  };

  const logout = async () => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/users/logout`,
      withCredentials: false,
    })
      .then(() => remove())
      .catch((err) => console.log(err));

    window.location = "/";
  };

  return (
    <li onClick={logout} style={{display:"flex"}}>
		<h5 style={{color:"white", marginRight:"10px"}}>Se déconnecter</h5>
      <img src="./img/icons/logout.svg" alt="logout" />
    </li>
  );
};

export default Logout;
