import React from "react";

import "@/less/main.less";
import MainRoute from "@/views/MainRoute";
import { Provider } from "react-redux";
import store from "@/store";

function App() {
  return (
    <Provider store={store}>
      <MainRoute />
    </Provider>
  );
}

export default App;
