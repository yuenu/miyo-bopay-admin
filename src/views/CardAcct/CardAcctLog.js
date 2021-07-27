import { useState } from "react";
import { Space, Button } from "antd";
import { selectCardAcctLog, getCardAcctLogs } from "@/store/slice/cardAcctLog";
import {
  Currency,
  CryptoAcctLogsType,
  DirType,
  CardDirection,
} from "@/utils/enum";
import { dateFormat, priceFormat } from "@/utils/format";
import { useList } from "@/utils/hook";
import { SearchFormFactory } from "@/components/factory/FormFactory";
import JsonModal from "@/components/JsonModal";
import { NormalTable } from "@/components/factory/TableFactory";

const CardAcctLog = () => {
  const searchFields = {
    id__in: { type: "string", label: "ID" },
    card_acct_id__in: { type: "string", label: "银行卡账户ID" },
    card_id__in: { type: "string", label: "银行卡ID" },
    user_id__in: { type: "string", label: "操作人ID" },
    order_no__in: { type: "string", label: "订单号" },
    trans_no__in: { type: "string", label: "第三方订单号" },
    direction: {
      type: "select",
      label: "转账方向",
      options: CardDirection,
    },
    channel__k: { type: "string", label: "交易渠道" },
    created__btw: { type: "rangeDate", label: "创建日期" },
  };

  const {
    res: { list, meta },
    loading: listLoading,
    handleGetList,
    handleChangePage,
    handleChange,
  } = useList(getCardAcctLogs, selectCardAcctLog);

  const [currentRow, setCurrentRow] = useState(null);
  const [jsonVisible, setJsonVisible] = useState(false);
  const handleJsonClick = async record => {
    setCurrentRow(record);
    setJsonVisible(true);
  };

  const columns = [
    { title: "ID", dataIndex: "id", sorter: true },
    { title: "银行卡账户ID", dataIndex: "card_acct_id" },
    { title: "银行卡ID", dataIndex: "card_id" },
    { title: "银行卡账号", dataIndex: "card_no" },
    { title: "操作人ID", dataIndex: "user_id" },
    { title: "操作人姓名", dataIndex: "username" },
    {
      title: "转账前余额",
      dataIndex: "b1",
      render: val => priceFormat({ val, currency: 0 }),
    },
    {
      title: "转账后余额",
      dataIndex: "b2",
      render: val => priceFormat({ val, currency: 0 }),
    },
    {
      title: "转账金额",
      dataIndex: "amount",
      render: val => priceFormat({ val, currency: 0 }),
    },
    {
      title: "转账方向",
      dataIndex: "direction",
      render: val => CardDirection[val] || "",
    },
    { title: "开发者订单号", dataIndex: "order_no" },
    { title: "第三方订单号", dataIndex: "trans_no" },
    { title: "交易账户", dataIndex: "account" },
    { title: "客户端IP", dataIndex: "client_ip" },
    { title: "交易内容", dataIndex: "subject" },
    { title: "交易渠道", dataIndex: "channel" },
    {
      title: "创建日期",
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
    { title: "备注", dataIndex: "note" },
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
        </Space>
      ),
    },
  ];
  const defaultColumns = [
    "id",
    "card_acct_id",
    "card_id",
    "username",
    "amount",
    "direction",
    "note",
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
      <JsonModal
        width={650}
        visible={jsonVisible}
        data={currentRow}
        onCancel={() => setJsonVisible(false)}
        loading={false}
      />
    </Space>
  );
};
export default CardAcctLog;
