import { useState } from "react";
import { Button, Space, Table, message } from "antd";
import {
  selectUser,
  getUsers,
  getUser,
  addUser,
  editUser,
} from "@/store/slice/user";
import { PlusOutlined } from "@ant-design/icons";
import { useList, useDetail } from "@/utils/hook";
import { SearchFormFactory } from "@/components/factory/FormFactory";
import Tag from "@/components/Tag";
import AddEdit from "./AddEdit";
import Detail from "./Detail";

const User = () => {
  const searchFields = {
    id: { type: "string", lang: "會員ID" },
    name: { type: "string", lang: "會員姓名" },
    created__btw: { type: "rangeDate", lang: "創建日期" },
  };

  const {
    res: { list, meta },
    loading: listLoading,
    handleGetList,
    handleChangePage,
  } = useList(getUsers, selectUser);

  const [addVisible, setAddVisible] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const handleAddClick = () => {
    setAddVisible(true);
  };
  const handleAdd = async formModel => {
    setAddLoading(true);
    const { status } = await addUser(formModel);
    status === 200 && message.success("新增成功！");
    await handleGetList({ page: meta.page });
    setAddLoading(false);
    setAddVisible(false);
  };

  const [detailId, setDetailId] = useState(null);
  const {
    currentRow,
    loading: detailLoading,
    handleEdit: handleEditHook,
  } = useDetail(getUser, selectUser, detailId);
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
    await handleEditHook({ action: editUser, id: currentRow.id, ...formModel });
    setEditVisible(false);
    await handleGetList({ page: meta.page });
  };

  const columns = [
    { title: "id", dataIndex: "id" },
    { title: "姓名", dataIndex: "name" },
    { title: "電話", dataIndex: "phone" },
    {
      title: "启用",
      dataIndex: "is_active",
      render: val => <Tag val={val} />,
    },
    {
      title: "動作",
      dataIndex: "action",
      align: "right",
      render: (_, recore) => (
        <Space>
          <Button onClick={() => handleDetailClick(recore.id)} type="primary">
            查看
          </Button>
          <Button onClick={() => handleEditClick(recore.id)}>編輯</Button>
        </Space>
      ),
    },
  ];
  return (
    <Space direction="vertical" size="middle" className="w-100">
      <SearchFormFactory fields={searchFields} handleSubmit={handleGetList} />
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
