import { Layout, Menu, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";

const { Header } = Layout;

const HeaderView = () => {
  const UserMenu = (
    <Menu>
      <Menu.Item key="1">基本資料</Menu.Item>
      <Menu.Item key="2">修改密碼</Menu.Item>
      <Menu.Item key="3">登出</Menu.Item>
    </Menu>
  );
  return (
    <Header className="header">
      <Dropdown overlay={UserMenu} trigger={["click"]}>
        <Button type="link">
          jessica <DownOutlined />
        </Button>
      </Dropdown>
    </Header>
  );
};
export default HeaderView;
