import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Layout } from "antd";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useSelector } from "react-redux";
import { selectAuth } from "@/store/slice/auth";
import routes from "@/router";

const { Content, Footer } = Layout;
const GlobalLayout = () => {
  const { user } = useSelector(selectAuth);
  const getComponent = name => {
    try {
      let cpn = require(`@/views/${name}`);
      return cpn.default();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Route path="/">
      {user.username ? (
        <Layout className="global-layout">
          <Sidebar />
          <Layout>
            <Header />
            <Content className="main">
              <Switch>
                {routes.map(i => (
                  <Route exact={i.exact} path={i.path} key={i.path}>
                    {getComponent(i.component)}
                  </Route>
                ))}
              </Switch>
            </Content>
            <Footer style={{ textAlign: "center" }}>©2021 Miyo</Footer>
          </Layout>
        </Layout>
      ) : (
        <Redirect to={{ pathname: "/Login" }} />
      )}
    </Route>
  );
};
export default GlobalLayout;
