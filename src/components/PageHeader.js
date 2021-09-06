import { PageHeader } from "antd";
import { getRouter } from "@/utils/format";
import { useLocation } from "react-router-dom";

const PageHeaderC = ({ routes }) => {
  const { pathname } = useLocation();
  const route = getRouter(pathname, routes);
  return route?.hidePageHeader ? null : (
    <PageHeader className="" title={route?.displayName} />
  );
};
export default PageHeaderC;
