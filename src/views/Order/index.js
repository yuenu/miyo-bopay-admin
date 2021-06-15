import { useState } from "react";
import { Button, Space, Table, Modal, message } from "antd";
import {
  selectOrder,
  getOrders,
  getOrder,
  addOrder,
  approveOrder,
  denyOrder,
  cancelOrder,
  notifyOrder,
} from "@/store/slice/order";
import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import {
  OrderStatus,
  WXPayType,
  PayMethod,
  Currency,
  isBoolEnum,
  NotifyStatus,
  ApprovalStatus,
} from "@/utils/enum";
import { priceFormat, dateFormat } from "@/utils/format";
import { useList, useDetail } from "@/utils/hook";
import { SearchFormFactory } from "@/components/factory/FormFactory";
import Tag from "@/components/Tag";
import AddEdit from "./AddEdit";
import Edit from "./Edit";
import Detail from "./Detail";

const Order = () => {
  const searchFields = {
    id: { type: "string", label: "ID" },
    order_no: { type: "string", label: "订单号" },
    trans_no: { type: "string", label: "第三方订单号" },
    currency: { type: "select", label: "货币类型", options: Currency },
    userid: { type: "string", label: "会员ID" },
    app_id: { type: "string", label: "AppID" },
    paid: {
      type: "select",
      label: "付款成功",
      options: isBoolEnum,
      isBool: true,
    },
    approved: {
      type: "select",
      label: "审核通过",
      options: isBoolEnum,
      isBool: true,
    },
    developer_id: { type: "string", label: "商户ID" },
    created__btw: { type: "rangeDate", label: "创建日期" },
    paid_at__btw: { type: "rangeDate", label: "支付时间" },
  };

  const {
    res: { list, meta },
    loading: listLoading,
    handleGetList,
    handleChangePage,
  } = useList(getOrders, selectOrder);

  const [addVisible, setAddVisible] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const handleAddClick = () => {
    setAddVisible(true);
  };
  const handleAdd = async formModel => {
    setAddLoading(true);
    const { status } = await addOrder(formModel);
    status === 200 && message.success("新增成功！");
    await handleGetList({ page: meta.page });
    setAddLoading(false);
    setAddVisible(false);
  };

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
    { title: "会员姓名", dataIndex: "name" },
    {
      title: "訂單狀態",
      dataIndex: "status",
      render: val => OrderStatus[val] || "",
    },
    {
      title: "支付類別",
      dataIndex: "pay_type",
      render: val => WXPayType[val] || "",
    },
    {
      title: "付款方式",
      dataIndex: "pay_method",
      width: 170,
      render: val => PayMethod[val] || "",
    },
    { title: "付款人姓名", dataIndex: "payer_name" },
    { title: "設備類型", dataIndex: "device_type" },
    { title: "支付狀態", dataIndex: "pay_status" },
    {
      title: "支付时间",
      dataIndex: "paid_at",
      width: 170,
      render: val => dateFormat(val),
    },
    {
      title: "審核狀態",
      dataIndex: "approval_status",
      render: val => ApprovalStatus[val] || "",
    },
    {
      title: "通知狀態",
      dataIndex: "notify_status",
      render: val => NotifyStatus[val] || "",
    },
    {
      title: "通知時間",
      dataIndex: "notified_at",
      width: 170,
      render: val => dateFormat(val),
    },
    { title: "IP", dataIndex: "client_ip" },
    { title: "錯誤代碼", dataIndex: "failure_code" },
    { title: "錯誤信息", dataIndex: "failure_msg" },
    {
      title: "訂單金額",
      dataIndex: "amount",
      render: (val, record) => priceFormat({ val, currency: record.currency }),
    },
    {
      title: "實際付款金額",
      dataIndex: "amount_paid",
      render: (val, record) => priceFormat({ val, currency: record.currency }),
    },
    {
      title: "贈送金額",
      dataIndex: "bonus",
      render: (val, record) => priceFormat({ val, currency: record.currency }),
    },
    {
      title: "货币类型",
      dataIndex: "currency",
      render: val => Currency[val] || "",
    },
    {
      title: "付款成功",
      dataIndex: "paid",
      render: val => <Tag val={val} />,
    },
    {
      title: "审核通过",
      dataIndex: "approved",
      render: val => <Tag val={val} />,
    },
    {
      title: "是否加密貨幣",
      dataIndex: "is_crypto",
      render: val => <Tag val={val} />,
    },
    {
      title: "是否在線訂單",
      dataIndex: "is_online",
      render: val => <Tag val={val} />,
    },
    {
      title: "清算成功",
      dataIndex: "settled",
      render: val => <Tag val={val} />,
    },
    {
      title: "动作",
      dataIndex: "action",
      align: "center",
      render: (_, recore) => (
        <Space>
          <Button onClick={() => handleDetailClick(recore.id)} type="primary">
            查看
          </Button>
          <Button onClick={() => handleEditClick(recore, "approve")}>
            审核
          </Button>
          <Button onClick={() => handleEditClick(recore, "deny")}>拒絕</Button>
          <Button onClick={() => handleCancelClick(recore.id)}>取消</Button>
          <Button onClick={() => handleNotifyClick(recore.id)}>通知</Button>
        </Space>
      ),
    },
  ];
  const payerCredExpandedRowRender = record => {
    const columns = [
      { title: "name", dataIndex: "name", width: "200px" },
      { title: "residency", dataIndex: "residency" },
    ];
    return (
      <Table
        columns={columns}
        dataSource={record}
        rowKey="name"
        pagination={false}
      />
    );
  };
  return (
    <Space direction="vertical" size="middle" className="w-100">
      <SearchFormFactory fields={searchFields} handleSubmit={handleGetList} />
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAddClick}>
        添加
      </Button>
      <Table
        columns={columns}
        dataSource={list}
        pagination={meta}
        rowKey="id"
        scroll={{ x: "auto" }}
        onChange={handleChangePage}
        loading={listLoading}
        expandable={{
          rowExpandable: record => true,
          expandedRowRender: record =>
            payerCredExpandedRowRender(JSON.parse(record.payer_cred)),
        }}
      />
      <AddEdit
        visible={addVisible}
        onOk={handleAdd}
        onCancel={() => setAddVisible(false)}
        loading={addLoading}
        mode="add"
      />
      <Detail
        visible={detailVisible}
        data={currentRow}
        onCancel={() => setDetailVisible(false)}
        loading={detailLoading}
      />
      <Edit
        visible={editVisible}
        onOk={handleEditOk}
        onCancel={() => setEditVisible(false)}
        loading={detailLoading}
        id={detailId}
        mode={editMode}
      />
    </Space>
  );
};
export default Order;
