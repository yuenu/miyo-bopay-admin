import React from "react";
import "@/less/main.less";
import { authContext, useAuthProvider } from "@/provider/auth";

import Login from "@/views/Login";
import GlobalLayout from "@/views/GlobalLayout";

function App() {
  const auth = useAuthProvider();
  return (
    <authContext.Provider value={auth}>
      {auth.state.user.token ? <GlobalLayout /> : <Login />}
    </authContext.Provider>
  );
}

export default App;
