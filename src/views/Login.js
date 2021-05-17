import { Button } from "antd";
import { useAuth } from "@/provider/auth";
const Login = () => {
  const { dispatch } = useAuth();
  const handleLogin = () => {
    dispatch({ type: "login", token: "jiowejfowefjoweijfo" });
  };
  return (
    <div className="login">
      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
};
export default Login;
