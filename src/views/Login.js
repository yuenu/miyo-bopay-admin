import { useDispatch } from "react-redux";
import { useHistory, Route, Redirect } from "react-router-dom";
import { Typography, Button, Form, Input, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { login, selectAuth } from "@/store/slice/auth";
import { useSelector } from "react-redux";
const { Title } = Typography;
const Login = () => {
  const { user } = useSelector(selectAuth);

  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const history = useHistory();

  const handleLogin = async () => {
    await dispatch(login({ ...form.getFieldValue() }));
    history.push("/");
  };

  return (
    <Route path="/Login">
      {user === null ? (
        <div className="login">
          <div className="login--box">
            <Title className="mb-2" level={2}>
              支付服務系統
            </Title>
            <Form
              form={form}
              className="login--box--form"
              size="large"
              onFinish={handleLogin}
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: "請輸入用戶名" }]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="用戶名"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: "請輸入密碼" }]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="密碼"
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>記住密碼</Checkbox>
                </Form.Item>
                <Button
                  size="small"
                  type="link"
                  className="login--box--form--psw"
                >
                  忘記密碼
                </Button>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" size="large" block>
                  登入
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      ) : (
        <Redirect to={{ pathname: "/" }} />
      )}
    </Route>
  );
};
export default Login;
