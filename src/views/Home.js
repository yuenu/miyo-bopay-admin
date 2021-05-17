import { Button } from "antd";
import { useAuth } from "@/provider/auth";
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();

  const { dispatch } = useAuth();
  const handleLogout = () => {
    dispatch({ type: "logout" });
  };
  const handleGotoAbout = () => {
    history.push("/about");
  };
  return (
    <div>
      <h1>Home Home</h1>
      <Button onClick={handleLogout}>Logout</Button>
      <Button onClick={handleGotoAbout}>go to About</Button>
    </div>
  );
};
export default Home;
