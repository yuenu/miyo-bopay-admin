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
  InteractionOutlined,
  UnorderedListOutlined,
  MoneyCollectOutlined,
} from "@ant-design/icons";
import { getRouterDisplayName } from "@/utils/format";
import { useDispatch, useSelector } from "react-redux";
import { selectApp } from "@/store/slice/app";

import { setRouterTabs } from "@/store/slice/routerTab";

const { SubMenu } = Menu;
const { Sider } = Layout;

const SidebarView = ({ routes }) => {
  const { pathname } = useLocation();
  const { list } = useSelector(selectApp);
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
        {getRouterDisplayName(key, routes)}
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
          {Item("/AppAcct")}
          {Item("/AppAcctLog")}
        </SubMenu>
        <SubMenu key="Pay" icon={<PayCircleOutlined />} title="支付管理">
          {Item("/Gateway")}
          {Item("/Gateway1")}
          {Item("/Gateway4")}
          {Item("/Gateway2")}
          {Item("/Gateway3")}
        </SubMenu>
        <SubMenu key="Order" icon={<ContainerOutlined />} title="订单中心">
          {list.map(i => Item(`/Order${i.id}`))}
          {Item("/Order")}
        </SubMenu>
        <SubMenu key="Crypto" icon={<WalletOutlined />} title="加密货币">
          {Item("/CryptoWallet")}
          {Item("/CryptoAcct")}
          {Item("/CryptoAcctLog")}
        </SubMenu>
        <SubMenu key="Cards" icon={<CreditCardOutlined />} title="银行卡">
          {Item("/Card")}
          {Item("/CardAcct")}
          {Item("/CardAcctLog")}
        </SubMenu>
        <SubMenu key="Agents" icon={<UserSwitchOutlined />} title="代理管理">
          {Item("/Agent")}
          {Item("/AgentAcct")}
        </SubMenu>
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
          {Item("/AppDaily")}
          {Item("/TransferAppDaily")}
          {Item("/GatewayDaily")}
          {Item("/TransferAppGatewayDaily")}
        </SubMenu>
        <SubMenu key="Config" icon={<SettingOutlined />} title="系统设置">
          {Item("/USDTExchange")}
          {Item("/SystemSetting")}
        </SubMenu>
        <SubMenu key="Transfer" icon={<InteractionOutlined />} title="代付">
          {Item("/Transfers")}
          {Item("/TransfersStatus2")}
          {Item("/TransfersStatus7")}
          {Item("/TransfersStatus8")}
        </SubMenu>
        <SubMenu
          key="TransfersApp"
          icon={<MoneyCollectOutlined />}
          title="商户提款"
        >
          {Item("/TransfersApp")}
          {Item("/TransfersAppStatus2")}
          {Item("/TransfersAppStatus7")}
          {Item("/TransfersAppStatus8")}
        </SubMenu>
        <SubMenu
          key="Whitelist"
          icon={<UnorderedListOutlined />}
          title="白名单管理"
        >
          {Item("/AgentWhitelist")}
          {Item("/DeveloperWhitelist")}
        </SubMenu>
      </Menu>
    </Sider>
  );
};
export default SidebarView;
