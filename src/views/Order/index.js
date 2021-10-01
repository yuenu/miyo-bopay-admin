import { useState, useEffect } from "react";
import { Button, Space, Modal, message } from "antd";
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
import { Currency, IsBoolEnum } from "@/utils/enum";
import { useList, useDetail } from "@/utils/hook";
import { SearchFormFactory } from "@/components/factory/FormFactory";
import { NormalTable } from "@/components/factory/TableFactory";
import Edit from "./Edit";
import JsonModal from "@/components/JsonModal";
import ListColumns from "./Columns";
import { useHistory, generatePath } from "react-router-dom";

const Order = ({ params }) => {
  const searchFields = {
    id__in: { type: "string", label: "ID" },
    order_no__in: { type: "string", label: "订单号" },
    trans_no__in: { type: "string", label: "第三方订单号" },
    currency: { type: "select", label: "货币类型", options: Currency },
    userid__in: { type: "string", label: "会员ID" },
    app_id__in: { type: "string", label: "AppID" },
    gateway__k: { type: "string", label: "通道名称" },
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
    handleSearch,
    handleGetList,
    handleChangePage,
    handleChange,
  } = useList(getOrders, selectOrder, params);

  const [detailId, setDetailId] = useState(null);
  const {
    currentRow,
    loading: detailLoading,
    handleEdit,
  } = useDetail({ action: getOrder, id: detailId }, selectOrder);

  const history = useHistory();
  const handleDetailClick = async id => {
    history.push(generatePath("/OrderDetail/:id", { id }));
  };

  const [jsonVisible, setJsonVisible] = useState(false);
  const handleJsonClick = async id => {
    setDetailId(id);
    setJsonVisible(true);
  };
  useEffect(() => {
    jsonVisible || setDetailId(null);
  }, [jsonVisible]);

  const [editVisible, setEditVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const handleEditClick = async (record, mode) => {
    setEditVisible(true);
    setDetailId(record.id);
    setEditMode(mode);
  };
  const handleEditOk = async formModel => {
    const action = editMode === "approve" ? approveOrder : denyOrder;
    const { status } = await handleEdit({ action, id: detailId, ...formModel });
    if (status !== 200) return;
    setEditVisible(false);
    setDetailId(null);
    await handleGetList({ page: meta.page });
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
    ...ListColumns,
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
          {record.status === 2 && (
            <>
              <Button
                size="small"
                type="text"
                onClick={() => handleEditClick(record, "approve")}
                className="p-0"
              >
                审核
              </Button>
              <Button
                size="small"
                onClick={() => handleEditClick(record, "deny")}
                type="text"
                danger
                className="p-0"
              >
                拒绝
              </Button>
              <Button
                size="small"
                onClick={() => handleCancelClick(record.id)}
                type="text"
                danger
                className="p-0"
              >
                取消
              </Button>
            </>
          )}
          {record.paid && (
            <Button
              size="small"
              type="text"
              onClick={() => handleNotifyClick(record.id)}
              className="p-0"
            >
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
    "gateway",
    "userid",
    "name",
    "status",
    "device_type",
    "pay_status",
    "paid_at",
    "approval_status",
    "amount",
    "amount_paid",
    "paid",
    "created",
    "action",
  ];

  const payerCredExpandedRowRender = record => {
    return <div>{record}</div>;
  };
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
        expandable={{
          rowExpandable: record => true,
          expandedRowRender: record =>
            payerCredExpandedRowRender(JSON.stringify(record.payer_cred)),
        }}
        onShowSizeChange={handleChangePage}
      />
      <JsonModal
        width={650}
        visible={jsonVisible}
        data={currentRow}
        onCancel={() => setJsonVisible(false)}
        loading={detailLoading}
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
