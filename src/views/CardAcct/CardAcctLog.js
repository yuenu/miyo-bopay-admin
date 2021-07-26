import { useState } from "react";
import { Space, Button } from "antd";
import { selectCardAcctLog, getCardAcctLogs } from "@/store/slice/cardAcctLog";
import {
  Currency,
  CryptoAcctLogsType,
  ContentType,
  DirType,
  CryptoAcctLogsStatus,
} from "@/utils/enum";
import { dateFormat, priceFormat } from "@/utils/format";
import { useList } from "@/utils/hook";
import { SearchFormFactory } from "@/components/factory/FormFactory";
import JsonModal from "@/components/JsonModal";
import Tag from "@/components/Tag";
import { NormalTable } from "@/components/factory/TableFactory";

const CardAcctLog = () => {
  const searchFields = {
    id__in: { type: "string", label: "ID" },
    status__in: {
      type: "select",
      label: "状态",
      options: CryptoAcctLogsStatus,
    },
    order_no__in: { type: "string", label: "订单号" },
    trans_no__in: { type: "string", label: "第三方订单号" },
    content_id__in: { type: "string", label: "关联对象ID" },
    content_type: {
      type: "select",
      label: "关联对象类型",
      options: ContentType,
    },
    type: { type: "select", label: "交易类型", options: CryptoAcctLogsType },
    dir: { type: "select", label: "方向", options: DirType },
    currency: { type: "select", label: "货币", options: Currency },
    crypto_acct_id__in: { type: "string", label: "收款地址ID" },
    crypto_acct_name__k: { type: "string", label: "收款地址名称" },
    crypto_wallet_id__in: { type: "string", label: "加密钱包ID" },
    channel__k: { type: "string", label: "支付商户" },
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
    { title: "订单号", dataIndex: "order_no" },

    {
      title: "交易金额",
      dataIndex: "amount",
      render: (val, record) => priceFormat({ val, currency: record.currency }),
      sorter: true,
    },

    { title: "收款地址ID", dataIndex: "crypto_acct_id", sorter: true },
    { title: "收款地址名称", dataIndex: "crypto_acct_name", sorter: true },
    { title: "加密钱包ID", dataIndex: "crypto_wallet_id", sorter: true },
    {
      title: "货币",
      dataIndex: "currency",
      render: val => Currency[val] || "",
    },
    { title: "变动前余额", dataIndex: "b1", sorter: true },
    { title: "变动后余额", dataIndex: "b2", sorter: true },
    { title: "区块高度", dataIndex: "block" },
    { title: "支付商户", dataIndex: "channel" },
    { title: "客户IP", dataIndex: "client_ip" },
    { title: "关联对象ID", dataIndex: "content_id", sorter: true },
    {
      title: "关联对象类型",
      dataIndex: "content_type",
      render: val => ContentType[val] || "",
    },
    {
      title: "方向",
      dataIndex: "dir",
      render: val => (
        <Tag val={val === 0} falseColor="red">
          {DirType[val]}
        </Tag>
      ),
    },
    { title: "转入地址", dataIndex: "from_addr" },
    {
      title: "状态",
      dataIndex: "status",
      render: val => CryptoAcctLogsStatus[val] || "",
    },
    { title: "交易内容", dataIndex: "subject" },
    { title: "转出地址", dataIndex: "to_addr" },
    { title: "交易时间", dataIndex: "trans_time", sorter: true },

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
    "order_no",
    "trans_no",
    "amount",
    "currency",
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
