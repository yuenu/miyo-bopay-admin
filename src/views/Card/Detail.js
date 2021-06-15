import { Modal, Descriptions, Tag, Button } from "antd";
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
    is_active,
    is_admin,
    is_agent,
    is_developer,
    is_staff,
    username,
  } = props.data;
  return (
    <Modal
      title="银行卡明細"
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
          <Descriptions.Item label="is_active">
            <Tag color={is_active ? "green" : "default"}>
              {is_active?.toString()}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="is_admin">
            <Tag color={is_admin ? "green" : "default"}>
              {is_admin?.toString()}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="is_agent">
            <Tag color={is_agent ? "green" : "default"}>
              {is_agent?.toString()}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="is_developer">
            <Tag color={is_developer ? "green" : "default"}>
              {is_developer?.toString()}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="is_staff">
            <Tag color={is_staff ? "green" : "default"}>
              {is_staff?.toString()}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="帐号">{username}</Descriptions.Item>
        </Descriptions>
      </Spin>
    </Modal>
  );
};

export default Detail;
