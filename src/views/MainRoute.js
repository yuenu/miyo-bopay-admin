import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GlobalLayout from "./GlobalLayout";
import Login from "./Login";
import { useSelector } from "react-redux";
import { selectAuth } from "@/store/slice/auth";
import { connectSocket, pingTimer } from "@/utils/ws";
const MainRoute = () => {
  const { user } = useSelector(selectAuth);
  useEffect(() => {
    user !== null && connectSocket();
    user !== null || clearInterval(pingTimer);
    return () => {
      clearInterval(pingTimer);
    };
  }, [user]);
  return (
    <Router>
      <Switch>
        <Route path="/Login">
          <Login />
        </Route>
        <GlobalLayout />
      </Switch>
    </Router>
  );
};
export default MainRoute;
