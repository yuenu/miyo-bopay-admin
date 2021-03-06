import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Space, message } from "antd";
import {
  selectAgentAcct,
  getAgentAccts,
  getAgentAcct,
  balanceAgentAcct,
} from "@/store/slice/agentAcct";
import { selectAuth } from "@/store/slice/auth";
import { SearchFormFactory } from "@/components/factory/FormFactory";
import { NormalTable } from "@/components/factory/TableFactory";
import EditableConfirm from "@/components/EditableConfirm";
import Detail from "@/components/Detail";
import JsonModal from "@/components/JsonModal";
import { useList, useDetail } from "@/utils/hook";
import { dateFormat, priceFormat } from "@/utils/format";
import { Currency } from "@/utils/enum";

const AgentAcct = () => {
  const { user } = useSelector(selectAuth);
  const searchFields = {
    id__in: { type: "string", label: "ID" },
    agent_id__in: { type: "string", label: "代理商ID" },
    agent_name__k: { type: "string", label: "代理商名称" },
    currency: {
      type: "select",
      label: "币种",
      options: Currency,
    },
    created__btw: { type: "rangeDate", label: "创建日期" },
  };
  const {
    res: { list, meta },
    loading: listLoading,
    handleSearch,
    handleChangePage,
    handleChange,
    handleGetList,
  } = useList(getAgentAccts, selectAgentAcct);

  const [detailId, setDetailId] = useState(null);
  const {
    currentRow,
    loading: detailLoading,
    setLoading: setDetailLoading,
  } = useDetail({ action: getAgentAcct, id: detailId }, selectAgentAcct);
  const [detailVisible, setDetailVisible] = useState(false);
  const handleDetailClick = async id => {
    setDetailId(id);
    setDetailVisible(true);
  };

  const [jsonVisible, setJsonVisible] = useState(false);
  const handleJsonClick = async id => {
    setDetailId(id);
    setJsonVisible(true);
  };
  useEffect(() => {
    jsonVisible || setDetailId(null);
  }, [jsonVisible]);

  const fields = [
    {
      label: "增加或减少金額",
      name: "amount",
      inputType: "price",
      required: true,
    },
    {
      label: "备注",
      name: "note",
      inputType: "string",
    },
  ];
  const [balanceVisible, setBalanceVisible] = useState(false);
  const handleBalanceClick = record => {
    setDetailId(record.id);
    setBalanceVisible(true);
  };
  const handleCancelBalance = () => {
    setBalanceVisible(false);
    setDetailId(null);
  };
  const handleBalance = async formModel => {
    setDetailLoading(true);
    const { status } = await balanceAgentAcct({
      id: currentRow.id,
      formModel: { ...formModel, user_id: user.id, username: user.username },
    });
    setDetailLoading(false);
    if (status !== 200) return;
    handleCancelBalance();
    message.success(`已更新余额`);
    handleGetList({ page: meta.current });
  };

  const columns = [
    { title: "ID", dataIndex: "id", sorter: true },
    { title: "用户ID", dataIndex: "agent_user_id", sorter: true },
    { title: "用户名称", dataIndex: "agent_user_name", sorter: true },
    { title: "代理商ID", dataIndex: "agent_id", sorter: true },
    { title: "代理商名称", dataIndex: "agent_name", sorter: true },
    {
      title: "余额",
      dataIndex: "balance",
      render: (val, record) => priceFormat({ val, currency: record.currency }),
      className: "text-nowrap",
      sorter: true,
    },
    {
      title: "圈存金额",
      dataIndex: "block_amount",
      render: (val, record) => priceFormat({ val, currency: record.currency }),
      className: "text-nowrap",
      sorter: true,
    },
    {
      title: "币种",
      dataIndex: "currency",
      render: val => Currency[val] || "",
      className: "text-nowrap",
    },
    { title: "创建者用戶ID", dataIndex: "userid", sorter: true },
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
    {
      title: "动作",
      dataIndex: "action",
      align: "center",
      fixed: "right",
      render: (_, record) => (
        <Space>
          <Button
            size="small"
            onClick={() => handleJsonClick(record.id)}
            type="link"
            className="p-0"
          >
            json
          </Button>
          <Button
            size="small"
            onClick={() => handleDetailClick(record.id)}
            type="link"
            className="p-0"
          >
            查看
          </Button>
          <Button
            size="small"
            onClick={() => handleBalanceClick(record)}
            type="link"
            className="p-0"
          >
            修改余额
          </Button>
        </Space>
      ),
    },
  ];

  const defaultColumns = [
    "id",
    "agent_user_id",
    "agent_user_name",
    "agent_id",
    "agent_name",
    "balance",
    "block_amount",
    "currency",
    "created",
    "updated",
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
        visible={jsonVisible}
        data={currentRow}
        onCancel={() => setJsonVisible(false)}
        loading={detailLoading}
      />
      <Detail
        title="商户账户明细"
        visible={detailVisible}
        data={currentRow}
        onCancel={() => setDetailVisible(false)}
        loading={detailLoading}
        columns={columns.filter(i => i.dataIndex !== "action")}
      />
      <EditableConfirm
        title="更新余额"
        fields={fields}
        visible={balanceVisible}
        data={{ ...currentRow, currency: 0 }}
        onCancel={handleCancelBalance}
        loading={detailLoading}
        onOk={handleBalance}
      />
    </Space>
  );
};

export default AgentAcct;
