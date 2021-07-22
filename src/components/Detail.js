import { Modal, Descriptions, Button } from "antd";
import Spin from "@/components/Spin";

const Detail = ({
  title,
  visible,
  loading,
  data,
  onCancel,
  columns,
  width,
  ...rest
}) => {
  return (
    <Modal
      width={width}
      title={title}
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
        <Descriptions column={1} bordered>
          {columns.map(i => (
            <Descriptions.Item label={i.title} key={i.dataIndex}>
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
