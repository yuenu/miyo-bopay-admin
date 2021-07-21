import { useState } from "react";
import { Space, Button } from "antd";
import { selectTransfer, getTransfers } from "@/store/slice/transfer";
import { SearchFormFactory } from "@/components/factory/FormFactory";
import { useList } from "@/utils/hook";
import { dateFormat, priceFormat } from "@/utils/format";
import { Currency } from "@/utils/enum";
import JsonModal from "@/components/JsonModal";
import Detail from "@/components/Detail";
import { NormalTable } from "@/components/factory/TableFactory";
import Tag from "@/components/Tag";

const Transfer = ({ params }) => {
  const searchFields = {
    id__in: { type: "string", label: "ID" },
    app_id__in: { type: "string", label: "AppID" },
    app_user_id__in: { type: "string", label: "App用户ID" },
    created__btw: { type: "rangeDate", label: "创建时间" },
  };
  const {
    res: { list, meta },
    loading: listLoading,
    handleSearch,
    handleChangePage,
    handleChange,
  } = useList(getTransfers, selectTransfer, params);

  const [jsonVisible, setJsonVisible] = useState(false);
  const [currentRow, setCurrentRow] = useState({});
  const handleJsonClick = record => {
    setCurrentRow(record);
    setJsonVisible(true);
  };

  const [detailVisible, setDetailVisible] = useState(false);
  const handleDetailClick = record => {
    setCurrentRow(record);
    setDetailVisible(true);
  };

  const columns = [
    { title: "ID", dataIndex: "id", sorter: true },
    { title: "AppID", dataIndex: "app_id", sorter: true },
    { title: "App用户ID", dataIndex: "app_user_id", sorter: true },
    { title: "开发者ID", dataIndex: "developer_id", sorter: true },
    { title: "代理ID", dataIndex: "agent_id" },
    { title: "代理姓名", dataIndex: "agent_name" },
    { title: "开发者订单号", dataIndex: "order_no" },
    { title: "第三方订单号", dataIndex: "trans_no" },
    {
      title: "出款金额",
      dataIndex: "amount",
      render: (val, record) => priceFormat({ val, currency: record.currency }),
      sorter: true,
    },
    {
      title: "实际出款金额",
      dataIndex: "amount_paid",
      render: (val, record) => priceFormat({ val, currency: record.currency }),
      sorter: true,
    },
    {
      title: "出款货币类型",
      dataIndex: "currency",
      render: val => Currency[val] || "",
      sorter: true,
    },
    {
      title: "支付网关类名",
      dataIndex: "gateway",
      sorter: true,
    },
    {
      title: "网关ID",
      dataIndex: "gateway_id",
      sorter: true,
    },
    {
      title: "创建时间",
      dataIndex: "created",
      width: 120,
      render: val => dateFormat(val),
      sorter: true,
    },
    {
      title: "更新日期",
      dataIndex: "updated",
      width: 120,
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
      width: 120,
      render: val => dateFormat(val),
      sorter: true,
    },
    {
      title: "过期时间",
      dataIndex: "expired_at",
      width: 120,
      render: val => dateFormat(val),
      sorter: true,
    },
    {
      title: "是否过期",
      dataIndex: "expired",
      render: val => <Tag val={val} />,
    },
    {
      title: "是否通过审核",
      dataIndex: "approved",
      render: val => <Tag val={val} />,
    },
    {
      title: "审核状态",
      dataIndex: "approval_status",
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
      width: 120,
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
      width: 120,
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
    },
    {
      title: "订单状态",
      dataIndex: "status",
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
      title: "用户账户",
      dataIndex: "account",
    },
    {
      title: "用户姓名",
      dataIndex: "name",
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
      title: "备注",
      dataIndex: "note",
      sorter: true,
    },
    {
      title: "动作",
      dataIndex: "action",
      align: "center",
      fixed: "right",
      render: (_, record) => (
        <Space>
          <Button
            size="small"
            onClick={() => handleJsonClick(record)}
            type="primary"
          >
            json
          </Button>
          <Button
            size="small"
            onClick={() => handleDetailClick(record)}
            type="primary"
          >
            查看
          </Button>
        </Space>
      ),
    },
  ];
  const defaultColumns = [
    "id",
    "app_id",
    "app_user_id",
    "developer_id",
    "agent_id",
    "order_no",
    "currency",
    "amount",
    "action",
  ];
  return (
    <Space direction="vertical" size="middle" className="w-100">
      <SearchFormFactory fields={searchFields} handleSubmit={handleSearch} />
      <NormalTable
        allColumns={columns}
        defaultColumns={defaultColumns}
        dataSource={list}
        meta={meta}
        onChangePage={handleChangePage}
        onChange={handleChange}
        loading={listLoading}
        onShowSizeChange={handleChangePage}
      />
      <JsonModal
        width={650}
        visible={jsonVisible}
        data={currentRow}
        onCancel={() => setJsonVisible(false)}
        loading={false}
      />
      <Detail
        title="代付明細"
        visible={detailVisible}
        data={currentRow}
        onCancel={() => setDetailVisible(false)}
        loading={false}
        columns={columns.filter(i => i.dataIndex !== "action")}
      />
    </Space>
  );
};
export default Transfer;
