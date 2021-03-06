import { OrderStatus, WXPayType, PayMethod, Currency } from "@/utils/enum";
import { priceFormat, dateFormat } from "@/utils/format";
import Tag from "@/components/Tag";
const columns = [
  { title: "ID", dataIndex: "id", sorter: true },
  { title: "订单号", dataIndex: "order_no" },
  { title: "第三方订单号", dataIndex: "trans_no" },
  { title: "AppID", dataIndex: "app_id", sorter: true },
  { title: "商戶ID", dataIndex: "developer_id", sorter: true },
  { title: "会员ID", dataIndex: "userid", sorter: true },
  { title: "会员姓名", dataIndex: "payer_name", width: 100 },
  { title: "帐户名称", dataIndex: "acct_name" },
  {
    title: "通道名称",
    dataIndex: "gateway_name",
  },
  {
    title: "订单状态",
    dataIndex: "status",
    render: val => OrderStatus[val] || "",
    width: 100,
  },
  {
    title: "支付类别",
    dataIndex: "pay_type",
    render: val => WXPayType[val] || "",
    width: 100,
  },
  {
    title: "付款方式",
    dataIndex: "pay_method",
    className: "text-nowrap",
    render: val => PayMethod[val] || "",
  },
  {
    title: "付款人信息",
    dataIndex: "payer_cred",
    width: 100,
    render: val => JSON.stringify(val),
  },
  { title: "设备类型", dataIndex: "device_type", width: 100 },
  {
    title: "支付状态",
    dataIndex: "pay_status",
    render: val => OrderStatus[val] || "",
    width: 100,
  },
  {
    title: "支付时间",
    dataIndex: "paid_at",
    className: "text-nowrap",
    render: val => dateFormat(val),
    sorter: true,
  },
  {
    title: "审核状态",
    dataIndex: "approval_status",
    render: val => OrderStatus[val] || "",
  },
  {
    title: "审核人员",
    dataIndex: "approvers",
  },
  {
    title: "通知状态",
    dataIndex: "notify_status",
    render: val => OrderStatus[val] || "",
  },
  {
    title: "通知时间",
    dataIndex: "notified_at",
    className: "text-nowrap",
    render: val => dateFormat(val),
    sorter: true,
  },
  { title: "IP", dataIndex: "client_ip" },
  { title: "错误代码", dataIndex: "failure_code", width: 100 },
  { title: "错误信息", dataIndex: "failure_msg", width: 100 },
  {
    title: "支付金额",
    dataIndex: "amount",
    render: (val, record) => priceFormat({ val, currency: record.currency }),
    className: "text-nowrap",
    sorter: true,
  },
  {
    title: "实际付款金额",
    dataIndex: "amount_paid",
    render: (val, record) => priceFormat({ val, currency: record.currency }),
    className: "text-nowrap",
    sorter: true,
  },
  {
    title: "赠送金额",
    dataIndex: "bonus",
    render: (val, record) => priceFormat({ val, currency: record.currency }),
    className: "text-nowrap",
    sorter: true,
  },
  {
    title: "随机金额",
    dataIndex: "amount_rand",
    render: (val, record) => priceFormat({ val, currency: record.currency }),
    className: "text-nowrap",
    sorter: true,
  },
  {
    title: "货币类型",
    dataIndex: "currency",
    render: val => Currency[val] || "",
    className: "text-nowrap",
  },
  {
    title: "付款成功",
    dataIndex: "paid",
    render: val => <Tag val={val} />,
  },
  {
    title: "审核通过",
    dataIndex: "approved",
    render: val => <Tag val={val} />,
  },
  {
    title: "是否加密货币",
    dataIndex: "is_crypto",
    render: val => <Tag val={val} />,
  },
  {
    title: "是否在线订单",
    dataIndex: "is_online",
    render: val => <Tag val={val} />,
  },
  {
    title: "清算成功",
    dataIndex: "settled",
    render: val => <Tag val={val} />,
  },
  {
    title: "扣除通道费后金额汇总",
    dataIndex: "amount_gateway",
    render: (val, record) => priceFormat({ val, currency: record.currency }),
  },
  {
    title: "扣除商户费(商户+通道)后金额汇总",
    dataIndex: "amount_app",
    render: (val, record) => priceFormat({ val, currency: record.currency }),
  },
  {
    title: "累计盈利金额",
    dataIndex: "amount_app_fee",
    render: (val, record) => priceFormat({ val, currency: record.currency }),
  },
  {
    title: "创建日期",
    dataIndex: "created",
    render: val => dateFormat(val),
    className: "text-nowrap",
    sorter: true,
  },
  {
    title: "更新日期",
    dataIndex: "updated",
    render: val => dateFormat(val),
    className: "text-nowrap",
    sorter: true,
  },
];
export const sumColumns = [
  {
    title: "订单次数",
    dataIndex: "total_times",
  },
  {
    title: "订单成功次数",
    dataIndex: "total_succeeded_times",
  },
  {
    title: "订单成功金额",
    dataIndex: "total_succeeded_amount",
    render: val => priceFormat({ val, currency: 0 }),
  },
];

export default columns;
