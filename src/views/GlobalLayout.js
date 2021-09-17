import React, { useEffect } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { Layout } from "antd";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import PageHeader from "@/components/PageHeader";
import RouterTab from "@/components/RouterTab";
import { useSelector, useDispatch } from "react-redux";
import { selectAuth } from "@/store/slice/auth";
import { setModalDiscSpan } from "@/store/slice/layout";
import Order from "@/views/Order";
import routes from "@/router";
import { setRouterTabs } from "@/store/slice/routerTab";
import { selectTransfer, getTransfers } from "@/store/slice/transfer";
import { selectApp, getApps } from "@/store/slice/app";
import { useList } from "@/utils/hook";
import TransferAlertMp3 from "@/assets/dongdong.mp3";
const { Content, Footer } = Layout;
const audio = new Audio(TransferAlertMp3);

const GlobalLayout = () => {
  const { pathname } = useLocation();
  const { user } = useSelector(selectAuth);
  const { meta } = useSelector(selectTransfer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setRouterTabs(pathname));
  });
  useEffect(() => {
    dispatch(getTransfers({ status: 2 }));
    // eslint-disable-next-line
  }, []);

  let PlayTransferAlertMp3Interval;
  const PlayTransferAlertMp3 = () => {
    audio.play().catch(err => {
      console.log(err);
    });
    PlayTransferAlertMp3Interval = setInterval(function () {
      audio.currentTime = 0;
      audio.play().catch(err => {
        console.log(err);
      });
    }, 5000);
  };
  useEffect(() => {
    meta.total > 0 && PlayTransferAlertMp3();
    meta.total === 0 && clearInterval(PlayTransferAlertMp3Interval);
    // eslint-disable-next-line
  }, [meta.total]);

  useEffect(() => {
    const handleWindowResize = e => {
      dispatch(setModalDiscSpan(e.target.innerWidth));
    };
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });
  const {
    res: { list },
  } = useList(getApps, selectApp, { page: 1, per_page: 10 });
  const appRoutes = list.map(i => {
    return {
      path: `/Order${i.id}`,
      name: `/Order${i.id}`,
      component: () => <Order params={{ app_id: i.id }} />,
      displayName: `${i.name}`,
    };
  });
  const renderRoutes = [...routes, ...appRoutes];
  return (
    <Route path="/">
      {user !== null ? (
        <Layout className="global-layout">
          <Sidebar routes={renderRoutes} />
          <Layout className="container">
            <div className="fixed-top">
              <Header />
              <RouterTab routes={renderRoutes} />
            </div>
            <Content className="main">
              <PageHeader routes={renderRoutes} />
              <Switch>
                {renderRoutes.map(i => (
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
