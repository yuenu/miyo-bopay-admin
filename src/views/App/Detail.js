import { Modal, Descriptions, Button } from "antd";
import { dateFormat } from "@/utils/format";
import Spin from "@/components/Spin";
import Tag from "@/components/Tag";

const Detail = props => {
  const {
    id,
    name,
    name_cn,
    created,
    updated,
    is_active,
    developer_id,
    developer_name,
    callback_url,
    info,
    secret,
    status,
    token,
    note,
  } = props.data;
  return (
    <Modal
      title="App明细"
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
          <Descriptions.Item label="姓名CN">{name_cn}</Descriptions.Item>
          <Descriptions.Item label="开发者ID">{developer_id}</Descriptions.Item>
          <Descriptions.Item label="开发者姓名">
            {developer_name}
          </Descriptions.Item>
          <Descriptions.Item label="callback_url">
            {callback_url}
          </Descriptions.Item>
          <Descriptions.Item label="info">{info}</Descriptions.Item>

          <Descriptions.Item label="secret">{secret}</Descriptions.Item>
          <Descriptions.Item label="status">{status}</Descriptions.Item>
          <Descriptions.Item label="token">{token}</Descriptions.Item>
          <Descriptions.Item label="创建日期">
            {dateFormat(created)}
          </Descriptions.Item>
          <Descriptions.Item label="更新日期">
            {dateFormat(updated)}
          </Descriptions.Item>
          <Descriptions.Item label="是否启用">
            <Tag val={is_active} />
          </Descriptions.Item>
          <Descriptions.Item label="备注">{note}</Descriptions.Item>
        </Descriptions>
      </Spin>
    </Modal>
  );
};

export default Detail;
