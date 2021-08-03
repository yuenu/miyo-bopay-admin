import { useEffect, useState } from "react";
import {
  Space,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  message,
  Typography,
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
  TransRedirect,
} from "@/utils/enum";
import { dateFormat, priceFormat } from "@/utils/format";
import { useList, useDetail } from "@/utils/hook";
import {
  SearchFormFactory,
  CurrencyHelpTextFormItemFactory,
} from "@/components/factory/FormFactory";
import JsonModal from "@/components/JsonModal";
import Tag from "@/components/Tag";
import { NormalTable } from "@/components/factory/TableFactory";

const { Link, Paragraph, Text } = Typography;

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
    handleChange,
  } = useList(getCryptoAcctLogs, selectCryptoAcctLog);

  const [detailId, setDetailId] = useState(null);
  const { currentRow, loading: detailLoading } = useDetail(
    { action: getCryptoAcctLog, id: detailId },
    selectCryptoAcctLog,
  );

  const [jsonVisible, setJsonVisible] = useState(false);
  const handleJsonClick = async id => {
    setDetailId(id);
    setJsonVisible(true);
  };

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
        order_id: currentRow.content_id,
        note: currentRow.note || "确认交易，资金到帐。",
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
    { title: "ID", dataIndex: "id", sorter: true },
    { title: "订单号", dataIndex: "order_no" },
    {
      title: "第三方订单号",
      dataIndex: "trans_no",
      wdth: 100,
      render: (val, record) => {
        return (
          <Paragraph
            style={{
              width: 200,
            }}
          >
            {TransRedirect[record.currency] ? (
              <Link
                href={`${TransRedirect[record.currency]}/${val}`}
                target="_blank"
              >
                {val}
              </Link>
            ) : (
              <Text>{val}</Text>
            )}
          </Paragraph>
        );
      },
    },
    {
      title: "交易金额",
      dataIndex: "amount",
      render: (val, record) => priceFormat({ val, currency: record.currency }),
      sorter: true,
    },
    {
      title: "交易类型",
      dataIndex: "type",
      render: val => CryptoAcctLogsType[val] || "",
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
            onClick={() => handleJsonClick(record.id)}
            type="primary"
          >
            json
          </Button>
          <Button
            size="small"
            type="primary"
            onClick={() => handleEditClick(record.id)}
          >
            绑定订单
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
    "crypto_acct_name",
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
        loading={detailLoading}
      />
      <Modal
        title="绑定订单"
        visible={editVisible}
        onOk={handleEditOk}
        onCancel={() => setEditVisible(false)}
        cancelText="取消"
        okText="送出"
        destroyOnClose
      >
        <Spin spinning={detailLoading}>
          <Form {...formLayout} form={form}>
            <Form.Item label="ID">{currentRow.id}</Form.Item>
            <Form.Item name="order_id" label="订单ID">
              <InputNumber />
            </Form.Item>
            <CurrencyHelpTextFormItemFactory
              name="amount_paid"
              label="订单金额"
              row={currentRow}
              defaultValKey="amount"
            />
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
