import React from "react";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import zh_CN from "antd/lib/locale/zh_CN";

import MainRoute from "@/views/MainRoute";
import store from "@/store";
import "@/less/main.less";
import { interceptor } from "@/utils/request";
interceptor(store);
function App() {
  return (
    <ConfigProvider locale={zh_CN}>
      <Provider store={store}>
        <MainRoute />
      </Provider>
    </ConfigProvider>
  );
}

export default App;
