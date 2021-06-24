import { Modal, Descriptions, Button } from "antd";
import Spin from "@/components/Spin";

const Detail = ({ visible, loading, data, onCancel, columns }) => {
  return (
    <Modal
      title="审计日志明细"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="close" type="primary" onClick={onCancel}>
          关闭
        </Button>,
      ]}
    >
      <Spin spinning={loading}>
        <Descriptions column={1} bordered>
          {columns.map(i => (
            <Descriptions.Item label={i.title} key={i.dataIndex}>
              {i.type === "render"
                ? i.render(data[i.dataIndex])
                : data[i.dataIndex]}
            </Descriptions.Item>
          ))}
        </Descriptions>
      </Spin>
    </Modal>
  );
};

export default Detail;
