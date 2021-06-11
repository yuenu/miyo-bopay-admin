import { Modal, Descriptions, Button } from "antd";
import { dateFormat } from "@/utils/format";
import Spin from "@/components/Spin";
import Tag from "@/components/Tag";

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
      title="訂單明細"
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
          <Descriptions.Item label="姓名">{name}</Descriptions.Item>
          <Descriptions.Item label="電話">{phone}</Descriptions.Item>
          <Descriptions.Item label="email">{email}</Descriptions.Item>
          <Descriptions.Item label="創建日期">
            {dateFormat(created)}
          </Descriptions.Item>
          <Descriptions.Item label="更新日期">
            {dateFormat(updated)}
          </Descriptions.Item>
          <Descriptions.Item label="是否启用">
            <Tag val={is_active} />
          </Descriptions.Item>
          <Descriptions.Item label="is_admin">
            <Tag val={is_admin} />
          </Descriptions.Item>
          <Descriptions.Item label="is_agent">
            <Tag val={is_agent} />
          </Descriptions.Item>
          <Descriptions.Item label="is_developer">
            <Tag val={is_developer} />
          </Descriptions.Item>
          <Descriptions.Item label="is_staff">
            <Tag val={is_staff} />
          </Descriptions.Item>
          <Descriptions.Item label="帳號">{username}</Descriptions.Item>
        </Descriptions>
      </Spin>
    </Modal>
  );
};

export default Detail;
