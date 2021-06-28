import { useState, useEffect } from "react";
import { Tabs } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { selectRouterTab, removeRouterTab } from "@/store/slice/routerTab";
import {
  getRouter,
  getRouterDisplayName,
  getRouterParam,
} from "@/utils/format";
import { useHistory, useLocation } from "react-router-dom";
const { TabPane } = Tabs;
const RouterTab = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { routerTabs } = useSelector(selectRouterTab);
  const [active, setActive] = useState(getRouter(pathname).name);

  useEffect(() => {
    setActive(pathname);
  }, [pathname]);
  const handleChange = activeKey => {
    setActive(activeKey);
    history.push(activeKey);
  };
  const handleEdit = async (targetKey, action) => {
    const isDelete = action === "remove";
    if (!isDelete) return;
    await dispatch(removeRouterTab(targetKey));
    const tabs = JSON.parse(sessionStorage.tabs).filter(i => i !== targetKey);
    const tabsLength = tabs.length;
    tabs.indexOf(pathname) <= -1 && history.push(tabs[tabsLength - 1]);
  };
  return (
    <Tabs
      type="editable-card"
      activeKey={active}
      onChange={handleChange}
      onEdit={handleEdit}
      hideAdd
    >
      {routerTabs.map(path => (
        <TabPane
          tab={getRouterDisplayName(path) + getRouterParam(path)}
          key={path}
          closable={routerTabs.length > 1}
        />
      ))}
    </Tabs>
  );
};
export default RouterTab;
