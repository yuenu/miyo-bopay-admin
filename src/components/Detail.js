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
        <Descriptions column={1} bordered size="small">
          {columns.map(i => {
            console.log(data);
            return (
              <Descriptions.Item label={i.title} key={i.dataIndex}>
                {i.dRender
                  ? i.dRender(data[i.dataIndex], data)
                  : i.render
                  ? i.render(data[i.dataIndex], data)
                  : data[i.dataIndex]}
              </Descriptions.Item>
            );
          })}
        </Descriptions>
      </Spin>
    </Modal>
  );
};

export default Detail;
