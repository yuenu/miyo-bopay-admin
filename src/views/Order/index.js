import { useState } from "react";
import { Button, Space, Table, Modal, message } from "antd";
import {
  selectOrder,
  getOrders,
  getOrder,
  approveOrder,
  denyOrder,
  cancelOrder,
  notifyOrder,
} from "@/store/slice/order";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import {
  OrderStatus,
  WXPayType,
  PayMethod,
  PayStatus,
  Currency,
  IsBoolEnum,
  NotifyStatus,
  ApprovalStatus,
} from "@/utils/enum";
import { priceFormat, dateFormat } from "@/utils/format";
import { useList, useDetail, useColumnsSelect } from "@/utils/hook";
import { SearchFormFactory } from "@/components/factory/FormFactory";
import Tag from "@/components/Tag";
import ColumnsSelect from "@/components/ColumnsSelect";
import Edit from "./Edit";
import Detail from "./Detail";
import JsonModal from "@/components/JsonModal";

const Order = () => {
  const searchFields = {
    id__in: { type: "string", label: "ID" },
    order_no__in: { type: "string", label: "订单号" },
    trans_no__in: { type: "string", label: "第三方订单号" },
    currency: { type: "select", label: "货币类型", options: Currency },
    userid__in: { type: "string", label: "会员ID" },
    app_id__in: { type: "string", label: "AppID" },
    paid: {
      type: "select",
      label: "付款成功",
      options: IsBoolEnum,
      isBool: true,
    },
    approved: {
      type: "select",
      label: "审核通过",
      options: IsBoolEnum,
      isBool: true,
    },
    developer_id__in: { type: "string", label: "商户ID" },
    created__btw: { type: "rangeDate", label: "创建日期" },
    paid_at__btw: { type: "rangeDate", label: "支付时间" },
  };

  const {
    res: { list, meta },
    loading: listLoading,
    handleGetList,
    handleChangePage,
  } = useList(getOrders, selectOrder);

  const [detailId, setDetailId] = useState(null);
  const {
    currentRow,
    loading: detailLoading,
    handleEdit,
  } = useDetail({ action: getOrder, id: detailId }, selectOrder);
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

  const [editVisible, setEditVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const handleEditClick = async (record, mode) => {
    setEditVisible(true);
    setDetailId(record.id);
    setEditMode(mode);
  };
  const handleEditOk = async formModel => {
    const action = editMode === "approve" ? approveOrder : denyOrder;
    await handleEdit({ action, id: detailId, ...formModel });
    await handleGetList({ page: meta.page });
    setEditVisible(false);
    setDetailId(null);
  };

  const handleCancelClick = id => {
    Modal.confirm({
      title: "是否取消订单",
      icon: <ExclamationCircleOutlined />,
      content: `即将取消订单 ${id}，是否继续？`,
      okText: "确认",
      cancelText: "取消",
      onOk: close => handleCancelOrder(close, id),
    });
  };
  const handleCancelOrder = async (close, id) => {
    const { status } = await cancelOrder(id);
    close();
    if (status !== 200) return;
    message.success("訂單已取消！");
    await handleGetList({ page: meta.page });
  };

  const handleNotifyClick = async id => {
    Modal.confirm({
      title: "是否通知订单",
      icon: <ExclamationCircleOutlined />,
      content: `即将通知订单 ${id}，是否继续？`,
      okText: "确认",
      cancelText: "取消",
      onOk: close => handleNotify(close, id),
    });
  };
  const handleNotify = async (close, id) => {
    const { status } = await notifyOrder(id);
    close();
    if (status !== 200) return;
    message.success("订单已通知！");
    await handleGetList({ page: meta.page });
  };

  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "订单号", dataIndex: "order_no" },
    { title: "第三方订单号", dataIndex: "trans_no" },
    { title: "AppID", dataIndex: "app_id" },
    { title: "商戶ID", dataIndex: "developer_id" },
    { title: "会员ID", dataIndex: "userid" },
    { title: "会员姓名", dataIndex: "name", width: 100 },
    {
      title: "订单状态",
      dataIndex: "status",
      render: val => OrderStatus[val] || "",
      width: 100,
    },
    {
      title: "支付类别",
      dataIndex: "pay_type",
      render: val => WXPayType[val] || "",
      width: 100,
    },
    {
      title: "付款方式",
      dataIndex: "pay_method",
      width: 170,
      render: val => PayMethod[val] || "",
    },
    { title: "付款人姓名", dataIndex: "payer_name", width: 100 },
    { title: "付款人信息", dataIndex: "payer_cred", width: 100 },
    { title: "设备类型", dataIndex: "device_type", width: 100 },
    {
      title: "支付状态",
      dataIndex: "pay_status",
      render: val => PayStatus[val] || "",
      width: 100,
    },
    {
      title: "支付时间",
      dataIndex: "paid_at",
      width: 150,
      render: val => dateFormat(val),
    },
    {
      title: "审核状态",
      dataIndex: "approval_status",
      render: val => ApprovalStatus[val] || "",
      width: 100,
    },
    {
      title: "通知状态",
      dataIndex: "notify_status",
      render: val => NotifyStatus[val] || "",
      width: 100,
    },
    {
      title: "通知时间",
      dataIndex: "notified_at",
      width: 170,
      render: val => dateFormat(val),
    },
    { title: "IP", dataIndex: "client_ip" },
    { title: "错误代码", dataIndex: "failure_code", width: 100 },
    { title: "错误信息", dataIndex: "failure_msg", width: 100 },
    {
      title: "订单金额",
      dataIndex: "amount",
      render: (val, record) => priceFormat({ val, currency: record.currency }),
      width: 100,
    },
    {
      title: "实际付款金额",
      dataIndex: "amount_paid",
      render: (val, record) => priceFormat({ val, currency: record.currency }),
      width: 100,
    },
    {
      title: "赠送金额",
      dataIndex: "bonus",
      render: (val, record) => priceFormat({ val, currency: record.currency }),
      width: 100,
    },
    {
      title: "货币类型",
      dataIndex: "currency",
      render: val => Currency[val] || "",
      width: 100,
    },
    {
      title: "付款成功",
      dataIndex: "paid",
      render: val => <Tag val={val} />,
      width: 100,
    },
    {
      title: "审核通过",
      dataIndex: "approved",
      render: val => <Tag val={val} />,
      width: 100,
    },
    {
      title: "是否加密货币",
      dataIndex: "is_crypto",
      render: val => <Tag val={val} />,
      width: 100,
    },
    {
      title: "是否在线订单",
      dataIndex: "is_online",
      render: val => <Tag val={val} />,
      width: 100,
    },
    {
      title: "清算成功",
      dataIndex: "settled",
      render: val => <Tag val={val} />,
      width: 100,
    },
    {
      title: "创建日期",
      dataIndex: "created",
      render: val => dateFormat(val),
      width: 120,
    },
    {
      title: "更新日期",
      dataIndex: "updated",
      render: val => dateFormat(val),
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
            type="primary"
          >
            json
          </Button>
          <Button
            size="small"
            onClick={() => handleDetailClick(record.id)}
            type="primary"
          >
            查看
          </Button>
          {record.approved || (
            <>
              <Button
                size="small"
                onClick={() => handleEditClick(record, "approve")}
              >
                审核
              </Button>
              <Button
                size="small"
                onClick={() => handleEditClick(record, "deny")}
                type="danger"
              >
                拒绝
              </Button>
              <Button
                size="small"
                onClick={() => handleCancelClick(record.id)}
                type="danger"
              >
                取消
              </Button>
            </>
          )}
          {record.paid && (
            <Button size="small" onClick={() => handleNotifyClick(record.id)}>
              通知
            </Button>
          )}
        </Space>
      ),
    },
  ];
  const defaultColumns = [
    "id",
    "order_no",
    "amount",
    "pay_status",
    "status",
    "paid_at",
    "name",
    "device_type",
    "approval_status",
    "paid",
    "created",
    "action",
  ];
  const { selectedColumns, setSelectedColumns } = useColumnsSelect({
    columns,
    defaultColumns,
  });
  const payerCredExpandedRowRender = record => {
    return <div>{record}</div>;
  };
  return (
    <Space direction="vertical" size="middle" className="w-100">
      <SearchFormFactory fields={searchFields} handleSubmit={handleGetList} />
      <ColumnsSelect
        columns={columns}
        value={selectedColumns}
        onChange={setSelectedColumns}
      />
      <Table
        size="small"
        columns={selectedColumns}
        dataSource={list}
        pagination={meta}
        rowKey="id"
        scroll={{ x: "auto" }}
        onChange={handleChangePage}
        loading={listLoading}
        expandable={{
          rowExpandable: record => true,
          expandedRowRender: record =>
            payerCredExpandedRowRender(JSON.stringify(record.payer_cred)),
        }}
      />
      <JsonModal
        width={650}
        visible={jsonVisible}
        data={currentRow}
        onCancel={() => setJsonVisible(false)}
        loading={detailLoading}
      />
      <Detail
        visible={detailVisible}
        data={currentRow}
        onCancel={() => setDetailVisible(false)}
        loading={detailLoading}
        columns={columns.filter(i => i.dataIndex !== "action")}
      />
      <Edit
        visible={editVisible}
        onOk={handleEditOk}
        onCancel={() => setEditVisible(false)}
        loading={detailLoading}
        data={currentRow}
        mode={editMode}
      />
    </Space>
  );
};
export default Order;
