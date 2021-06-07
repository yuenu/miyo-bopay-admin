import { Modal, Descriptions, Tag, Button } from "antd";
import { dateFormat } from "@/utils/format";
import Spin from "@/components/Spin";
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
  const payerCredArr = JSON.parse(payer_cred || "[]");
  return (
    <Modal
      title="職員明細"
      visible={props.visible}
      onCancel={props.onCancel}
      width={1024}
      footer={[
        <Button key="close" type="primary" onClick={props.onCancel}>
          關閉
        </Button>,
      ]}
    >
      <Spin spinning={props.loading}>
        <Descriptions column={{ xs: 1, sm: 1, md: 2 }} bordered>
          <Descriptions.Item label="ID">{id}</Descriptions.Item>
          <Descriptions.Item label="訂單號">{order_no}</Descriptions.Item>
          <Descriptions.Item label="第三方訂單號">{trans_no}</Descriptions.Item>
          <Descriptions.Item label="AppID">{app_id}</Descriptions.Item>
          <Descriptions.Item label="商戶ID">{developer_id}</Descriptions.Item>
          <Descriptions.Item label="會員ID">{userid}</Descriptions.Item>
          <Descriptions.Item label="會員姓名">{name || ""}</Descriptions.Item>
          <Descriptions.Item label="訂單狀態">{status}</Descriptions.Item>
          <Descriptions.Item label="支付類別">{pay_type}</Descriptions.Item>
          <Descriptions.Item label="付款方式">{pay_method}</Descriptions.Item>
          <Descriptions.Item label="付款人姓名" span={2}>
            {payer_name}
          </Descriptions.Item>
          <Descriptions.Item label="付款人信息" span={2}>
            <ul>
              {payerCredArr.map(i => (
                <li key={i.name}>
                  {i.name}: {i.residency}
                </li>
              ))}
            </ul>
          </Descriptions.Item>
          <Descriptions.Item label="設備類型">{device_type}</Descriptions.Item>
          <Descriptions.Item label="支付狀態">{pay_status}</Descriptions.Item>
          <Descriptions.Item label="支付時間">
            {dateFormat(paid_at?.Time)}
          </Descriptions.Item>
          <Descriptions.Item label="審核狀態">
            {approval_status}
          </Descriptions.Item>
          <Descriptions.Item label="通知狀態">
            {notify_status}
          </Descriptions.Item>
          <Descriptions.Item label="通知時間">
            {dateFormat(notified_at?.Time)}
          </Descriptions.Item>
          <Descriptions.Item label="IP">{client_ip}</Descriptions.Item>
          <Descriptions.Item label="錯誤代碼">{failure_code}</Descriptions.Item>
          <Descriptions.Item label="錯誤信息">{failure_msg}</Descriptions.Item>
          <Descriptions.Item label="訂單金額">{amount}</Descriptions.Item>
          <Descriptions.Item label="實際付款金額">
            {amount_paid}
          </Descriptions.Item>
          <Descriptions.Item label="贈送金額">{bonus}</Descriptions.Item>
          <Descriptions.Item label="貨幣類型">{currency}</Descriptions.Item>
          <Descriptions.Item label="付款成功">
            <Tag color={paid ? "green" : "default"}>{paid?.toString()}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="審核通過">
            <Tag color={approved ? "green" : "default"}>
              {approved?.toString()}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="是否加密貨幣">
            <Tag color={is_crypto ? "green" : "default"}>
              {is_crypto?.toString()}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="是否在線訂單">
            <Tag color={is_online ? "green" : "default"}>
              {is_online?.toString()}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="清算成功">
            <Tag color={settled ? "green" : "default"}>
              {settled?.toString()}
            </Tag>
          </Descriptions.Item>
        </Descriptions>
      </Spin>
    </Modal>
  );
};

export default Detail;
