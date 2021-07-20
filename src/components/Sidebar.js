import { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  UserOutlined,
  TeamOutlined,
  ContainerOutlined,
  WalletOutlined,
  CreditCardOutlined,
  UserSwitchOutlined,
  LoginOutlined,
  TableOutlined,
  BarChartOutlined,
  PayCircleOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { getRouterDisplayName } from "@/utils/format";
import { useDispatch } from "react-redux";
import { setRouterTabs } from "@/store/slice/routerTab";
const { SubMenu } = Menu;
const { Sider } = Layout;

const SidebarView = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [selectedKey, setSelectedKey] = useState(pathname);
  const handleSetRouterTab = key => {
    dispatch(setRouterTabs(key));
  };
  useEffect(() => {
    setSelectedKey(pathname);
  }, [pathname]);
  const Item = (key, icon = null) => (
    <Menu.Item key={key} icon={icon}>
      <Link to={key} onClick={() => handleSetRouterTab(pathname)}>
        {getRouterDisplayName(key)}
      </Link>
    </Menu.Item>
  );

  return (
    <Sider breakpoint="lg" collapsedWidth="0" className="sidebar">
      <div className="logo">财务中心</div>
      <Menu theme="dark" mode="inline" selectedKeys={[selectedKey]}>
        <SubMenu key="Merchant" icon={<TeamOutlined />} title="商户管理">
          {Item("/Developer")}
          {Item("/App")}
          {Item("/AppUser")}
        </SubMenu>
        <SubMenu key="Pay" icon={<PayCircleOutlined />} title="支付管理">
          {Item("/Gateway")}
          {Item("/Gateway1")}
          {Item("/Gateway2")}
          {Item("/Gateway3")}
          {Item("/Gateway4")}
        </SubMenu>
        {Item("/Order", <ContainerOutlined />)}
        <SubMenu key="Crypto" icon={<WalletOutlined />} title="加密货币">
          {Item("/CryptoWallet")}
          {Item("/CryptoAcct")}
          {Item("/CryptoAcctLog")}
        </SubMenu>
        {Item("/Card", <CreditCardOutlined />)}
        {Item("/Agent", <UserSwitchOutlined />)}
        {Item("/LoginLog", <LoginOutlined />)}
        {Item("/Audit", <TableOutlined />)}
        <SubMenu key="Users" icon={<UserOutlined />} title="用户管理">
          {Item("/")}
          {Item("/Role")}
        </SubMenu>
        <SubMenu key="Report" icon={<BarChartOutlined />} title="报表">
          {Item("/AgentDaily")}
          {Item("/DeveloperDaily")}
          {Item("/OrderDaily")}
        </SubMenu>
        <SubMenu key="Config" icon={<SettingOutlined />} title="系统设置">
          {Item("/USDTExchange")}
        </SubMenu>
        <SubMenu key="Transfer" icon={<SettingOutlined />} title="代付">
          {Item("/Transfers")}
        </SubMenu>
      </Menu>
    </Sider>
  );
};
export default SidebarView;
