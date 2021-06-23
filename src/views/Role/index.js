import { useState } from "react";
import { Button, Space } from "antd";
import {
  selectRole,
  getRoles,
  getRole,
  addRole,
  editRole,
  getRoleUsers,
  addRoleUsers,
} from "@/store/slice/role";
import { PlusOutlined } from "@ant-design/icons";
import { useList, useDetail } from "@/utils/hook";
import { SearchFormFactory } from "@/components/factory/FormFactory";
import EditableTable from "@/components/factory/EditableTableFactory";
import AddEdit from "./AddEdit";
import Detail from "./Detail";
import EditUsers from "./EditUsers";
import { IsBoolEnum, AppStatus } from "@/utils/enum";
import { useDispatch, useSelector } from "react-redux";

const Role = () => {
  const dispatch = useDispatch();
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
  } = useList(getRoles, selectRole);

  const [addVisible, setAddVisible] = useState(false);
  const handleAddClick = () => {
    setAddVisible(true);
  };
  const handleAdd = async formModel => {
    handleAddHook({ action: addRole, ...formModel });
    setAddVisible(false);
  };

  const [detailId, setDetailId] = useState(null);
  const {
    currentRow,
    loading: detailLoading,
    handleEdit: handleEditHook,
  } = useDetail({ action: getRole, id: detailId }, selectRole);
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
    await handleEditHook({ action: editRole, id: currentRow.id, ...formModel });
    setEditVisible(false);
    setDetailId(null);
    handleGetList({ page: meta.current });
  };

  const { users } = useSelector(selectRole);
  const [editUsersVisible, setEditUsersVisible] = useState(false);
  const [editUsersLoading, setEditUsersLoading] = useState(false);
  const [editUsersCurrentId, setEditUsersCurrentId] = useState(false);
  const handleEditUsersClick = async id => {
    setEditUsersLoading(true);
    setEditUsersCurrentId(id);
    await dispatch(getRoleUsers(id));
    setEditUsersVisible(true);
    setEditUsersLoading(false);
  };
  const handleEditUsers = async params => {
    setEditUsersLoading(true);
    await addRoleUsers({ id: editUsersCurrentId, ids: params.ids });
    await dispatch(getRoleUsers(editUsersCurrentId));
    setEditUsersLoading(false);
  };

  const handleRowEditSubmit = async ({ id, ...params }) => {
    await handleEditHook({ action: editRole, id, ...params });
    handleGetList({ page: meta.current });
  };

  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "名称", dataIndex: "name", editable: true, inputType: "string" },
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
          <Button onClick={() => handleEditUsersClick(record.id)}>
            职员管理
          </Button>
          <Button>编辑权限</Button>
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
      <EditableTable
        columns={columns}
        dataSource={list}
        loading={listLoading}
        onChange={handleChangePage}
        onRowEditSubmit={handleRowEditSubmit}
        pagination={meta}
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
      <EditUsers
        visible={editUsersVisible}
        onOk={handleEditUsers}
        onCancel={() => setEditUsersVisible(false)}
        loading={editUsersLoading}
        data={users}
      />
    </Space>
  );
};
export default Role;
