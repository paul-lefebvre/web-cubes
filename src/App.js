import React, { useEffect, useState } from "react";
import Routes from "./components/Routes";
import { UidContext } from "./components/AppContext";
import axios from "axios";
import { getUser } from "./actions/user.actions";
import { useDispatch } from "react-redux";

const App = () => {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      const token = localStorage.getItem("token");
      const uid = JSON.parse(localStorage.getItem('User')).usr_id;
	  
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}api/users/me/${uid}`,
        withCredentials: false,
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          setUid(uid);
          console.log(uid);
        })
        .catch((err) => console.log("No token"));
    };
    fetchToken();

    if (uid) dispatch(getUser(uid));
  }, [uid, dispatch]);

  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
};

export default App;
