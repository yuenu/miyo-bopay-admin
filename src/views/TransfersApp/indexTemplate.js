import { useState } from "react";
import { Space, Button, Modal, message } from "antd";
import {
  selectTransfersApp,
  getTransfersApp,
} from "@/store/slice/transfersApp";
import {
  claimTransfer,
  denyTransfer,
  paidTransfer,
  succeededTransfer,
  failedTransfer,
  cancelTransfer,
} from "@/store/slice/transfer";
import { SearchFormFactory } from "@/components/factory/FormFactory";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useList } from "@/utils/hook";
import JsonModal from "@/components/JsonModal";
import Detail from "@/components/Detail";
import { NormalTable } from "@/components/factory/TableFactory";
import EditableConfirm from "@/components/EditableConfirm";
import Paid from "./Paid";
import { useSelector } from "react-redux";
import { selectAuth } from "@/store/slice/auth";
import { columns as ListColumns } from "./Columns";
const TYPE_ENUMS = {
  deny: "审核拒绝",
  failed: "出款失败",
};
const Transfer = ({ params }) => {
  const { user } = useSelector(selectAuth);

  const searchFields = {
    id__in: { type: "string", label: "ID" },
    app_id__in: { type: "string", label: "AppID" },
    app_user_id__in: { type: "string", label: "App用户ID" },
    created__btw: { type: "rangeDate", label: "创建时间" },
  };
  const {
    res: { list, meta },
    loading: listLoading,
    handleSearch,
    handleGetList,
    handleChangePage,
    handleChange,
  } = useList(getTransfersApp, selectTransfersApp, params);

  const [jsonVisible, setJsonVisible] = useState(false);
  const [currentRow, setCurrentRow] = useState({});
  const handleJsonClick = record => {
    setCurrentRow(record);
    setJsonVisible(true);
  };

  const [detailVisible, setDetailVisible] = useState(false);
  const handleDetailClick = record => {
    setCurrentRow(record);
    setDetailVisible(true);
  };

  const handleClaimClick = record => {
    Modal.confirm({
      title: "是否认领",
      icon: <ExclamationCircleOutlined />,
      content: `即将认领 ${record.id}，是否继续？`,
      okText: "确认",
      cancelText: "取消",
      onOk: close => handleClaim(close, record),
    });
  };
  const handleClaim = async (close, record) => {
    const { status } = await claimTransfer({
      id: record.id,
      formModel: { paid_id: user.id },
    });
    close();
    if (status !== 200) return;
    handleGetList(params);
  };

  const [paidVisible, setPaidVisible] = useState(false);
  const [paidLoading, setPaidLoading] = useState(false);
  const handlePaidClick = record => {
    setCurrentRow(record);
    setPaidVisible(true);
  };
  const handlePaid = async formModel => {
    setPaidLoading(true);
    const { status } = await paidTransfer({
      id: currentRow.id,
      formModel: {
        ...formModel,
        paid_id: user.id,
      },
    });
    setPaidLoading(false);
    if (status !== 200) return;
    setPaidVisible(false);
    message.success("已出款!");
    await handleGetList(params);
  };

  const [editLoading, setEditLoading] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [editMode, setEditMode] = useState("deny");
  const fields =
    editMode === "failed"
      ? [
          {
            label: "错误码",
            name: "failure_code",
            inputType: "string",
          },
          {
            label: "失败原因",
            name: "failure_msg",
            inputType: "string",
            required: true,
          },
        ]
      : [
          {
            label: "备注",
            name: "note",
            inputType: "string",
          },
        ];
  const handleEditClick = (record, mode) => {
    setCurrentRow(record);
    setEditMode(mode);
    setEditVisible(true);
  };
  const handleEdit = async formModel => {
    setEditLoading(true);
    const { status } =
      editMode === "deny"
        ? await denyTransfer({
            id: currentRow.id,
            formModel,
          })
        : await failedTransfer({
            id: currentRow.id,
            formModel,
          });
    setEditLoading(false);
    if (status !== 200) return;
    setEditVisible(false);
    message.success(`已${TYPE_ENUMS[editMode]}`);
    await handleGetList(params);
  };
  const handleSucceededClick = async record => {
    Modal.confirm({
      title: "是否出款成功",
      icon: <ExclamationCircleOutlined />,
      content: `即将出款成功 ${record.id}，是否继续？`,
      okText: "确认",
      cancelText: "取消",
      onOk: close => handleSucceeded(close, record),
    });
  };
  const handleSucceeded = async (close, record) => {
    const { status } = await succeededTransfer({
      id: record.id,
      formModel: { paid_id: user.id },
    });
    close();
    if (status !== 200) return;
    handleGetList(params);
  };
  const handleCancelClick = record => {
    Modal.confirm({
      title: "是否取消认领",
      icon: <ExclamationCircleOutlined />,
      content: `即将取消认领 ${record.id}，是否继续？`,
      okText: "确认",
      cancelText: "取消",
      onOk: close => handleCancel(close, record),
    });
  };
  const handleCancel = async (close, record) => {
    const { status } = await cancelTransfer({ id: record.id });
    close();
    if (status !== 200) return;
    handleGetList(params);
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
            onClick={() => handleJsonClick(record)}
            type="link"
            className="p-0"
          >
            json
          </Button>
          <Button
            size="small"
            onClick={() => handleDetailClick(record)}
            type="link"
            className="p-0"
          >
            查看
          </Button>
          {params?.status === 2 && (
            <Button
              size="small"
              type="text"
              className="p-0"
              onClick={() => handleClaimClick(record)}
            >
              认领
            </Button>
          )}
          {params?.status === 7 && (
            <Button
              size="small"
              type="text"
              className="p-0"
              onClick={() => handlePaidClick(record)}
            >
              出款
            </Button>
          )}
          {params?.status === 7 && (
            <Button
              size="small"
              type="text"
              className="p-0"
              onClick={() => handleCancelClick(record)}
            >
              取消认领
            </Button>
          )}
          {params?.status === 7 && (
            <Button
              size="small"
              type="text"
              className="p-0"
              onClick={() => handleEditClick(record, "deny")}
            >
              审核拒绝
            </Button>
          )}
          {params?.status === 8 && (
            <Button
              size="small"
              type="text"
              className="p-0"
              onClick={() => handleSucceededClick(record)}
            >
              出款成功
            </Button>
          )}
          {params?.status === 8 && (
            <Button
              size="small"
              type="text"
              className="p-0"
              onClick={() => handleEditClick(record, "failed")}
            >
              {TYPE_ENUMS.failed}
            </Button>
          )}
        </Space>
      ),
    },
  ];

  const defaultColumns = [
    "id",
    "order_no",
    "app_name_cn",
    "name",
    "amount",
    "amount_paid",
    "currency",
    "gateway",
    "gateway_name",
    "created",
    "succeeded",
    "status",
    "action",
  ];
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
        onShowSizeChange={handleChangePage}
      />
      <JsonModal
        width={650}
        visible={jsonVisible}
        data={currentRow}
        onCancel={() => setJsonVisible(false)}
        loading={false}
      />
      <Detail
        title="代付明細"
        visible={detailVisible}
        data={currentRow}
        onCancel={() => setDetailVisible(false)}
        loading={false}
        columns={columns}
      />
      <EditableConfirm
        title={TYPE_ENUMS[editMode]}
        fields={fields}
        visible={editVisible}
        data={currentRow}
        onCancel={() => setEditVisible(false)}
        loading={editLoading}
        onOk={handleEdit}
      />
      <Paid
        visible={paidVisible}
        data={currentRow}
        onCancel={() => setPaidVisible(false)}
        loading={paidLoading}
        onOk={handlePaid}
      />
    </Space>
  );
};
export default Transfer;
