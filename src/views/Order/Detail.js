import { useEffect, useState } from "react";
import { Descriptions, Button, Space, PageHeader, Modal, message } from "antd";
import Spin from "@/components/Spin";
import { useDetail } from "@/utils/hook";
import {
  selectOrder,
  getOrder,
  approveOrder,
  denyOrder,
  cancelOrder,
  notifyOrder,
} from "@/store/slice/order";
import { useParams } from "react-router-dom";
import Colums from "./Columns";
import JsonModal from "@/components/JsonModal";
import EditableConfirm from "@/components/EditableConfirm";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const Detail = () => {
  const { id } = useParams();
  const [detailId, setDetailId] = useState(id);
  useEffect(() => {
    setDetailId(id);
  }, [id]);
  const { currentRow, loading, handleEdit } = useDetail(
    { action: getOrder, id: detailId },
    selectOrder,
  );

  const [jsonVisible, setJsonVisible] = useState(false);
  const handleJsonClick = () => {
    setJsonVisible(true);
  };

  const [editVisible, setEditVisible] = useState(false);
  const [editMode, setEditMode] = useState("approve");
  const fields =
    editMode === "approve"
      ? [
          {
            label: "金額",
            name: "amount",
            inputType: "price",
          },
          {
            label: "备注",
            name: "comments",
            inputType: "string",
          },
        ]
      : [
          {
            label: "备注",
            name: "comments",
            inputType: "string",
          },
        ];
  const handleEditClick = mode => {
    setEditMode(mode);
    setEditVisible(true);
  };
  const handleEditOk = async formModel => {
    const action = editMode === "approve" ? approveOrder : denyOrder;
    const { status } = await handleEdit({
      action,
      id: currentRow.id,
      comments: formModel.comments,
      ...(editMode === "approve" && { amount_paid: formModel.amount }),
    });
    if (status !== 200) return;
    setEditVisible(false);
    setDetailId(null);
    setDetailId(id);
  };
  const handleCancelClick = () => {
    Modal.confirm({
      title: "是否取消订单",
      icon: <ExclamationCircleOutlined />,
      content: `即将取消订单 ${id}，是否继续？`,
      okText: "确认",
      cancelText: "取消",
      onOk: close => handleCancel(close, id),
    });
  };
  const handleCancel = async (close, id) => {
    const { status } = await cancelOrder(id);
    close();
    if (status !== 200) return;
    message.success("訂單已取消！");
    setDetailId(null);
    setDetailId(id);
  };

  const handleNotifyClick = () => {
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
    setDetailId(null);
    setDetailId(id);
  };
  const extra = (
    <Space size="small">
      <Button type="primary" onClick={handleJsonClick}>
        json
      </Button>
      {currentRow.status === 2 && (
        <>
          <Button onClick={() => handleEditClick("approve")}>审核</Button>
          <Button onClick={() => handleEditClick("deny")} type="danger">
            拒绝
          </Button>
          <Button type="danger" onClick={handleCancelClick}>
            取消
          </Button>
        </>
      )}
      {currentRow.paid && <Button onClick={handleNotifyClick}>通知</Button>}
    </Space>
  );
  return (
    <>
      <Spin spinning={loading}>
        <Space direction="vertical" size="middle" className="w-100">
          <PageHeader title="订单明细" extra={extra} />
          <Descriptions
            column={{ xs: 1, sm: 1, md: 2 }}
            bordered
            className="bg-white"
          >
            {Colums.map(i => (
              <Descriptions.Item
                label={i.title}
                key={i.dataIndex}
                span={
                  i.dataIndex === "payer_name" || i.dataIndex === "payer_cred"
                    ? 2
                    : 1
                }
              >
                {i.dRender
                  ? i.dRender(currentRow[i.dataIndex], i)
                  : i.render
                  ? i.render(currentRow[i.dataIndex], i)
                  : currentRow[i.dataIndex]}
              </Descriptions.Item>
            ))}
          </Descriptions>
        </Space>
      </Spin>
      <JsonModal
        width={650}
        visible={jsonVisible}
        data={currentRow}
        onCancel={() => setJsonVisible(false)}
        loading={false}
      />
      <EditableConfirm
        title={editMode === "approve" ? "审核" : "审核拒绝"}
        fields={fields}
        visible={editVisible}
        data={currentRow}
        onCancel={() => setEditVisible(false)}
        loading={loading}
        onOk={handleEditOk}
      />
    </>
  );
};

export default Detail;
