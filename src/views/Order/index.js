import { useState, useEffect, useCallback } from "react";
import { Button, Space, Table, Modal, message, Tag } from "antd";
import { useSelector, useDispatch } from "react-redux";
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
  isActiveLang,
  isModule,
} from "@/utils/enum";
import { priceFormat, dateFormat, searchFieldsFormat } from "@/utils/format";
import { SearchFormFactory } from "@/components/factory/FormFactory";
import AddEdit from "./AddEdit";
import Edit from "./Edit";
import Detail from "./Detail";

const User = () => {
  const dispatch = useDispatch();

  const searchFields = {
    id: { type: "string", lang: "ID" },
    order_no: { type: "string", lang: "订单号" },
    trans_no: { type: "string", lang: "第三方订单号" },
    currency: { type: "select", lang: "货币类型", options: Currency },
    userid: { type: "string", lang: "会员ID" },
    app_id: { type: "string", lang: "AppID" },
    paid: {
      type: "select",
      lang: "付款成功",
      options: isModule,
      isModule: true,
    },
    approved: {
      type: "select",
      lang: "审核通过",
      options: isModule,
      isModule: true,
    },
    developer_id: { type: "string", lang: "商户ID" },
    created__btw: { type: "rangeDate", lang: "created" },
    paid_at__btw: { type: "rangeDate", lang: "支付时间" },
  };
  const handleSearch = formModel => {
    const params = searchFieldsFormat({ searchFields, formModel });
    handleGetList(params);
  };

  const { list, currentRow, meta } = useSelector(selectOrder);
  const [listLoading, setListLoading] = useState(false);
  const handleGetList = useCallback(
    async (params = {}) => {
      setListLoading(true);
      await dispatch(getOrders(params));
      setListLoading(false);
    },
    [dispatch],
  );
  useEffect(() => {
    handleGetList();
  }, [handleGetList]);
  const handleChangePage = (pagination, filters, sorter, extra) => {
    handleGetList({ page: pagination.current });
  };

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

  const handleGetDetail = async id => {
    await dispatch(getOrder(id));
  };

  const [detailVisible, setDetailVisible] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const handleDetailClick = async id => {
    setDetailVisible(true);
    setDetailLoading(true);
    await handleGetDetail(id);
    setDetailLoading(false);
  };

  const [editVisible, setEditVisible] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [editRecord, setEditRecord] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const handleEditClick = async (record, mode) => {
    setEditVisible(true);
    setEditRecord(record);
    setEditMode(mode);
  };
  const handleEditOk = formModel => {
    editMode === "approve" && handleApprove(formModel);
    editMode === "deny" && handleDeny(formModel);
  };
  const handleApprove = async formModel => {
    setEditLoading(true);
    const { status } = await approveOrder({
      id: editRecord.id,
      ...formModel,
    });
    status === 200 && message.success("審核成功！");
    await handleGetList({ page: meta.page });
    setEditVisible(false);
    setEditLoading(false);
  };
  const handleDeny = async formModel => {
    setEditLoading(true);
    const { status } = await denyOrder({
      id: editRecord.id,
      ...formModel,
    });
    status === 200 && message.success("已拒絕訂單！");
    await handleGetList({ page: meta.page });
    setEditVisible(false);
    setEditLoading(false);
  };
  const handleCancelClick = id => {
    Modal.confirm({
      title: "是否取消訂單",
      icon: <ExclamationCircleOutlined />,
      content: `即將取消訂單 ${id}，是否繼續？`,
      okText: "確認",
      cancelText: "取消",
      onOk: close => handleCancel(close, id),
    });
  };
  const handleCancel = async (close, id) => {
    const { status } = await cancelOrder(id);
    close();
    if (status !== 200) return;
    message.success("訂單已取消！");
    await handleGetList({ page: meta.page });
  };

  const handleNotifyClick = async id => {
    Modal.confirm({
      title: "是否通知訂單",
      icon: <ExclamationCircleOutlined />,
      content: `即將通知訂單 ${id}，是否繼續？`,
      okText: "確認",
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
    { title: "會員姓名", dataIndex: "name" },
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
    { title: "審核狀態", dataIndex: "approval_status" },
    { title: "通知狀態", dataIndex: "notify_status" },
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
      render: val => (
        <Tag color={val ? "green" : "default"}>{isActiveLang(val)}</Tag>
      ),
    },
    {
      title: "审核通过",
      dataIndex: "approved",
      render: val => (
        <Tag color={val ? "green" : "default"}>{isActiveLang(val)}</Tag>
      ),
    },
    {
      title: "是否加密貨幣",
      dataIndex: "is_crypto",
      render: val => (
        <Tag color={val ? "green" : "default"}>{isActiveLang(val)}</Tag>
      ),
    },
    {
      title: "是否在線訂單",
      dataIndex: "is_online",
      render: val => (
        <Tag color={val ? "green" : "default"}>{isActiveLang(val)}</Tag>
      ),
    },
    {
      title: "清算成功",
      dataIndex: "settled",
      render: val => (
        <Tag color={val ? "green" : "default"}>{isActiveLang(val)}</Tag>
      ),
    },
    {
      title: "動作",
      dataIndex: "action",
      align: "center",
      render: (_, recore) => (
        <Space>
          <Button onClick={() => handleDetailClick(recore.id)} type="primary">
            查看
          </Button>
          <Button onClick={() => handleEditClick(recore, "approve")}>
            審核
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
      <SearchFormFactory fields={searchFields} handleSubmit={handleSearch} />
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
        loading={editLoading}
        data={editRecord}
        mode={editMode}
      />
    </Space>
  );
};
export default User;
