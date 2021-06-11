import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const SpinC = props => {
  console.log(props.spinning);
  return (
    <Spin spinning={props.spinning} indicator={<LoadingOutlined />}>
      {props.children}
    </Spin>
  );
};

function spinPropsAreEqual(prev, next) {
  return prev.spinning === next.spinning;
}
export default React.memo(SpinC, spinPropsAreEqual);
