import { useState } from "react";
import { Button, Space, Table } from "antd";
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
import AddEdit from "./AddEdit";
import Detail from "./Detail";

const User = () => {
  const searchFields = {
    id: { type: "string", label: "ID" },
    name: { type: "string", label: "username" },
    login_time__btw: { type: "rangeDate", label: "loginTime" },
  };
  const {
    res: { list, meta },
    loading: listLoading,
    handleGetList,
    handleChangePage,
    handleAdd: handleAddHook,
  } = useList(getDevelopers, selectDeveloper);

  const [addVisible, setAddVisible] = useState(false);
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

  const [editVisible, setEditVisible] = useState(false);
  const handleEditClick = async id => {
    setDetailId(id);
    setEditVisible(true);
  };
  const handleEdit = async formModel => {
    await handleEditHook({
      action: editDeveloper,
      id: currentRow.id,
      ...formModel,
    });
    setEditVisible(false);
    handleGetList({ page: meta.page });
    setDetailId(null);
  };

  const columns = [
    { title: "id", dataIndex: "id" },
    { title: "帐户ID", dataIndex: "user_id" },
    { title: "帐户名称", dataIndex: "username" },
    { title: "姓名", dataIndex: "name" },
    { title: "电话", dataIndex: "phone" },
    { title: "email", dataIndex: "email" },
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

      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setAddVisible(true)}
      >
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
export default User;
