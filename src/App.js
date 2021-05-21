import React from "react";
import "@/less/main.less";
import { authContext, useAuthProvider } from "@/provider/auth";

import Login from "@/views/Login";
import GlobalLayout from "@/views/GlobalLayout";
import { Provider } from "react-redux";
import store from "@/store";

function App() {
  const auth = useAuthProvider();
  return (
    <Provider store={store}>
      <authContext.Provider value={auth}>
        {auth.state.user.token ? <GlobalLayout /> : <Login />}
      </authContext.Provider>
    </Provider>
  );
}

export default App;
