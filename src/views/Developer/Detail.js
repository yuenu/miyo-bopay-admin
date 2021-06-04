import { Modal, Descriptions, Button } from "antd";
import { dateFormat } from "@/utils/format";
import Spin from "@/components/Spin";

const Detail = props => {
  const {
    id,
    name,
    phone,
    email,
    created,
    updated,
    username,
    info,
    note,
    org,
    site,
    status,
    telegram,
    user_id,
  } = props.data;
  return (
    <Modal
      title="開發者明細"
      visible={props.visible}
      onCancel={props.onCancel}
      footer={[
        <Button key="close" type="primary" onClick={props.onCancel}>
          關閉
        </Button>,
      ]}
    >
      <Spin spinning={props.loading}>
        <Descriptions column={1} bordered>
          <Descriptions.Item label="id">{id}</Descriptions.Item>
          <Descriptions.Item label="name">{name}</Descriptions.Item>
          <Descriptions.Item label="phone">{phone}</Descriptions.Item>
          <Descriptions.Item label="email">{email}</Descriptions.Item>
          <Descriptions.Item label="創建日期">
            {dateFormat(created)}
          </Descriptions.Item>
          <Descriptions.Item label="更新日期">
            {dateFormat(updated)}
          </Descriptions.Item>
          <Descriptions.Item label="帳號">{username}</Descriptions.Item>
          <Descriptions.Item label="info">{info}</Descriptions.Item>
          <Descriptions.Item label="note">{note}</Descriptions.Item>
          <Descriptions.Item label="org">{org}</Descriptions.Item>
          <Descriptions.Item label="site">{site}</Descriptions.Item>
          <Descriptions.Item label="status">{status}</Descriptions.Item>
          <Descriptions.Item label="telegram">{telegram}</Descriptions.Item>
          <Descriptions.Item label="user_id">{user_id}</Descriptions.Item>
        </Descriptions>
      </Spin>
    </Modal>
  );
};

export default Detail;
