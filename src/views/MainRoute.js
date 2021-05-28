import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GlobalLayout from "./GlobalLayout";
import Login from "./Login";
const MainRoute = () => {
  return (
    <Router>
      <Switch>
        <Route path="/Login">
          <Login />
        </Route>
        <GlobalLayout />
      </Switch>
    </Router>
  );
};
export default MainRoute;
