import { useState } from "react";
import { Button, Space, message } from "antd";
import {
  selectRole,
  getRoles,
  getRole,
  addRole,
  editRole,
  getRoleUsers,
  addRoleUsers,
  deleteRoleUsers,
  editPerms,
} from "@/store/slice/role";
import { PlusOutlined } from "@ant-design/icons";
import { useList, useDetail, useColumnsSelect } from "@/utils/hook";
import { SearchFormFactory } from "@/components/factory/FormFactory";
import EditableTable from "@/components/factory/EditableTableFactory";
import Tag from "@/components/Tag";
import ColumnsSelect from "@/components/ColumnsSelect";
import AddEdit from "./AddEdit";
import Detail from "./Detail";
import EditUsers from "./EditUsers";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, generatePath } from "react-router-dom";
import { dateFormat } from "@/utils/format";

const Role = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const searchFields = {
    id__in: { type: "string", label: "ID" },
    name__k: { type: "string", label: "名称" },
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
    setLoading: setDetailLoading,
    handleEdit: handleEditHook,
  } = useDetail({ action: getRole, id: detailId }, selectRole);
  const [detailVisible, setDetailVisible] = useState(false);
  const handleDetailClick = async id => {
    setDetailId(id);
    setDetailVisible(true);
  };

  const handleDeletePerms = async params => {
    setDetailLoading(true);
    console.log(params);
    const id = detailId;
    const { status } = await editPerms({ id: detailId, perms: params });
    setDetailId(null);
    status === 200 && message.success("更新成功！");
    setDetailId(id);
    setDetailLoading(false);
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
  const handleAddUsers = async params => {
    setEditUsersLoading(true);
    await addRoleUsers({ id: editUsersCurrentId, ids: params.ids });
    await dispatch(getRoleUsers(editUsersCurrentId));
    setEditUsersLoading(false);
  };
  const handleDeleteUsers = async params => {
    setEditUsersLoading(true);
    await deleteRoleUsers({ id: editUsersCurrentId, ids: params });
    await dispatch(getRoleUsers(editUsersCurrentId));
    setEditUsersLoading(false);
  };

  const handleEditPermClick = id => {
    history.push(generatePath("/RolePerm/:id", { id }));
  };

  const handleRowEditSubmit = async ({ id, ...params }) => {
    await handleEditHook({ action: editRole, id, ...params });
    handleGetList({ page: meta.current });
  };

  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "名称", dataIndex: "name", editable: true, inputType: "string" },
    { title: "职员数量", dataIndex: "total" },
    { title: "备注", dataIndex: "note", editable: true, inputType: "string" },
    { title: "创建日期", dataIndex: "created", render: val => dateFormat(val) },
    { title: "更新日期", dataIndex: "updated", render: val => dateFormat(val) },

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
          <Button onClick={() => handleEditPermClick(record.id)}>
            编辑权限
          </Button>
        </Space>
      ),
    },
  ];
  const defaultColumns = ["id", "name", "action"];
  const { selectedColumns, setSelectedColumns } = useColumnsSelect({
    columns,
    defaultColumns,
  });
  return (
    <Space direction="vertical" size="middle" className="w-100">
      <SearchFormFactory fields={searchFields} handleSubmit={handleGetList} />
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAddClick}>
        添加
      </Button>
      <ColumnsSelect
        columns={columns}
        value={selectedColumns}
        onChange={setSelectedColumns}
      />
      <EditableTable
        columns={selectedColumns}
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
        onDelete={handleDeletePerms}
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
        onAdd={handleAddUsers}
        onDelete={handleDeleteUsers}
        onCancel={() => setEditUsersVisible(false)}
        loading={editUsersLoading}
        data={users}
      />
    </Space>
  );
};
export default Role;
