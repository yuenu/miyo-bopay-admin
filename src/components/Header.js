import { Layout, Menu, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectAuth, logout } from "@/store/slice/auth";

const { Header } = Layout;

const HeaderView = () => {
  const { user } = useSelector(selectAuth);

  const dispatch = useDispatch();
  const history = useHistory();
  const handleLogout = async () => {
    history.push("/Login");
    await dispatch(logout());
  };
  const UserMenu = (
    <Menu>
      <Menu.Item key="1">基本资料</Menu.Item>
      <Menu.Item key="2">修改密码</Menu.Item>
      <Menu.Item onClick={handleLogout} key="3">
        登出
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="header">
      <Dropdown overlay={UserMenu} trigger={["click"]}>
        <Button type="link">
          {user.username} <DownOutlined />
        </Button>
      </Dropdown>
    </Header>
  );
};
export default HeaderView;
