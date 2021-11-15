import { useState, useEffect } from "react";
import { Space, Button, Modal, message } from "antd";
import {
  selectTransfer,
  getTransfers,
  getTransfersSum,
  claimTransfer,
  approveTransfer,
  denyTransfer,
  paidTransfer,
  succeededTransfer,
  failedTransfer,
  notifyTransfer,
  cancelTransfer,
  queryTransfer,
  repaidTransfer,
} from "@/store/slice/transfer";
import { SearchFormFactory } from "@/components/factory/FormFactory";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useList } from "@/utils/hook";
import { transferStatus, IsBoolEnum } from "@/utils/enum";
import JsonModal from "@/components/JsonModal";
import Detail from "@/components/Detail";
import { NormalTable } from "@/components/factory/TableFactory";
import EditableConfirm from "@/components/EditableConfirm";
import Paid from "./Paid";
import Repaid from "./Repaid";
import { useSelector } from "react-redux";
import { selectAuth } from "@/store/slice/auth";
import { selectApp, getApps } from "@/store/slice/app";
import {
  columns as ListColumns,
  detailColumnsCard,
  detailColumnsUSDT,
  sumColumns,
} from "./Columns";
import { useDispatch } from "react-redux";
import SumTable from "@/components/SumTable";
const TYPE_ENUMS = {
  failed: "出款失败",
};
const Transfer = ({ params }) => {
  const { user } = useSelector(selectAuth);
  const searchFields = {
    id__in: { type: "string", label: "ID" },
    app_id__in: { type: "string", label: "AppID" },
    app_user_id__in: { type: "string", label: "App用户ID" },
    order_no__in: { type: "string", label: "开发者订单号" },
    app_name: {
      type: "searchSelect",
      label: "App姓名",
      action: getApps,
      selector: selectApp,
      searchKey: "name",
      val: "id",
      optionLabel: i => `${i.id} ${i.name}`,
    },
    app_cn: {
      type: "searchSelect",
      label: "商户列表",
      action: getApps,
      selector: selectApp,
      searchKey: "name_cn",
      val: "id",
      mode: "multiple",
      optionLabel: i => `${i.id} ${i.name_cn}`,
    },
    gateway_name__k: { type: "string", label: "网关名称" },
    is_online: {
      type: "select",
      label: "是否在线订单",
      options: IsBoolEnum,
    },
    status: { type: "select", label: "订单状态", options: transferStatus },
    created__btw: { type: "rangeDate", label: "创建时间" },
  };
  const {
    res: { list, meta, sum },
    loading: listLoading,
    handleSearch,
    handleGetList,
    handleChangePage,
    handleChange,
  } = useList(getTransfers, selectTransfer, params);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTransfersSum());
    // eslint-disable-next-line
  }, []);
  const handleCustomSearch = formModel => {
    const { app_cn, app_name, app_id__in, ...rest } = formModel;
    let allAppIds = [];
    if (app_name) {
      allAppIds.push(app_name);
    }
    if (app_cn) {
      allAppIds = [...allAppIds, ...app_cn];
    }
    if (app_id__in) {
      allAppIds = [...allAppIds, ...app_id__in.split(",")];
    }
    const params = {
      ...(allAppIds.join(",") && { app_id__in: allAppIds.join(",") }),
      ...rest,
    };
    handleSearch(params);
    dispatch(getTransfersSum(params));
  };
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
  const [editMode, setEditMode] = useState("approve");
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
            name: "comments",
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
      editMode === "approve"
        ? await approveTransfer({
            id: currentRow.id,
            formModel: { ...formModel, approver_id: user.id },
          })
        : editMode === "deny"
        ? await denyTransfer({
            id: currentRow.id,
            formModel: { ...formModel, approver_id: user.id },
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
  const handleNotifyClick = record => {
    Modal.confirm({
      title: "是否手动回调",
      icon: <ExclamationCircleOutlined />,
      content: `即将手动回调 ${record.id}，是否继续？`,
      okText: "确认",
      cancelText: "取消",
      onOk: close => handleNotify(close, record),
    });
  };
  const handleNotify = async (close, record) => {
    const { status } = await notifyTransfer({ id: record.id });
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
  const handleQuery = async record => {
    const { status } = await queryTransfer(record.id);
    if (status !== 200) return;
    handleGetList(params);
  };
  const [repaidVisible, setRepaidVisible] = useState(false);
  const [repaidLoading, setRepaidLoading] = useState(false);
  const handleRepaidClick = record => {
    setCurrentRow(record);
    setRepaidVisible(true);
  };
  const handleRepaid = async formModel => {
    setRepaidLoading(true);
    const { status } = await repaidTransfer({
      id: currentRow.id,
      formModel: {
        ...formModel,
        paid_id: user.id,
      },
    });
    setRepaidLoading(false);
    if (status !== 200) return;
    setRepaidVisible(false);
    message.success("已重新出款!");
    await handleGetList(params);
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
          {!params && record.status === 16 && (
            <Button
              size="small"
              type="text"
              className="p-0"
              onClick={() => handleNotifyClick(record)}
            >
              回调
            </Button>
          )}
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
          {params?.status__in === "8,18" && (
            <Button
              size="small"
              type="text"
              className="p-0"
              onClick={() => handleSucceededClick(record)}
            >
              出款成功
            </Button>
          )}
          {params?.status__in === "8,18" && (
            <Button
              size="small"
              type="text"
              className="p-0"
              onClick={() => handleEditClick(record, "failed")}
            >
              {TYPE_ENUMS.failed}
            </Button>
          )}
          {params?.status__in === "8,18" && (
            <Button
              size="small"
              type="text"
              className="p-0"
              onClick={() => handleQuery(record)}
            >
              查询
            </Button>
          )}
          {params?.status__in === "8,18" && (
            <Button
              size="small"
              type="text"
              className="p-0"
              onClick={() => handleRepaidClick(record)}
            >
              重新出款
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
      <SearchFormFactory
        fields={searchFields}
        handleSubmit={handleCustomSearch}
      />
      <SumTable data={sum} labels={sumColumns} />
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
        columns={
          currentRow.currency === 0 ? detailColumnsCard : detailColumnsUSDT
        }
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
      <Repaid
        visible={repaidVisible}
        data={currentRow}
        onCancel={() => setRepaidVisible(false)}
        loading={repaidLoading}
        onOk={handleRepaid}
      />
    </Space>
  );
};
export default Transfer;
