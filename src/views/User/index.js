import { useState } from "react";
import { Button, Space, Table } from "antd";
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
import { IsBoolEnum } from "@/utils/enum";

const User = () => {
  const searchFields = {
    id__in: { type: "string", label: "会员ID" },
    name__k: { type: "string", label: "会员姓名" },
    username__k: { type: "string", label: "帐号" },
    created__btw: { type: "rangeDate", label: "创建日期" },
    is_active: {
      type: "select",
      label: "是否启用",
      options: IsBoolEnum,
      isBool: true,
    },
    is_admin: {
      type: "select",
      label: "是否为管理员",
      options: IsBoolEnum,
      isBool: true,
    },
    is_agent: {
      type: "select",
      label: "是否为代理",
      options: IsBoolEnum,
      isBool: true,
    },
    is_developer: {
      type: "select",
      label: "是否为开发者",
      options: IsBoolEnum,
      isBool: true,
    },
    is_staff: {
      type: "select",
      label: "是否为职员",
      options: IsBoolEnum,
      isBool: true,
    },
  };

  const {
    res: { list, meta },
    loading: listLoading,
    handleGetList,
    handleChangePage,
    handleAdd: handleAddHook,
  } = useList(getUsers, selectUser);

  const [addVisible, setAddVisible] = useState(false);
  const handleAdd = async formModel => {
    handleAddHook({ action: addUser, ...formModel });
    setAddVisible(false);
  };

  const [detailId, setDetailId] = useState(null);
  const {
    currentRow,
    loading: detailLoading,
    handleEdit: handleEditHook,
  } = useDetail({ action: getUser, id: detailId }, selectUser);
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
    handleGetList({ page: meta.page });
    setDetailId(null);
  };

  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "姓名", dataIndex: "name" },
    { title: "帐号", dataIndex: "username" },
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
