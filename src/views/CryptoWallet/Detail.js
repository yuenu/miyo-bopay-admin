import { Modal, Descriptions, Tag, Button } from "antd";
import { dateFormat } from "@/utils/format";
import { isActiveLang } from "@/utils/enum";
import Spin from "@/components/Spin";

const Detail = props => {
  const {
    id,
    name,
    balance,
    is_active,
    currency,
    network,
    owner,
    token,
    created,
    updated,
    address,
    note,
  } = props.data;
  return (
    <Modal
      title="職員明細"
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
          <Descriptions.Item label="balance">{balance}</Descriptions.Item>
          <Descriptions.Item label="is_active">
            <Tag color={is_active ? "green" : "default"}>
              {isActiveLang(is_active)}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="currency">{currency}</Descriptions.Item>
          <Descriptions.Item label="network">{network}</Descriptions.Item>
          <Descriptions.Item label="owner">{owner}</Descriptions.Item>
          <Descriptions.Item label="token">{token}</Descriptions.Item>
          <Descriptions.Item label="創建日期">
            {dateFormat(created)}
          </Descriptions.Item>
          <Descriptions.Item label="更新日期">
            {dateFormat(updated)}
          </Descriptions.Item>
          <Descriptions.Item label="收款地址">{address}</Descriptions.Item>
          <Descriptions.Item label="note">{note}</Descriptions.Item>
        </Descriptions>
      </Spin>
    </Modal>
  );
};

export default Detail;
