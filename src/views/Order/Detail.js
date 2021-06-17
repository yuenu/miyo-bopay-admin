import { Modal, Descriptions, Button } from "antd";
import { dateFormat, priceFormat } from "@/utils/format";
import {
  OrderStatus,
  WXPayType,
  PayMethod,
  PayStatus,
  Currency,
  NotifyStatus,
  ApprovalStatus,
} from "@/utils/enum";

import Spin from "@/components/Spin";
import Tag from "@/components/Tag";
const Detail = props => {
  const {
    id,
    order_no,
    trans_no,
    app_id,
    developer_id,
    userid,
    name,
    status,
    pay_type,
    pay_method,
    payer_name,
    payer_cred,
    device_type,
    pay_status,
    paid_at,
    approval_status,
    notify_status,
    notified_at,
    client_ip,
    failure_code,
    failure_msg,
    amount,
    amount_paid,
    bonus,
    currency,
    paid,
    approved,
    is_crypto,
    is_online,
    settled,
  } = props.data;
  return (
    <Modal
      title="订单明細"
      visible={props.visible}
      onCancel={props.onCancel}
      width={1024}
      footer={[
        <Button key="close" type="primary" onClick={props.onCancel}>
          关闭
        </Button>,
      ]}
    >
      <Spin spinning={props.loading}>
        <Descriptions column={{ xs: 1, sm: 1, md: 2 }} bordered>
          <Descriptions.Item label="ID">{id}</Descriptions.Item>
          <Descriptions.Item label="订单号">{order_no}</Descriptions.Item>
          <Descriptions.Item label="第三方订单号">{trans_no}</Descriptions.Item>
          <Descriptions.Item label="AppID">{app_id}</Descriptions.Item>
          <Descriptions.Item label="商戶ID">{developer_id}</Descriptions.Item>
          <Descriptions.Item label="会员ID">{userid}</Descriptions.Item>
          <Descriptions.Item label="会员姓名">{name || ""}</Descriptions.Item>
          <Descriptions.Item label="订单状态">
            {OrderStatus[status]}
          </Descriptions.Item>
          <Descriptions.Item label="支付类别">
            {WXPayType[pay_type]}
          </Descriptions.Item>
          <Descriptions.Item label="付款方式">
            {PayMethod[pay_method]}
          </Descriptions.Item>
          <Descriptions.Item label="付款人姓名" span={2}>
            {payer_name}
          </Descriptions.Item>
          <Descriptions.Item label="付款人信息" span={2}>
            {JSON.stringify(payer_cred)}
          </Descriptions.Item>
          <Descriptions.Item label="设备类型">{device_type}</Descriptions.Item>
          <Descriptions.Item label="支付状态">
            {PayStatus[pay_status] || ""}
          </Descriptions.Item>
          <Descriptions.Item label="支付时间">
            {dateFormat(paid_at)}
          </Descriptions.Item>
          <Descriptions.Item label="审核状态">
            {ApprovalStatus[approval_status]}
          </Descriptions.Item>
          <Descriptions.Item label="通知状态">
            {NotifyStatus[notify_status]}
          </Descriptions.Item>
          <Descriptions.Item label="通知时间">
            {dateFormat(notified_at)}
          </Descriptions.Item>
          <Descriptions.Item label="IP">{client_ip}</Descriptions.Item>
          <Descriptions.Item label="错误代码">{failure_code}</Descriptions.Item>
          <Descriptions.Item label="错误信息">{failure_msg}</Descriptions.Item>
          <Descriptions.Item label="订单金额">
            {priceFormat({ val: amount, currency })}
          </Descriptions.Item>
          <Descriptions.Item label="实际付款金额">
            {priceFormat({ val: amount_paid, currency })}
          </Descriptions.Item>
          <Descriptions.Item label="赠送金额">
            {priceFormat({ val: bonus, currency })}
          </Descriptions.Item>
          <Descriptions.Item label="货币类型">
            {Currency[currency]}
          </Descriptions.Item>
          <Descriptions.Item label="付款成功">
            <Tag val={paid} />
          </Descriptions.Item>
          <Descriptions.Item label="审核通过">
            <Tag val={approved} />
          </Descriptions.Item>
          <Descriptions.Item label="是否加密货币">
            <Tag val={is_crypto} />
          </Descriptions.Item>
          <Descriptions.Item label="是否在线订单">
            <Tag val={is_online} />
          </Descriptions.Item>
          <Descriptions.Item label="清算成功">
            <Tag val={settled} />
          </Descriptions.Item>
        </Descriptions>
      </Spin>
    </Modal>
  );
};

export default Detail;
