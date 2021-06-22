import { useState } from "react";
import { Button, Space, Table } from "antd";
import { selectApp, getApps, getApp, addApp, editApp } from "@/store/slice/app";
import { PlusOutlined } from "@ant-design/icons";
import { useList, useDetail } from "@/utils/hook";
import { SearchFormFactory } from "@/components/factory/FormFactory";
import EditableTable from "@/components/factory/EditableTableFactory";
import Tag from "@/components/Tag";
import AddEdit from "./AddEdit";
import Detail from "./Detail";
import { IsBoolEnum, AppStatus } from "@/utils/enum";

const App = () => {
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
    handleGetList,
    handleChangePage,
    handleAdd: handleAddHook,
  } = useList(getApps, selectApp);

  const [addVisible, setAddVisible] = useState(false);
  const handleAppClick = () => {
    setAddVisible(true);
  };
  const handleAdd = async formModel => {
    handleAddHook({ action: addApp, ...formModel });
    setAddVisible(false);
  };

  const [detailId, setDetailId] = useState(null);
  const {
    currentRow,
    loading: detailLoading,
    handleEdit: handleEditHook,
  } = useDetail({ action: getApp, id: detailId }, selectApp);
  const [detailVisible, setDetailVisible] = useState(false);
  const handleDetailClick = async id => {
    setDetailId(id);
    setDetailVisible(true);
  };

  const [editVisible, setEditVisible] = useState(false);
  const handleEditClick = async id => {
    setDetailId(id);
    setEditVisible(true);
  };
  const handleEdit = async formModel => {
    await handleEditHook({ action: editApp, id: currentRow.id, ...formModel });
    setEditVisible(false);
    setDetailId(null);
    handleGetList({ page: meta.page });
  };
  const handleRowEditSubmit = async ({ id, ...params }) => {
    await handleEditHook({ action: editApp, id, ...params });
    handleGetList({ page: meta.page });
  };

  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "名称", dataIndex: "name", editable: true, inputType: "string" },
    {
      title: "姓名",
      dataIndex: "name_cn",
      editable: true,
      inputType: "string",
    },
    { title: "状态", dataIndex: "status", render: val => AppStatus[val] || "" },
    {
      title: "启用",
      dataIndex: "is_active",
      render: val => <Tag val={val} />,
    },
    {
      title: "动作",
      dataIndex: "action",
      align: "right",
      render: (_, record) => (
        <Space>
          <Button onClick={() => handleDetailClick(record.id)} type="primary">
            查看
          </Button>
          <Button onClick={() => handleEditClick(record.id)}>编辑</Button>
        </Space>
      ),
    },
  ];

  return (
    <Space direction="vertical" size="middle" className="w-100">
      <SearchFormFactory fields={searchFields} handleSubmit={handleGetList} />
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAppClick}>
        添加
      </Button>
      <EditableTable
        columns={columns}
        dataSource={list}
        loading={listLoading}
        onChange={handleChangePage}
        onRowEditSubmit={handleRowEditSubmit}
        pagination={meta}
      />
      <Table
        columns={columns}
        dataSource={list}
        pagination={meta}
        rowKey="id"
        scroll={{ x: "auto" }}
        onChange={handleChangePage}
        loading={listLoading}
      />
      <AddEdit
        visible={addVisible}
        onOk={handleAdd}
        onCancel={() => setAddVisible(false)}
        loading={listLoading}
        mode="add"
      />
      <Detail
        visible={detailVisible}
        data={currentRow}
        onCancel={() => setDetailVisible(false)}
        loading={detailLoading}
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
export default App;
