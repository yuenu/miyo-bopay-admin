import logo from "./logo.svg";
import React, { useEffect } from "react";
import "./App.less";
import { Button } from "antd";
import { Ajax } from "@/utils/request";
function App() {
  useEffect(() => {
    const getData = async () => {
      const res = await Ajax({ url: "/todos", method: "get" });
      console.log(res);
    };
    getData();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{process.env.REACT_APP_API_URL}</p>
        <Button type="primary">Button</Button>
      </header>
    </div>
  );
}

export default App;
