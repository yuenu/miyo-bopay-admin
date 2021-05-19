import { Layout, Menu, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useAuth } from "@/provider/auth";
const { Header } = Layout;

const HeaderView = () => {
  const { state, dispatch } = useAuth();
  const handleLogout = () => {
    dispatch({ type: "logout" });
  };

  const UserMenu = (
    <Menu>
      <Menu.Item key="1">基本資料</Menu.Item>
      <Menu.Item key="2">修改密碼</Menu.Item>
      <Menu.Item onClick={handleLogout} key="3">
        登出
      </Menu.Item>
    </Menu>
  );
  return (
    <Header className="header">
      <Dropdown overlay={UserMenu} trigger={["click"]}>
        <Button type="link">
          {state.user.username} <DownOutlined />
        </Button>
      </Dropdown>
    </Header>
  );
};
export default HeaderView;
