import { Button } from "antd";
import { useAuth } from "@/provider/auth";
import { useHistory } from "react-router-dom";
const About = () => {
  let history = useHistory();

  const { dispatch } = useAuth();
  const handleLogout = () => {
    dispatch({ type: "logout" });
    history.push("/");
  };
  return (
    <div>
      <h1>About</h1>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};
export default About;
