import { useState, useEffect } from "react";
import { Button, Space } from "antd";
import {
  selectDeveloper,
  getDevelopers,
  getDeveloper,
  addDeveloper,
  editDeveloper,
} from "@/store/slice/developer";
import { useList, useDetail } from "@/utils/hook";
import { PlusOutlined } from "@ant-design/icons";
import { SearchFormFactory } from "@/components/factory/FormFactory";
import { EditableTable } from "@/components/factory/TableFactory";
import AddEdit from "./AddEdit";
import Detail from "@/components/Detail";
import { DeveloperStatus } from "@/utils/enum";
import { dateFormat } from "@/utils/format";
import JsonModal from "@/components/JsonModal";

const User = () => {
  const searchFields = {
    id__in: { type: "string", label: "ID" },
    name__k: { type: "string", label: "姓名" },
    user_id__in: { type: "string", label: "帐户ID" },
    username__k: { type: "string", label: "帐户名称" },
    status: { type: "select", label: "审核状态", options: DeveloperStatus },
    created__btw: { type: "rangeDate", label: "创建日期" },
  };
  const {
    res: { list, meta },
    loading: listLoading,
    handleSearch,
    handleGetList,
    handleChangePage,
    handleChange,
    handleAdd: handleAddHook,
  } = useList(getDevelopers, selectDeveloper);

  const [addVisible, setAddVisible] = useState(false);
  const handleAddClick = () => {
    setAddVisible(true);
  };
  const handleAdd = async formModel => {
    handleAddHook({ action: addDeveloper, ...formModel });
    setAddVisible(false);
  };

  const [detailId, setDetailId] = useState(null);
  const {
    currentRow,
    loading: detailLoading,
    handleEdit: handleEditHook,
  } = useDetail({ action: getDeveloper, id: detailId }, selectDeveloper);
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
      action: editDeveloper,
      id: currentRow.id,
      ...formModel,
    });
    if (status !== 200) return;
    setEditVisible(false);
    handleGetList({ page: meta.current });
    setDetailId(null);
  };
  const handleRowEditSubmit = async ({ id, ...params }) => {
    await handleEditHook({ action: editDeveloper, id, ...params });
    handleGetList({ page: meta.current });
  };

  const columns = [
    { title: "ID", dataIndex: "id", sorter: true },
    { title: "用户ID", dataIndex: "user_id", sorter: true },
    {
      title: "用户名",
      dataIndex: "username",
      editable: true,
      inputType: "string",
      sorter: true,
    },
    {
      title: "商户名",
      dataIndex: "name",
      editable: true,
      inputType: "string",
      sorter: true,
    },
    { title: "电话", dataIndex: "phone", editable: true, inputType: "string" },
    { title: "email", dataIndex: "email", editable: true, inputType: "string" },
    {
      title: "公司/组织",
      dataIndex: "org",
      editable: true,
      inputType: "string",
    },
    {
      title: "公司简介",
      dataIndex: "info",
      editable: true,
      inputType: "string",
    },
    {
      title: "公司官网",
      dataIndex: "site",
      editable: true,
      inputType: "string",
    },
    {
      title: "审核状态",
      dataIndex: "status",
      render: val => DeveloperStatus[val] || "",
      editable: true,
      inputType: "select",
      options: DeveloperStatus,
    },
    {
      title: "telegram",
      dataIndex: "telegram",
      editable: true,
      inputType: "string",
    },
    { title: "备注", dataIndex: "note", editable: true, inputType: "string" },
    {
      title: "创建日期",
      dataIndex: "created",
      render: val => dateFormat(val),
      sorter: true,
    },
    {
      title: "更新日期",
      dataIndex: "updated",
      render: val => dateFormat(val),
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
          <Button size="small" onClick={() => handleEditClick(record.id)}>
            编辑
          </Button>
        </Space>
      ),
    },
  ];
  const defaultColumns = [
    "id",
    "name",
    "username",
    "status",
    "created",
    "is_active",
    "action",
  ];
  return (
    <Space direction="vertical" size="middle" className="w-100">
      <SearchFormFactory fields={searchFields} handleSubmit={handleSearch} />
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAddClick}>
        添加
      </Button>
      <EditableTable
        allColumns={columns}
        defaultColumns={defaultColumns}
        dataSource={list}
        meta={meta}
        loading={listLoading}
        onChangePage={handleChangePage}
        onChange={handleChange}
        onRowEditSubmit={handleRowEditSubmit}
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
        title="开发者明細"
        visible={detailVisible}
        data={currentRow}
        onCancel={() => setDetailVisible(false)}
        loading={detailLoading}
        columns={columns.filter(i => i.dataIndex !== "action")}
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
export default User;
