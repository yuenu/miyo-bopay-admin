import { useState, useEffect, useCallback } from "react";
import { Button, Space, Table, Modal, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  selectOrder,
  getOrders,
  getOrder,
  addOrder,
  approveOrder,
  deleteOrder,
} from "@/store/slice/order";
import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import Search from "./Search";
import AddEdit from "./AddEdit";
import Edit from "./Edit";
import Detail from "./Detail";

const User = () => {
  const dispatch = useDispatch();

  const handleSearch = formModel => {
    handleGetList({ ...formModel });
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
  const handleApproveClick = async record => {
    setEditVisible(true);
    setEditRecord(record);
  };
  const handleApprove = async formModel => {
    setEditLoading(true);
    const { status } = await approveOrder({
      id: editRecord.id,
      ...formModel,
    });
    status === 200 && message.success("更新成功！");
    await handleGetList({ page: meta.page });
    setEditVisible(false);
    setEditLoading(false);
  };

  const handleDeleteClick = async id => {
    Modal.confirm({
      title: "確認刪除",
      icon: <ExclamationCircleOutlined />,
      content: `即將刪除 ${id}，是否繼續？`,
      okText: "確認",
      cancelText: "取消",
      onOk: close => handleDelete(close, id),
    });
  };
  const handleDelete = async (close, id) => {
    const { status } = await deleteOrder(id);
    close();
    if (status !== 200) return;
    message.success("刪除成功！");
    await handleGetList({ page: meta.page });
  };

  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "訂單號", dataIndex: "order_no" },
    { title: "第三方訂單號", dataIndex: "trans_no" },
    { title: "AppID", dataIndex: "app_id" },
    { title: "商戶ID", dataIndex: "developer_id" },
    { title: "會員ID", dataIndex: "userid" },
    { title: "會員姓名", dataIndex: "name" },
    { title: "訂單狀態", dataIndex: "status" },
    { title: "支付類別", dataIndex: "pay_type" },
    { title: "付款方式", dataIndex: "pay_method" },
    { title: "付款人姓名", dataIndex: "payer_name" },
    { title: "設備類型", dataIndex: "device_type" },
    { title: "支付狀態", dataIndex: "pay_status" },
    { title: "支付時間", dataIndex: "paid_at" },
    { title: "審核狀態", dataIndex: "approval_status" },
    { title: "通知狀態", dataIndex: "notify_status" },
    { title: "通知時間", dataIndex: "notified_at" },
    { title: "IP", dataIndex: "client_ip" },
    { title: "錯誤代碼", dataIndex: "failure_code" },
    { title: "錯誤信息", dataIndex: "failure_msg" },
    { title: "訂單金額", dataIndex: "amount" },
    { title: "實際付款金額", dataIndex: "amount_paid" },
    { title: "贈送金額", dataIndex: "bonus" },
    { title: "貨幣類型", dataIndex: "currency" },
    { title: "付款成功", dataIndex: "paid" },
    { title: "審核通過", dataIndex: "approved" },
    { title: "是否加密貨幣", dataIndex: "is_crypto" },
    { title: "是否在線訂單", dataIndex: "is_online" },
    { title: "清算成功", dataIndex: "settled" },
    {
      title: "動作",
      dataIndex: "action",
      align: "right",
      render: (_, recore) => (
        <Space>
          <Button onClick={() => handleDetailClick(recore.id)} type="primary">
            查看
          </Button>
          <Button onClick={() => handleApproveClick(recore)}>審核</Button>
          {/* <Button onClick={() => handleEditClick(recore.id)}>拒絕</Button> */}
          {/* <Button onClick={() => handleEditClick(recore.id)}>取消</Button> */}
          {/* <Button onClick={() => handleEditClick(recore.id)}>通知</Button> */}
          <Button onClick={() => handleDeleteClick(recore.id)} type="danger">
            刪除
          </Button>
        </Space>
      ),
    },
  ];
  const payerCredExpandedRowRender = record => {
    const columns = [
      { title: "name", dataIndex: "name", width: "200px" },
      { title: "residency", dataIndex: "residency" },
    ];
    return <Table columns={columns} dataSource={record} pagination={false} />;
  };
  return (
    <Space direction="vertical" size="middle" className="w-100">
      <Search onOk={handleSearch} />
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
        onOk={handleApprove}
        onCancel={() => setEditVisible(false)}
        loading={editLoading}
        data={editRecord}
        mode="approve"
      />
    </Space>
  );
};
export default User;
