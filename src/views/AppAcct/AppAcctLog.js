import React from "react";
import { Space } from "antd";
import { selectAppAcctLog, getAppAcctLogs } from "@/store/slice/appAcctLog";
import { CryptoAcctLogsType, Currency } from "@/utils/enum";
import { dateFormat, priceFormat } from "@/utils/format";
import { useList } from "@/utils/hook";
import { SearchFormFactory } from "@/components/factory/FormFactory";
import { NormalTable } from "@/components/factory/TableFactory";

const AppAcctLog = () => {
  const searchFields = {
    id__in: { type: "string", label: "ID" },
    app_acct_id__in: { type: "string", label: "商户账户ID" },
    app_user_id__in: { type: "string", label: "商户用户ID" },
    order_no__in: { type: "string", label: "订单号" },
    trans_no__in: { type: "string", label: "第三方订单号" },
    created__btw: { type: "rangeDate", label: "创建日期" },
  };

  const {
    res: { list, meta },
    loading: listLoading,
    handleGetList,
    handleChangePage,
    handleChange,
  } = useList(getAppAcctLogs, selectAppAcctLog);

  const columns = [
    { title: "ID", dataIndex: "id", sorter: true },
    { title: "商户账户ID", dataIndex: "app_acct_id", sorter: true },
    { title: "商户用户ID", dataIndex: "app_user_id", sorter: true },
    {
      title: "交易类型",
      dataIndex: "type",
      render: val => CryptoAcctLogsType[val],
      sorter: true,
    },
    {
      title: "变动前金额",
      dataIndex: "b1",
      render: (val, record) => priceFormat({ val, currency: record.currency }),
      sorter: true,
      className: "text-nowrap",
    },
    {
      title: "变动后余额",
      dataIndex: "b2",
      render: (val, record) => priceFormat({ val, currency: record.currency }),
      sorter: true,
      className: "text-nowrap",
    },
    {
      title: "金额",
      dataIndex: "amount",
      render: (val, record) => priceFormat({ val, currency: record.currency }),
      sorter: true,
      className: "text-nowrap",
    },
    {
      title: "币种",
      dataIndex: "currency",
      render: val => Currency[val] || "",
      className: "text-nowrap",
    },
    { title: "订单号", dataIndex: "order_no" },
    { title: "第三方订单号", dataIndex: "trans_no" },
    { title: "客户端IP", dataIndex: "client_ip" },
    { title: "交易内容", dataIndex: "subject" },
    { title: "交易渠道，网关名称", dataIndex: "channel" },
    { title: "账变日志关联的对象类型", dataIndex: "content_type" },
    { title: "账变日志关联的对象ID", dataIndex: "content_id" },
    { title: "操作人ID", dataIndex: "op_user_id" },
    { title: "操作人", dataIndex: "op_username" },
    {
      title: "订单金额",
      dataIndex: "order_amount",
      render: (val, record) => priceFormat({ val, currency: record.currency }),
      sorter: true,
      className: "text-nowrap",
    },
    {
      title: "手续费",
      dataIndex: "fee",
      render: (val, record) => priceFormat({ val, currency: record.currency }),
      sorter: true,
      className: "text-nowrap",
    },
    {
      title: "创建日期",
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
    { title: "备注", dataIndex: "note" },
  ];
  const defaultColumns = [
    "id",
    "app_acct_id",
    "app_user_id",
    "type",
    "b1",
    "b2",
    "amount",
    "order_no",
    "trans_no",
    "action",
  ];
  return (
    <Space direction="vertical" size="middle" className="w-100">
      <SearchFormFactory fields={searchFields} handleSubmit={handleGetList} />
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
    </Space>
  );
};
export default AppAcctLog;
