import { Modal, Descriptions, Button } from "antd";
import { dateFormat, priceFormat } from "@/utils/format";
import { Currency, Network } from "@/utils/enum";
import Spin from "@/components/Spin";
import Tag from "@/components/Tag";

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
      title="钱包明細"
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
          <Descriptions.Item label="钱包名">{name}</Descriptions.Item>
          <Descriptions.Item label="钱包所有者">{owner}</Descriptions.Item>
          <Descriptions.Item label="货币">
            {Currency[currency] || ""}
          </Descriptions.Item>
          <Descriptions.Item label="余额">
            {priceFormat({ val: balance, currency })}
          </Descriptions.Item>
          <Descriptions.Item label="区块链">
            {Network[network] || ""}
          </Descriptions.Item>
          <Descriptions.Item label="是否启用">
            <Tag val={is_active} />
          </Descriptions.Item>
          <Descriptions.Item label="Token">{token}</Descriptions.Item>
          <Descriptions.Item label="创建日期">
            {dateFormat(created)}
          </Descriptions.Item>
          <Descriptions.Item label="更新日期">
            {dateFormat(updated)}
          </Descriptions.Item>
          <Descriptions.Item label="收款地址">{address}</Descriptions.Item>
          <Descriptions.Item label="备注">{note}</Descriptions.Item>
        </Descriptions>
      </Spin>
    </Modal>
  );
};

export default Detail;
