import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import routes from "@/router";
const { SubMenu } = Menu;
const { Sider } = Layout;

const SidebarView = () => {
  const currentKey = routes.find(i => {
    return i.path === window.location.pathname;
  }).path;
  return (
    <Sider breakpoint="lg" collapsedWidth="0">
      <div className="logo">支付服務後台</div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={[currentKey]}>
        <Menu.Item key="/" icon={<UserOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="/about" icon={<VideoCameraOutlined />}>
          <Link to="/about">About</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<UploadOutlined />}>
          nav 3
        </Menu.Item>
        <Menu.Item key="4" icon={<UserOutlined />}>
          nav 4
        </Menu.Item>
        <SubMenu key="sub1" icon={<UploadOutlined />} title="nav 5">
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <Menu.Item key="7">Option 7</Menu.Item>
          <Menu.Item key="8">Option 8</Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
};
export default SidebarView;
