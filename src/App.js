import React from "react";
import "@/less/main.less";
import { authContext, useAuthProvider } from "@/provider/auth";

import Login from "@/views/Login";
import Home from "@/views/Home";
import About from "@/views/About";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const MainStacks = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
      </Switch>
    </Router>
  );
};
function App() {
  const auth = useAuthProvider();
  return (
    <authContext.Provider value={auth}>
      {auth.state.token ? <MainStacks /> : <Login />}
    </authContext.Provider>
  );
}

export default App;
