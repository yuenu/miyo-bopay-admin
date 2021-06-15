import { Modal, Descriptions, Tag, Button } from "antd";
import { dateFormat } from "@/utils/format";
import Spin from "@/components/Spin";

const Detail = props => {
  const {
    created,
    email,
    id,
    info,
    name,
    note,
    org,
    phone,
    site,
    status,
    telegram,
    updated,
    user_id,
    username,
  } = props.data;
  return (
    <Modal
      title="开发者明細"
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
          <Descriptions.Item label="id">{id}</Descriptions.Item>
          <Descriptions.Item label="姓名">{name}</Descriptions.Item>
          <Descriptions.Item label="电话">{phone}</Descriptions.Item>
          <Descriptions.Item label="email">{email}</Descriptions.Item>
          <Descriptions.Item label="创建日期">
            {dateFormat(created)}
          </Descriptions.Item>
          <Descriptions.Item label="更新日期">
            {dateFormat(updated)}
          </Descriptions.Item>
          <Descriptions.Item label="帐号">{username}</Descriptions.Item>
          <Descriptions.Item label="info">{info}</Descriptions.Item>
          <Descriptions.Item label="note">{note}</Descriptions.Item>
          <Descriptions.Item label="org">{org}</Descriptions.Item>
          <Descriptions.Item label="site">{site}</Descriptions.Item>
          <Descriptions.Item label="status">
            <Tag color={status ? "green" : "default"}>{status}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="telegram">{telegram}</Descriptions.Item>
          <Descriptions.Item label="user_id">{user_id}</Descriptions.Item>
        </Descriptions>
      </Spin>
    </Modal>
  );
};

export default Detail;
