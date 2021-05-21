import { Layout, Menu } from "antd";

import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { addTab, setActiveKey, selectTab } from "@/store/slice/tab";

const { SubMenu } = Menu;
const { Sider } = Layout;

const SidebarView = () => {
  const { tabs, activeKey } = useSelector(selectTab);
  const dispatch = useDispatch();
  const handleSelectMenu = async ({ key }) => {
    const hasKey = tabs.some(i => i.name === key);
    dispatch(setActiveKey(key));
    hasKey ||
      dispatch(
        addTab({
          name: key,
        }),
      );
  };
  return (
    <Sider breakpoint="lg" collapsedWidth="0">
      <div className="logo">支付服務後台</div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["Home"]}
        onSelect={handleSelectMenu}
        selectedKeys={activeKey}
      >
        <Menu.Item key="Home" icon={<UserOutlined />}>
          Home
        </Menu.Item>
        <Menu.Item key="About" icon={<VideoCameraOutlined />}>
          About
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
