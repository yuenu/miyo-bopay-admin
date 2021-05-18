import { Layout } from "antd";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
const { Content, Footer } = Layout;

const GlobalLayout = () => {
  return (
    <Layout className="global-layout">
      <Sidebar />
      <Layout>
        <Header />
        <Content></Content>
        <Footer style={{ textAlign: "center" }}>©2021 Miyo</Footer>
      </Layout>
    </Layout>
  );
};
export default GlobalLayout;
