import { PageHeader } from "antd";
import router from "@/router";

const PageHeaderC = () => {
  const handleGetTitle = path => {
    return (
      router.find(i => i.path === path)?.displayName ||
      router.find(i => i.name === path.split("/")[1])?.displayName
    );
  };
  return (
    <PageHeader
      className="mb-1"
      title={handleGetTitle(window.location.pathname)}
    />
  );
};
export default PageHeaderC;
