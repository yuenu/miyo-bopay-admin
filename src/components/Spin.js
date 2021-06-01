import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const SpinC = props => {
  return (
    <Spin spinning={props.spinning} indicator={<LoadingOutlined />}>
      {props.children}
    </Spin>
  );
};

export default SpinC;
