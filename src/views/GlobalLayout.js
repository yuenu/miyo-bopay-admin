import { Layout } from "antd";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import routes from "@/router";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const { Content, Footer } = Layout;

const GlobalLayout = () => {
  return (
    <Router>
      <Layout className="global-layout">
        <Sidebar />
        <Layout>
          <Header />
          <Content className="main">
            <Switch>
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  children={<route.component />}
                />
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
