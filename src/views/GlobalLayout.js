import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout } from "antd";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import routes from "@/router";
const { Content, Footer } = Layout;
const GlobalLayout = () => {
  const getComponent = name => {
    try {
      let cpn = require(`@/views/${name}`);
      return cpn.default();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Router>
      <Layout className="global-layout">
        <Sidebar />
        <Layout>
          <Header />
          <Content>
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
    </Router>
  );
};
export default GlobalLayout;
