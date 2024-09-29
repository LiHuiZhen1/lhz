import { useState } from "react";
import "./App.css";
import Login from "./login";
import Register from "./register";

function App() {
  const [flag, setFlag] = useState(1);
  const changeFlag = (childValue) => {
    setFlag(childValue);
  }

  return <>{flag == 1 ?  <Register onChangeFlag={changeFlag} /> : <Login onChangeFlag={changeFlag} /> }</>;
}

export default App;
