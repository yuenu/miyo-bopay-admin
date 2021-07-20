import {
  OrderStatus,
  WXPayType,
  PayMethod,
  PayStatus,
  Currency,
  NotifyStatus,
  ApprovalStatus,
} from "@/utils/enum";
import { priceFormat, dateFormat } from "@/utils/format";
import Tag from "@/components/Tag";
const columns = [
  { title: "ID", dataIndex: "id", sorter: true },
  { title: "订单号", dataIndex: "order_no" },
  { title: "第三方订单号", dataIndex: "trans_no" },
  { title: "AppID", dataIndex: "app_id", sorter: true },
  { title: "商戶ID", dataIndex: "developer_id", sorter: true },
  { title: "会员ID", dataIndex: "userid", sorter: true },
  { title: "会员姓名", dataIndex: "name", width: 100 },
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
    width: 170,
    render: val => PayMethod[val] || "",
  },
  { title: "付款人姓名", dataIndex: "payer_name", width: 100 },
  { title: "付款人信息", dataIndex: "payer_cred", width: 100 },
  { title: "设备类型", dataIndex: "device_type", width: 100 },
  {
    title: "支付状态",
    dataIndex: "pay_status",
    render: val => PayStatus[val] || "",
    width: 100,
  },
  {
    title: "支付时间",
    dataIndex: "paid_at",
    width: 150,
    render: val => dateFormat(val),
    sorter: true,
  },
  {
    title: "审核状态",
    dataIndex: "approval_status",
    render: val => ApprovalStatus[val] || "",
    width: 100,
  },
  {
    title: "审核人员",
    dataIndex: "approvers",
  },
  {
    title: "通知状态",
    dataIndex: "notify_status",
    render: val => NotifyStatus[val] || "",
    width: 100,
  },
  {
    title: "通知时间",
    dataIndex: "notified_at",
    width: 170,
    render: val => dateFormat(val),
    sorter: true,
  },
  { title: "IP", dataIndex: "client_ip" },
  { title: "错误代码", dataIndex: "failure_code", width: 100 },
  { title: "错误信息", dataIndex: "failure_msg", width: 100 },
  {
    title: "订单金额",
    dataIndex: "amount",
    render: (val, record) => priceFormat({ val, currency: record.currency }),
    width: 100,
    sorter: true,
  },
  {
    title: "实际付款金额",
    dataIndex: "amount_paid",
    render: (val, record) => priceFormat({ val, currency: record.currency }),
    width: 100,
    sorter: true,
  },
  {
    title: "赠送金额",
    dataIndex: "bonus",
    render: (val, record) => priceFormat({ val, currency: record.currency }),
    width: 100,
    sorter: true,
  },
  {
    title: "货币类型",
    dataIndex: "currency",
    render: val => Currency[val] || "",
    width: 100,
  },
  {
    title: "付款成功",
    dataIndex: "paid",
    render: val => <Tag val={val} />,
    width: 100,
  },
  {
    title: "审核通过",
    dataIndex: "approved",
    render: val => <Tag val={val} />,
    width: 100,
  },
  {
    title: "是否加密货币",
    dataIndex: "is_crypto",
    render: val => <Tag val={val} />,
    width: 100,
  },
  {
    title: "是否在线订单",
    dataIndex: "is_online",
    render: val => <Tag val={val} />,
    width: 100,
  },
  {
    title: "清算成功",
    dataIndex: "settled",
    render: val => <Tag val={val} />,
    width: 100,
  },
  {
    title: "创建日期",
    dataIndex: "created",
    render: val => dateFormat(val),
    width: 120,
    sorter: true,
  },
  {
    title: "更新日期",
    dataIndex: "updated",
    render: val => dateFormat(val),
    sorter: true,
  },
];

export default columns;