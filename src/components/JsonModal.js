import { Modal, Button } from "antd";
import hljs from "highlight.js";
import "highlight.js/styles/base16/ros-pine-moon.css";
import Spin from "@/components/Spin";
const JsonModal = ({ data, visible, onCancel, loading, ...rest }) => {
  return (
    <Modal
      title="json response"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="close" type="primary" onClick={onCancel}>
          关闭
        </Button>,
      ]}
      destroyOnClose={true}
      {...rest}
    >
      <Spin spinning={loading}>
        <pre
          className="hljs"
          dangerouslySetInnerHTML={{
            __html: hljs.highlight(JSON.stringify(data, null, 4), {
              language: "json",
            }).value,
          }}
        />
      </Spin>
    </Modal>
  );
};
export default JsonModal;
