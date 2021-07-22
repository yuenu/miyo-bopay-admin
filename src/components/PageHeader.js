import { PageHeader } from "antd";
import { getRouter } from "@/utils/format";
import { useLocation } from "react-router-dom";

const PageHeaderC = () => {
  const { pathname } = useLocation();
  const route = getRouter(pathname);
  return route.hidePageHeader ? null : (
    <PageHeader className="mb-1" title={route.displayName} />
  );
};
export default PageHeaderC;
