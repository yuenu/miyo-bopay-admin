import React from "react";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import zhTW from "antd/lib/locale/zh_TW";

import MainRoute from "@/views/MainRoute";
import store from "@/store";
import "@/less/main.less";

function App() {
  return (
    <ConfigProvider locale={zhTW}>
      <Provider store={store}>
        <MainRoute />
      </Provider>
    </ConfigProvider>
  );
}

export default App;
