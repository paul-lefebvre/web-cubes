import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { UidContext } from "./components/AppContext";
import Routes from "./components/Routes";

function App() {
	const [uid, setUid] = useState(null);
	const dispatch = useDispatch();


  return (
    <UidContext.Provider value={uid}>
		<Routes/>
	</UidContext.Provider>
  );
}

export default App;
