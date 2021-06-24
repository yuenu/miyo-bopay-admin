import { Modal, Descriptions, Button } from "antd";
import Spin from "@/components/Spin";

const Detail = ({ visible, loading, data, onCancel, columns }) => {
  return (
    <Modal
      title="订单明細"
      visible={visible}
      onCancel={onCancel}
      width={1024}
      footer={[
        <Button key="close" type="primary" onClick={onCancel}>
          关闭
        </Button>,
      ]}
    >
      <Spin spinning={loading}>
        <Descriptions column={{ xs: 1, sm: 1, md: 2 }} bordered>
          {columns.map(i => (
            <Descriptions.Item
              label={i.title}
              key={i.dataIndex}
              span={
                i.dataIndex === "payer_name" || i.dataIndex === "payer_cred"
                  ? 2
                  : 1
              }
            >
              {i.dRender
                ? i.dRender(data[i.dataIndex], i)
                : i.render
                ? i.render(data[i.dataIndex], i)
                : data[i.dataIndex]}
            </Descriptions.Item>
          ))}
        </Descriptions>
      </Spin>
    </Modal>
  );
};

export default Detail;
