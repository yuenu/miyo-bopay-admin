import { PageHeader } from "antd";
import { getRouterDisplayName } from "@/utils/format";
const PageHeaderC = () => {
  return (
    <PageHeader
      className="mb-1"
      title={getRouterDisplayName(window.location.pathname)}
    />
  );
};
export default PageHeaderC;
