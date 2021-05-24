import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;
const { Sider } = Layout;

const SidebarView = () => {
  return (
    <Sider breakpoint="lg" collapsedWidth="0">
      <div className="logo">支付服務後台</div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["Employee"]}>
        <SubMenu key="User" icon={<UploadOutlined />} title="用戶管理">
          <Menu.Item key="Employee">
            <Link to="/User/Employee">職員管理</Link>
          </Menu.Item>
          <Menu.Item key="Permission">
            <Link to="/User/Permission">權限設置</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="Merchant" icon={<UploadOutlined />} title="商戶管理">
          <Menu.Item key="Developer">
            <Link to="/Merchant/Developer">開發者管理</Link>
          </Menu.Item>
          <Menu.Item key="AppUSer">
            <Link to="/Merchant/AppUSer">App用戶管理</Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="Order" icon={<UserOutlined />}>
          <Link to="/Order">支付訂單</Link>
        </Menu.Item>
        <Menu.Item key="Wallet" icon={<VideoCameraOutlined />}>
          <Link to="/Wallet">加密錢包</Link>
        </Menu.Item>
        <Menu.Item key="BankAccount" icon={<UploadOutlined />}>
          <Link to="/BankAccount">銀行卡管理</Link>
        </Menu.Item>
        <Menu.Item key="Agent" icon={<UserOutlined />}>
          <Link to="/Agent">代理管理</Link>
        </Menu.Item>
        <Menu.Item key="LoginLog" icon={<UserOutlined />}>
          <Link to="/LoginLog">登入日誌</Link>
        </Menu.Item>
        <Menu.Item key="Report" icon={<UserOutlined />}>
          <Link to="/Report">報表管理</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
export default SidebarView;
