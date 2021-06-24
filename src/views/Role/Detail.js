import { Modal, Descriptions, Button } from "antd";
import { dateFormat } from "@/utils/format";
import Spin from "@/components/Spin";

const Detail = props => {
  const { id, name, total, created, updated, note } = props.data;
  return (
    <Modal
      title="角色明细"
      visible={props.visible}
      onCancel={props.onCancel}
      footer={[
        <Button key="close" type="primary" onClick={props.onCancel}>
          关闭
        </Button>,
      ]}
    >
      <Spin spinning={props.loading}>
        <Descriptions column={1} bordered>
          <Descriptions.Item label="ID">{id}</Descriptions.Item>
          <Descriptions.Item label="名称">{name}</Descriptions.Item>
          <Descriptions.Item label="职员数量">{total}</Descriptions.Item>
          <Descriptions.Item label="创建日期">
            {dateFormat(created)}
          </Descriptions.Item>
          <Descriptions.Item label="更新日期">
            {dateFormat(updated)}
          </Descriptions.Item>
          <Descriptions.Item label="备注">{note}</Descriptions.Item>
        </Descriptions>
      </Spin>
    </Modal>
  );
};

export default Detail;
