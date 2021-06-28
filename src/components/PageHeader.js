import { PageHeader } from "antd";
import { getRouterDisplayName } from "@/utils/format";
import { useLocation } from "react-router-dom";

const PageHeaderC = () => {
  const { pathname } = useLocation();
  return <PageHeader className="mb-1" title={getRouterDisplayName(pathname)} />;
};
export default PageHeaderC;
