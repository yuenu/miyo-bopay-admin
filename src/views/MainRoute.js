import { BrowserRouter as Router } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "@/store/slice/auth";
import GlobalLayout from "./GlobalLayout";
import Login from "./Login";
const MainRoute = () => {
  const { user } = useSelector(selectAuth);
  const isLogin = user.username;
  return <Router> {isLogin ? <GlobalLayout /> : <Login />}</Router>;
};
export default MainRoute;
