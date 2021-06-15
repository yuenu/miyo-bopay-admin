import { Modal, Descriptions, Button } from "antd";
import { dateFormat } from "@/utils/format";
import { PayMethod, WXPayType } from "@/utils/enum";
import Spin from "@/components/Spin";
import Tag from "@/components/Tag";

const Detail = props => {
  const {
    alias,
    api,
    appid,
    appsecret,
    callback_url,
    created,
    crypt_type,
    currency,
    decimals,
    display_name,
    enc_type,
    expires,
    extra,
    fee,
    gateway,
    h5_on,
    id,
    is_3rd,
    is_active,
    name,
    note,
    pay_method,
    pay_type,
    pc_on,
    random_decimals,
    rating,
    resp_type,
    sign_type,
    type,
    updated,
    whitelist,
  } = props.data;
  return (
    <Modal
      width="700px"
      title="支付网关明细"
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
          <Descriptions.Item label="名称">{name}</Descriptions.Item>
          <Descriptions.Item label="alias">{alias}</Descriptions.Item>
          <Descriptions.Item label="api">{api}</Descriptions.Item>
          <Descriptions.Item label="appid">{appid}</Descriptions.Item>
          <Descriptions.Item label="appsecret">{appsecret}</Descriptions.Item>
          <Descriptions.Item label="callback_url">
            {callback_url}
          </Descriptions.Item>
          <Descriptions.Item label="crypt_type">{crypt_type}</Descriptions.Item>

          <Descriptions.Item label="currency">{currency}</Descriptions.Item>
          <Descriptions.Item label="decimals">{decimals}</Descriptions.Item>
          <Descriptions.Item label="display_name">
            {display_name}
          </Descriptions.Item>
          <Descriptions.Item label="enc_type">{enc_type}</Descriptions.Item>
          <Descriptions.Item label="expires">{expires}</Descriptions.Item>
          <Descriptions.Item label="extra">
            {extra && (
              <ol>
                {JSON.parse(extra).map(i => (
                  <li>
                    <strong>{i.name}</strong> : {i.residency}
                  </li>
                ))}
              </ol>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="fee">{fee}</Descriptions.Item>
          <Descriptions.Item label="gateway">{gateway}</Descriptions.Item>
          <Descriptions.Item label="h5_on">{h5_on}</Descriptions.Item>
          <Descriptions.Item label="is_3rd">{is_3rd}</Descriptions.Item>
          <Descriptions.Item label="pay_method">
            {PayMethod[pay_method]}
          </Descriptions.Item>
          <Descriptions.Item label="pay_type">
            {WXPayType[pay_type]}
          </Descriptions.Item>
          <Descriptions.Item label="pc_on">{pc_on}</Descriptions.Item>
          <Descriptions.Item label="random_decimals">
            {random_decimals}
          </Descriptions.Item>
          <Descriptions.Item label="rating">{rating}</Descriptions.Item>
          <Descriptions.Item label="resp_type">{resp_type}</Descriptions.Item>
          <Descriptions.Item label="sign_type">{sign_type}</Descriptions.Item>
          <Descriptions.Item label="type">{type}</Descriptions.Item>
          <Descriptions.Item label="whitelist">{whitelist}</Descriptions.Item>
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
