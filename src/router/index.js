import Home from "@/views/Home";
import About from "@/views/About";

const routes = [
  { path: "/", exact: true, component: Home },
  { path: "/about", component: About },
];

export default routes;
