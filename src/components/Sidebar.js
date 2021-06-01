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
  return (
    <Sider breakpoint="lg" collapsedWidth="0">
      <div className="logo">支付服務後台</div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["User"]}>
        <SubMenu key="Users" icon={<UserOutlined />} title="用戶管理">
          <Menu.Item key="User">
            <Link to="/">職員管理</Link>
          </Menu.Item>
          <Menu.Item key="Permission">
            <Link to="/Permission">權限設置</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="Merchant" icon={<TeamOutlined />} title="商戶管理">
          <Menu.Item key="Developer">
            <Link to="/Developer">開發者管理</Link>
          </Menu.Item>
          <Menu.Item key="AppUser">
            <Link to="/AppUser">App用戶管理</Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="Order" icon={<ContainerOutlined />}>
          <Link to="/Order">支付訂單</Link>
        </Menu.Item>
        <Menu.Item key="CryptoWallet" icon={<WalletOutlined />}>
          <Link to="/CryptoWallet">加密錢包</Link>
        </Menu.Item>
        <Menu.Item key="Card" icon={<CreditCardOutlined />}>
          <Link to="/Card">銀行卡管理</Link>
        </Menu.Item>
        <Menu.Item key="Agent" icon={<UserSwitchOutlined />}>
          <Link to="/Agent">代理管理</Link>
        </Menu.Item>
        <Menu.Item key="LoginLog" icon={<LoginOutlined />}>
          <Link to="/LoginLog">登入日誌</Link>
        </Menu.Item>
        <Menu.Item key="Audit" icon={<FundProjectionScreenOutlined />}>
          <Link to="/Audit">報表管理</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
export default SidebarView;
