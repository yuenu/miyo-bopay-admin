import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

import {
  UserOutlined,
  TeamOutlined,
  ContainerOutlined,
  WalletOutlined,
  CreditCardOutlined,
  UserSwitchOutlined,
  LoginOutlined,
  FundProjectionScreenOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;
const { Sider } = Layout;

const SidebarView = () => {
  const path = window.location.pathname;

  return (
    <Sider breakpoint="lg" collapsedWidth="0">
      <div className="logo">支付服务后台</div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={[path]}>
        <SubMenu key="Users" icon={<UserOutlined />} title="用户管理">
          <Menu.Item key="/">
            <Link to="/">职员管理</Link>
          </Menu.Item>
          <Menu.Item key="/Permission">
            <Link to="/Permission">权限设置</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="Merchant" icon={<TeamOutlined />} title="商户管理">
          <Menu.Item key="/Developer">
            <Link to="/Developer">开发者管理</Link>
          </Menu.Item>
          <Menu.Item key="/AppUser">
            <Link to="/AppUser">App用户管理</Link>
          </Menu.Item>
          <Menu.Item key="/App">
            <Link to="/App">App管理</Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="/Order" icon={<ContainerOutlined />}>
          <Link to="/Order">支付订单</Link>
        </Menu.Item>
        <SubMenu key="Crypto" icon={<TeamOutlined />} title="加密钱包">
          <Menu.Item key="/CryptoWallet" icon={<WalletOutlined />}>
            <Link to="/CryptoWallet">加密钱包</Link>
          </Menu.Item>
          <Menu.Item key="/CryptoAcctLog" icon={<WalletOutlined />}>
            <Link to="/CryptoAcctLog">加密賬戶流水紀錄</Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="/Card" icon={<CreditCardOutlined />}>
          <Link to="/Card">银行卡管理</Link>
        </Menu.Item>
        <Menu.Item key="/Agent" icon={<UserSwitchOutlined />}>
          <Link to="/Agent">代理管理</Link>
        </Menu.Item>
        <Menu.Item key="/LoginLog" icon={<LoginOutlined />}>
          <Link to="/LoginLog">登入日志</Link>
        </Menu.Item>
        <Menu.Item key="/Audit" icon={<FundProjectionScreenOutlined />}>
          <Link to="/Audit">报表管理</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
export default SidebarView;
