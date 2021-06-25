import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Layout } from "antd";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import PageHeader from "@/components/PageHeader";
import RouterTab from "@/components/RouterTab";
import { useSelector, useDispatch } from "react-redux";
import { selectAuth } from "@/store/slice/auth";
import { setModalDiscSpan } from "@/store/slice/layout";
import routes from "@/router";
const { Content, Footer } = Layout;

const GlobalLayout = () => {
  const { user } = useSelector(selectAuth);
  const dispatch = useDispatch();
  useEffect(() => {
    const handleWindowResize = e => {
      dispatch(setModalDiscSpan(e.target.innerWidth));
    };
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });
  return (
    <Route path="/">
      {user !== null ? (
        <Layout className="global-layout">
          <Sidebar />
          <Layout>
            <Header />
            <Content className="main">
              <RouterTab />
              <PageHeader />
              <Switch>
                {routes.map(i => (
                  <Route
                    exact={i.exact}
                    path={i.path}
                    key={i.path}
                    children={<i.component />}
                  />
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
