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
import { Currency, formLayout } from "@/utils/enum";
import { dateFormat, priceFormat } from "@/utils/format";
import { useList, useDetail } from "@/utils/hook";
import { SearchFormFactory } from "@/components/factory/FormFactory";
const CryptoWallet = () => {
  const searchFields = {
    id: { type: "string", label: "ID" },
    order_no: { type: "string", label: "订单号" },
    trans_no: { type: "string", label: "第三方订单号" },
    crypto_acct_id: { type: "string", label: "加密钱包帐户ID" },
    crypto_wallet_id: { type: "string", label: "加密钱包ID" },
    currency: { type: "select", label: "货币", options: Currency },
  };

  const {
    res: { list, meta },
    loading: listLoading,
    handleGetList,
    handleChangePage,
  } = useList(getCryptoAcctLogs, selectCryptoAcctLog);

  const columns = [
    { title: "ID", dataIndex: "id" },
    {
      title: "订单金额",
      dataIndex: "amount",
      render: (val, record) => priceFormat({ val, currency: record.currency }),
    },
    { title: "b1", dataIndex: "b1" },
    { title: "b2", dataIndex: "b2" },
    { title: "block", dataIndex: "block" },
    { title: "channel", dataIndex: "channel" },
    { title: "client_ip", dataIndex: "client_ip" },
    { title: "content_id", dataIndex: "content_id" },
    { title: "content_type", dataIndex: "content_type" },
    {
      title: "创建日期",
      dataIndex: "created",
      width: 120,
      render: val => dateFormat(val),
    },
    { title: "加密钱包帐户ID", dataIndex: "crypto_acct_id" },
    { title: "加密钱包帐户名称", dataIndex: "crypto_acct_name" },
    { title: "加密钱包ID", dataIndex: "crypto_wallet_id" },
    {
      title: "货币",
      dataIndex: "currency",
      render: val => Currency[val] || "",
    },
    { title: "dir", dataIndex: "dir" },
    { title: "from_addr", dataIndex: "from_addr" },
    { title: "备注", dataIndex: "note" },
    { title: "订单号", dataIndex: "order_no" },
    { title: "status", dataIndex: "status" },
    { title: "subject", dataIndex: "subject" },
    { title: "to_addr", dataIndex: "to_addr" },
    { title: "第三方订单号", dataIndex: "trans_no" },
    { title: "trans_time", dataIndex: "trans_time" },
    { title: "type", dataIndex: "type" },
    {
      title: "更新日期",
      dataIndex: "updated",
      width: 120,
      render: val => dateFormat(val),
    },
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

  return (
    <Space direction="vertical" size="middle" className="w-100">
      <SearchFormFactory fields={searchFields} handleSubmit={handleGetList} />
      <Table
        columns={columns}
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
