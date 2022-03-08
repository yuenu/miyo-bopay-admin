import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Space, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  selectAppAcct,
  getAppAccts,
  getAppAcct,
  addAppAcct,
  editAppAcct,
  balanceAppAcct,
} from "@/store/slice/appAcct";
import { selectAuth } from "@/store/slice/auth";
import { SearchFormFactory } from "@/components/factory/FormFactory";
import { NormalTable } from "@/components/factory/TableFactory";
import EditableConfirm from "@/components/EditableConfirm";
import Detail from "@/components/Detail";
import JsonModal from "@/components/JsonModal";
import { useList, useDetail } from "@/utils/hook";
import { IsBoolEnum, AppStatus } from "@/utils/enum";
import { dateFormat, priceFormat } from "@/utils/format";
import { Currency } from "@/utils/enum";
import AddEdit from "./AddEdit";

const AppAcct = () => {
  const { user } = useSelector(selectAuth);
  const searchFields = {
    id__in: { type: "string", label: "ID" },
    name__k: { type: "string", label: "名称" },
    name_cn__k: { type: "string", label: "姓名" },
    developer_id__in: { type: "string", label: "开发者ID" },
    developer_name__k: { type: "string", label: "开发者姓名" },
    status: {
      type: "select",
      label: "状态",
      options: AppStatus,
    },
    is_active: {
      type: "select",
      label: "是否启用",
      options: IsBoolEnum,
      isBool: true,
    },
    created__btw: { type: "rangeDate", label: "创建日期" },
  };

  const {
    res: { list, meta },
    loading: listLoading,
    handleSearch,
    handleChangePage,
    handleChange,
    handleGetList,
    handleAdd: handleAddHook,
  } = useList(getAppAccts, selectAppAcct);

  const [addVisible, setAddVisible] = useState(false);
  const handleAddClick = () => {
    setAddVisible(true);
  };
  const handleAdd = async formModel => {
    handleAddHook({ action: addAppAcct, ...formModel });
    setAddVisible(false);
  };

  const [detailId, setDetailId] = useState(null);
  const {
    currentRow,
    loading: detailLoading,
    setLoading: setDetailLoading,
    handleEdit: handleEditHook,
  } = useDetail({ action: getAppAcct, id: detailId }, selectAppAcct);
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
  useEffect(() => {
    jsonVisible || setDetailId(null);
  }, [jsonVisible]);

  const [editVisible, setEditVisible] = useState(false);
  const handleEditClick = async id => {
    setDetailId(id);
    setEditVisible(true);
  };
  const handleEdit = async formModel => {
    const { status } = await handleEditHook({
      action: editAppAcct,
      id: currentRow.id,
      ...formModel,
    });
    if (status !== 200) return;
    setEditVisible(false);
    setDetailId(null);
    handleGetList({ page: meta.current });
  };

  const fields = [
    {
      label: "增加或减少金額",
      name: "amount",
      inputType: "price",
      required: true,
    },
    {
      label: "备注",
      name: "note",
      inputType: "string",
    },
  ];
  const [balanceVisible, setBalanceVisible] = useState(false);
  const handleBalanceClick = record => {
    setDetailId(record.id);
    setBalanceVisible(true);
  };
  const handleCancelBalance = () => {
    setBalanceVisible(false);
    setDetailId(null);
  };
  const handleBalance = async formModel => {
    setDetailLoading(true);
    const { status } = await balanceAppAcct({
      id: currentRow.id,
      formModel: { ...formModel, user_id: user.id, username: user.username },
    });
    setDetailLoading(false);
    if (status !== 200) return;
    handleCancelBalance();
    message.success(`已更新余额`);
    handleGetList({ page: meta.current });
  };
  const columns = [
    { title: "ID", dataIndex: "id", sorter: true },
    { title: "商户名称", dataIndex: "app_name", sorter: true },
    {
      title: "余额",
      dataIndex: "balance",
      render: (val, record) => priceFormat({ val, currency: record.currency }),
      className: "text-nowrap",
      sorter: true,
    },
    {
      title: "币种",
      dataIndex: "currency",
      render: val => Currency[val] || "",
      className: "text-nowrap",
    },
    {
      title: "圈存金额",
      dataIndex: "block_amount",
      render: val => val,
      className: "text-nowrap",
      sorter: true,
    },
    { title: "商户ID", dataIndex: "app_id", sorter: true },
    {
      title: "创建日期",
      dataIndex: "created",
      render: val => dateFormat(val),
      className: "text-nowrap",
      sorter: true,
    },
    {
      title: "更新日期",
      dataIndex: "updated",
      render: val => dateFormat(val),
      className: "text-nowrap",
      sorter: true,
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
          <Button
            size="small"
            onClick={() => handleBalanceClick(record)}
            type="link"
            className="p-0"
          >
            修改余额
          </Button>
          <Button
            size="small"
            onClick={() => handleEditClick(record.id)}
            type="text"
            className="p-0"
          >
            编辑
          </Button>
        </Space>
      ),
    },
  ];
  const defaultColumns = [
    "id",
    "app_name",
    "balance",
    "block_amount",
    "currency",
    "app_id",
    "created",
    "action",
  ];
  return (
    <Space direction="vertical" size="middle" className="w-100">
      <SearchFormFactory fields={searchFields} handleSubmit={handleSearch} />
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAddClick}>
        添加
      </Button>
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
      <AddEdit
        visible={addVisible}
        onOk={handleAdd}
        onCancel={() => setAddVisible(false)}
        loading={listLoading}
        mode="add"
      />
      <JsonModal
        visible={jsonVisible}
        data={currentRow}
        onCancel={() => setJsonVisible(false)}
        loading={detailLoading}
      />
      <Detail
        title="商户账户明细"
        visible={detailVisible}
        data={currentRow}
        onCancel={() => setDetailVisible(false)}
        loading={detailLoading}
        columns={columns.filter(i => i.dataIndex !== "action")}
      />
      <EditableConfirm
        title="更新余额"
        fields={fields}
        visible={balanceVisible}
        data={{ ...currentRow, currency: 0 }}
        onCancel={handleCancelBalance}
        loading={detailLoading}
        onOk={handleBalance}
      />
      <AddEdit
        visible={editVisible}
        onOk={handleEdit}
        onCancel={() => setEditVisible(false)}
        loading={detailLoading}
        data={currentRow}
        mode="edit"
      />
    </Space>
  );
};
export default AppAcct;
