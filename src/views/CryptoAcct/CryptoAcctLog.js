import { useEffect, useState } from "react";
import {
  Space,
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  message,
} from "antd";
import Spin from "@/components/Spin";
import {
  selectCryptoAcctLog,
  getCryptoAcctLogs,
  getCryptoAcctLog,
} from "@/store/slice/cryptoAcctLog";
import { bindOrder } from "@/store/slice/order";
import {
  Currency,
  formLayout,
  CryptoAcctLogsType,
  ContentType,
  DirType,
  CryptoAcctLogsStatus,
} from "@/utils/enum";
import { dateFormat, priceFormat } from "@/utils/format";
import { useList, useDetail, useColumnsSelect } from "@/utils/hook";
import { SearchFormFactory } from "@/components/factory/FormFactory";
import ColumnsSelect from "@/components/ColumnsSelect";

const CryptoWallet = () => {
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
  } = useList(getCryptoAcctLogs, selectCryptoAcctLog);

  const [detailId, setDetailId] = useState(null);
  const { currentRow, loading: detailLoading } = useDetail(
    { action: getCryptoAcctLog, id: detailId },
    selectCryptoAcctLog,
  );

  const [form] = Form.useForm();
  const [editVisible, setEditVisible] = useState(false);
  const handleEditClick = async id => {
    setDetailId(id);
    setEditVisible(true);
  };
  useEffect(() => {
    editVisible &&
      currentRow.id &&
      form.setFieldsValue({
        amount_paid: currentRow.amount,
        note: currentRow.note,
      });
  }, [editVisible, currentRow, form]);

  const handleEditOk = async () => {
    const formModel = form.getFieldsValue();
    await handleEdit({ crypto_acct_log_id: currentRow.id, ...formModel });
    form.resetFields();
    setEditVisible(false);
    setDetailId(null);
    handleGetList({ page: meta.page });
  };
  const handleEdit = async formModel => {
    const { status } = await bindOrder({ ...formModel });
    if (status !== 200) return;
    message.success("订单已绑定！");
  };
  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "订单号", dataIndex: "order_no" },
    { title: "第三方订单号", dataIndex: "trans_no" },
    {
      title: "交易金额",
      dataIndex: "amount",
      render: (val, record) => priceFormat({ val, currency: record.currency }),
    },
    {
      title: "交易类型",
      dataIndex: "type",
      render: val => CryptoAcctLogsType[val] || "",
    },
    { title: "收款地址ID", dataIndex: "crypto_acct_id" },
    { title: "收款地址名称", dataIndex: "crypto_acct_name" },
    { title: "加密钱包ID", dataIndex: "crypto_wallet_id" },
    {
      title: "货币",
      dataIndex: "currency",
      render: val => Currency[val] || "",
    },
    { title: "变动前余额", dataIndex: "b1" },
    { title: "变动后余额", dataIndex: "b2" },
    { title: "区块高度", dataIndex: "block" },
    { title: "支付商户", dataIndex: "channel" },
    { title: "客户IP", dataIndex: "client_ip" },
    { title: "关联对象ID", dataIndex: "content_id" },
    {
      title: "关联对象类型",
      dataIndex: "content_type",
      render: val => ContentType[val] || "",
    },
    { title: "方向", dataIndex: "dir", render: val => DirType[val] || "" },
    { title: "转入地址", dataIndex: "from_addr" },
    {
      title: "状态",
      dataIndex: "status",
      render: val => CryptoAcctLogsStatus[val] || "",
    },
    { title: "交易内容", dataIndex: "subject" },
    { title: "转出地址", dataIndex: "to_addr" },
    { title: "交易时间", dataIndex: "trans_time" },

    {
      title: "创建日期",
      dataIndex: "created",
      width: 120,
      render: val => dateFormat(val),
    },
    {
      title: "更新日期",
      dataIndex: "updated",
      width: 120,
      render: val => dateFormat(val),
    },
    { title: "备注", dataIndex: "note" },
    {
      title: "动作",
      dataIndex: "action",
      align: "right",
      render: (_, record) => (
        <Button type="primary" onClick={() => handleEditClick(record.id)}>
          绑定订单
        </Button>
      ),
    },
  ];
  const defaultColumns = [
    "id",
    "order_no",
    "amount",
    "crypto_acct_id",
    "status",
    "action",
  ];
  const { selectedColumns, setSelectedColumns } = useColumnsSelect({
    columns,
    defaultColumns,
  });
  return (
    <Space direction="vertical" size="middle" className="w-100">
      <SearchFormFactory fields={searchFields} handleSubmit={handleGetList} />
      <ColumnsSelect
        columns={columns}
        value={selectedColumns}
        onChange={setSelectedColumns}
      />
      <Table
        columns={selectedColumns}
        dataSource={list}
        pagination={meta}
        rowKey="id"
        scroll={{ x: "auto" }}
        onChange={handleChangePage}
        loading={listLoading}
      />
      <Modal
        title="绑定订单"
        visible={editVisible}
        onOk={handleEditOk}
        onCancel={() => setEditVisible(false)}
        cancelText="取消"
        okText="送出"
      >
        <Spin spinning={detailLoading}>
          <Form {...formLayout} form={form}>
            <Form.Item label="ID">{currentRow.id}</Form.Item>
            <Form.Item name="order_id" label="订单ID">
              <InputNumber />
            </Form.Item>
            <Form.Item name="amount_paid" label="订单金额">
              <InputNumber />
            </Form.Item>
            <Form.Item name="note" label="备注">
              <Input />
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </Space>
  );
};
export default CryptoWallet;
