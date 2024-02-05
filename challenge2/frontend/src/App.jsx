import { useState } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import UserContext from "./context/user";

function App() {
  const [accessToken, setAccessToken] = useState("");
  return (
    <>
      <UserContext.Provider value={{ accessToken, setAccessToken }}>
        {accessToken ? <Dashboard /> : <Login />}
      </UserContext.Provider>
    </>
  );
}

export default App;
