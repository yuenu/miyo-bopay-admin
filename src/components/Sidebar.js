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
  TableOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;
const { Sider } = Layout;

const SidebarView = () => {
  const path = window.location.pathname;

  return (
    <Sider breakpoint="lg" collapsedWidth="0">
      <div className="logo">财务中心</div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={[path]}>
        <SubMenu key="Merchant" icon={<TeamOutlined />} title="商户管理">
          <Menu.Item key="/Developer">
            <Link to="/Developer">开发者管理</Link>
          </Menu.Item>
          <Menu.Item key="/App">
            <Link to="/App">App管理</Link>
          </Menu.Item>
          <Menu.Item key="/AppUser">
            <Link to="/AppUser">App用户管理</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="Pay" icon={<TeamOutlined />} title="支付管理">
          <Menu.Item key="/Gateway">
            <Link to="/Gateway">商户管理</Link>
          </Menu.Item>
          <Menu.Item key="/Gateway1">
            <Link to="/Gateway1">银行卡管理</Link>
          </Menu.Item>
          <Menu.Item key="/Gateway2">
            <Link to="/Gateway2">第三方支付</Link>
          </Menu.Item>
          <Menu.Item key="/Gateway3">
            <Link to="/Gateway3">第三方代付</Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="/Order" icon={<ContainerOutlined />}>
          <Link to="/Order">支付订单</Link>
        </Menu.Item>
        <SubMenu key="Crypto" icon={<TeamOutlined />} title="加密货币">
          <Menu.Item key="/CryptoWallet" icon={<WalletOutlined />}>
            <Link to="/CryptoWallet">钱包管理</Link>
          </Menu.Item>
          <Menu.Item key="/CryptoAcct" icon={<WalletOutlined />}>
            <Link to="/CryptoAcct">收款地址管理</Link>
          </Menu.Item>
          <Menu.Item key="/CryptoAcctLog" icon={<WalletOutlined />}>
            <Link to="/CryptoAcctLog">资金动账记录</Link>
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
        <Menu.Item key="/Audit" icon={<TableOutlined />}>
          <Link to="/Audit">审计日志</Link>
        </Menu.Item>
        <SubMenu key="Users" icon={<UserOutlined />} title="用户管理">
          <Menu.Item key="/">
            <Link to="/">职员管理</Link>
          </Menu.Item>
          <Menu.Item key="/Role">
            <Link to="/Role">权限设置</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
};
export default SidebarView;
