import React from "react";
import { Space } from "antd";
import {
  selectAgentAcctLog,
  getAgentAcctLogs,
} from "@/store/slice/agentAcctLog";
import { SearchFormFactory } from "@/components/factory/FormFactory";
import { NormalTable } from "@/components/factory/TableFactory";
import { dateFormat, priceFormat } from "@/utils/format";
import { Currency, AgentAcctLogType } from "@/utils/enum";
import { useList } from "@/utils/hook";

const AgentAcctLog = () => {
  const searchFields = {
    id__in: { type: "string", label: "ID" },
    agent_acct_id__in: { type: "string", label: "商户账户ID" },
    agent_user_id__in: { type: "string", label: "商户用户ID" },
    order_no__in: { type: "string", label: "订单号" },
    created__btw: { type: "rangeDate", label: "创建日期" },
  };

  const {
    res: { list, meta },
    loading: listLoading,
    handleGetList,
    handleChangePage,
    handleChange,
  } = useList(getAgentAcctLogs, selectAgentAcctLog);

  const columns = [
    { title: "ID", dataIndex: "id", sorter: true },
    { title: "代理商账户_账户ID", dataIndex: "agent_acct_id", sorter: true },
    { title: "代理商账户_用户ID", dataIndex: "agent_user_id", sorter: true },
    { title: "代理商_ID", dataIndex: "agent_id", sorter: true },
    { title: "代理商_名称", dataIndex: "agent_name", sorter: true },
    {
      title: "款项类型",
      dataIndex: "type",
      render: val => AgentAcctLogType[val],
      sorter: true,
    },
    {
      title: "变动前余额",
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
      title: "交易金额",
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
    {
      title: "订单金额/支付金额",
      dataIndex: "order_amount",
      render: (val, record) => priceFormat({ val, currency: record.currency }),
      sorter: true,
      className: "text-nowrap",
    },
    { title: "订单号", dataIndex: "order_no" },
    { title: "第三方订单号", dataIndex: "trans_no" },
    { title: "备注", dataIndex: "note" },
    { title: "操作人ID", dataIndex: "op_user_id" },
    { title: "操作人", dataIndex: "op_username" },
    { title: "客户端IP", dataIndex: "client_ip" },
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
  ];
  const defaultColumns = [
    "id",
    "agent_acct_id",
    "agent_user_id",
    "agent_id",
    "agent_name",
    "type",
    "b1",
    "b2",
    "amount",
    "order_amount",
    "created",
    "content_type",
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

export default AgentAcctLog;
