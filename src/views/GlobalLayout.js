import React, { useEffect } from "react";

import { Layout, Tabs } from "antd";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { selectTab, setActiveKey, removeTab } from "@/store/slice/tab";

const { TabPane } = Tabs;
const { Content, Footer } = Layout;
const GlobalLayout = () => {
  const dispatch = useDispatch();
  const { tabs, activeKey } = useSelector(selectTab);
  const handleTabChange = key => {
    dispatch(setActiveKey(key));
  };
  const handleRemoveTab = key => {
    dispatch(removeTab(key));
  };
  useEffect(() => {
    dispatch(setActiveKey(tabs.length > 0 ? tabs[tabs.length - 1].name : ""));
  }, [tabs, dispatch]);
  return (
    <Layout className="global-layout">
      <Sidebar />
      <Layout>
        <Header />
        <Content>
          <Tabs
            className="mt-1"
            type="editable-card"
            onChange={handleTabChange}
            activeKey={activeKey}
            onEdit={handleRemoveTab}
          >
            {tabs.map(i => (
              <TabPane
                className="main"
                key={i.name}
                tab={i.name}
                closable={true}
              >
                {i.name}
              </TabPane>
            ))}
          </Tabs>
        </Content>
        <Footer style={{ textAlign: "center" }}>©2021 Miyo</Footer>
      </Layout>
    </Layout>
  );
};
export default GlobalLayout;
