import React, { useEffect } from "react";
import { Router, Switch, Route } from "react-router-dom";
import GlobalLayout from "./GlobalLayout";
import Login from "./Login";
import { useSelector } from "react-redux";
import { selectAuth } from "@/store/slice/auth";
import { connectSocket, pingTimer } from "@/utils/ws";
import history from "@/utils/history";
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
    <Router history={history}>
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
