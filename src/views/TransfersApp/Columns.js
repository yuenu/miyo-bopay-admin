import { dateFormat, priceFormat } from "@/utils/format";
import { Currency, transferStatus } from "@/utils/enum";
import Tag from "@/components/Tag";
export const columns = [
  { title: "ID", dataIndex: "id", sorter: true },
  { title: "开发者订单号", dataIndex: "order_no" },
  { title: "第三方订单号", dataIndex: "trans_no" },
  { title: "AppID", dataIndex: "app_id", sorter: true },
  { title: "App用户ID", dataIndex: "app_user_id", sorter: true },
  { title: "app管理-姓名", dataIndex: "app_name_cn", sorter: true },
  { title: "代理ID", dataIndex: "agent_id" },
  { title: "代理姓名", dataIndex: "agent_name" },
  {
    title: "用户账户",
    dataIndex: "account",
  },
  {
    title: "银行卡开户行",
    dataIndex: "bank_name",
  },
  {
    title: "出款银行卡ID",
    dataIndex: "card_id",
  },
  {
    title: "出款钱包ID",
    dataIndex: "crypto_wallet_id",
  },
  {
    title: "真实姓名",
    dataIndex: "name",
  },
  {
    title: "出款金额",
    dataIndex: "amount",
    render: (val, record) => priceFormat({ val, currency: record.currency }),
    sorter: true,
    className: "text-nowrap",
  },
  {
    title: "实际出款金额",
    dataIndex: "amount_paid",
    render: (val, record) => priceFormat({ val, currency: record.currency }),
    sorter: true,
    className: "text-nowrap",
  },
  {
    title: "出款货币类型",
    dataIndex: "currency",
    render: val => Currency[val] || "",
    sorter: true,
    className: "text-nowrap",
  },
  {
    title: "支付网关类名",
    dataIndex: "gateway",
    sorter: true,
  },
  {
    title: "是否通过审核",
    dataIndex: "approved",
    render: val => <Tag val={val} />,
  },
  {
    title: "审核状态",
    dataIndex: "approval_status",
    render: val => transferStatus[val],
  },
  {
    title: "审核人ID",
    dataIndex: "approver_id",
  },
  {
    title: "审核通过时间",
    dataIndex: "approved_at",
    width: 120,
    render: val => dateFormat(val),
    sorter: true,
  },
  {
    title: "审核备注",
    dataIndex: "comments",
  },
  {
    title: "网关ID",
    dataIndex: "gateway_id",
    sorter: true,
  },
  {
    title: "网关名称",
    dataIndex: "gateway_name",
    sorter: true,
  },
  {
    title: "创建时间",
    dataIndex: "created",
    className: "text-nowrap",
    render: val => dateFormat(val),
    sorter: true,
  },
  {
    title: "更新日期",
    dataIndex: "updated",
    className: "text-nowrap",
    render: val => dateFormat(val),
    sorter: true,
  },
  {
    title: "是否取消",
    dataIndex: "canceled",
    render: val => <Tag val={val} />,
  },
  {
    title: "取消时间",
    dataIndex: "canceled_at",
    className: "text-nowrap",
    render: val => dateFormat(val),
    sorter: true,
  },
  {
    title: "过期时间",
    dataIndex: "expired_at",
    className: "text-nowrap",
    render: val => dateFormat(val),
    sorter: true,
  },
  {
    title: "是否过期",
    dataIndex: "expired",
    render: val => <Tag val={val} />,
  },

  {
    title: "付款人ID",
    dataIndex: "paid_id",
    sorter: true,
  },
  {
    title: "是否已付款",
    dataIndex: "paid",
    render: val => <Tag val={val} />,
  },
  {
    title: "付款时间",
    dataIndex: "paid_at",
    className: "text-nowrap",
    render: val => dateFormat(val),
    sorter: true,
  },
  {
    title: "发起订单IP",
    dataIndex: "client_ip",
    sorter: true,
  },
  {
    title: "是否成功",
    dataIndex: "succeeded",
    render: val => <Tag val={val} />,
  },
  {
    title: "失败状态码",
    dataIndex: "failure_code",
  },
  {
    title: "失败原因",
    dataIndex: "failure_msg",
  },
  {
    title: "是否回调",
    dataIndex: "notified",
    render: val => <Tag val={val} />,
  },
  {
    title: "回调时间",
    dataIndex: "notified_at",
    className: "text-nowrap",
    render: val => dateFormat(val),
    sorter: true,
  },
  {
    title: "回调url",
    dataIndex: "notify_url",
  },
  {
    title: "回调的状态",
    dataIndex: "notify_status",
    render: val => transferStatus[val],
  },
  {
    title: "订单状态",
    dataIndex: "status",
    render: val => transferStatus[val],
  },
  {
    title: "补充信息",
    dataIndex: "extra",
    render: val => JSON.stringify(val),
  },
  {
    title: "代付凭证",
    dataIndex: "credential",
  },
  {
    title: "已清算",
    dataIndex: "settled",
    render: val => <Tag val={val} />,
  },

  {
    title: "备注",
    dataIndex: "note",
    sorter: true,
  },
];
