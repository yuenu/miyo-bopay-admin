import { Modal, Descriptions, Button } from "antd";
import { dateFormat } from "@/utils/format";
import Spin from "@/components/Spin";
import { DeveloperStatus } from "@/utils/enum";

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
          <Descriptions.Item label="ID">{id}</Descriptions.Item>
          <Descriptions.Item label="帐户ID">{user_id}</Descriptions.Item>
          <Descriptions.Item label="帐户名称">{username}</Descriptions.Item>
          <Descriptions.Item label="姓名">{name}</Descriptions.Item>
          <Descriptions.Item label="电话">{phone}</Descriptions.Item>
          <Descriptions.Item label="email">{email}</Descriptions.Item>
          <Descriptions.Item label="公司/组织">{org}</Descriptions.Item>
          <Descriptions.Item label="公司简介">{info}</Descriptions.Item>
          <Descriptions.Item label="公司官网">{site}</Descriptions.Item>
          <Descriptions.Item label="审核状态">
            {DeveloperStatus[status]}
          </Descriptions.Item>
          <Descriptions.Item label="telegram">{telegram}</Descriptions.Item>
          <Descriptions.Item label="备注">{note}</Descriptions.Item>
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
