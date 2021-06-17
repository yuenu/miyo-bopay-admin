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
      title="职员明细"
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
          <Descriptions.Item label="姓名">{name}</Descriptions.Item>
          <Descriptions.Item label="帐号">{username}</Descriptions.Item>
          <Descriptions.Item label="电话">{phone}</Descriptions.Item>
          <Descriptions.Item label="email">{email}</Descriptions.Item>
          <Descriptions.Item label="创建日期">
            {dateFormat(created)}
          </Descriptions.Item>
          <Descriptions.Item label="更新日期">
            {dateFormat(updated)}
          </Descriptions.Item>
          <Descriptions.Item label="是否启用">
            <Tag val={is_active} />
          </Descriptions.Item>
          <Descriptions.Item label="是否为管理员">
            <Tag val={is_admin} />
          </Descriptions.Item>
          <Descriptions.Item label="是否为代理">
            <Tag val={is_agent} />
          </Descriptions.Item>
          <Descriptions.Item label="是否为开发者">
            <Tag val={is_developer} />
          </Descriptions.Item>
          <Descriptions.Item label="是否为职员">
            <Tag val={is_staff} />
          </Descriptions.Item>
        </Descriptions>
      </Spin>
    </Modal>
  );
};

export default Detail;
