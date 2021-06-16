import { Modal, Descriptions, Button } from "antd";
import { dateFormat } from "@/utils/format";
import Spin from "@/components/Spin";
import Tag from "@/components/Tag";
import { Currency } from "@/utils/enum";

const Detail = props => {
  const {
    id,
    wallet_id,
    name,
    created,
    updated,
    is_active,
    address,
    balance,
    currency,
    last_block,
    last_block_time,
    seq,
    w,
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
          <Descriptions.Item label="钱包ID">{wallet_id}</Descriptions.Item>
          <Descriptions.Item label="名称">{name}</Descriptions.Item>
          <Descriptions.Item label="地址">{address}</Descriptions.Item>
          <Descriptions.Item label="余额">{balance}</Descriptions.Item>
          <Descriptions.Item label="货币">
            {Currency[currency]}
          </Descriptions.Item>
          <Descriptions.Item label="last_block">{last_block}</Descriptions.Item>
          <Descriptions.Item label="last_block_time">
            {last_block_time}
          </Descriptions.Item>
          <Descriptions.Item label="seq">{seq}</Descriptions.Item>
          <Descriptions.Item label="w">{w}</Descriptions.Item>
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
