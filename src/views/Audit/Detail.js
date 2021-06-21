import { Modal, Descriptions, Button } from "antd";
import { dateFormat } from "@/utils/format";
import Spin from "@/components/Spin";
import Tag from "@/components/Tag";

const Detail = props => {
  const {
    id,
    user_id,
    created,
    updated,
    device,
    client_ip,
    brief,
    method,
    verb,
    err,
    succeeded,
    username,
  } = props.data;
  return (
    <Modal
      title="审计日志明细"
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
          <Descriptions.Item label="帐号">{username}</Descriptions.Item>
          <Descriptions.Item label="用户ID">{user_id}</Descriptions.Item>
          <Descriptions.Item label="设备">{device}</Descriptions.Item>
          <Descriptions.Item label="IP">{client_ip}</Descriptions.Item>
          <Descriptions.Item label="Brief">{brief}</Descriptions.Item>
          <Descriptions.Item label="Method">{method}</Descriptions.Item>
          <Descriptions.Item label="Verb">{verb}</Descriptions.Item>
          <Descriptions.Item label="Err">{err}</Descriptions.Item>
          <Descriptions.Item label="成功">
            <Tag val={succeeded} />
          </Descriptions.Item>
          <Descriptions.Item label="创建日期">
            {dateFormat(created)}
          </Descriptions.Item>
          <Descriptions.Item label="更新日期">
            {dateFormat(updated)}
          </Descriptions.Item>
        </Descriptions>
      </Spin>
    </Modal>
  );
};

export default Detail;
