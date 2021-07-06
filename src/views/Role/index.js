import { useState } from "react";
import { Button, Space, message, Tag, Modal } from "antd";
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
import { EditableTable } from "@/components/factory/TableFactory";
import ColumnsSelect from "@/components/ColumnsSelect";
import AddEdit from "./AddEdit";
import Detail from "./Detail";
import EditUsers from "./EditUsers";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, generatePath } from "react-router-dom";
import { dateFormat, permsToArrayFormat } from "@/utils/format";
import JsonModal from "@/components/JsonModal";
import { ExclamationCircleOutlined } from "@ant-design/icons";

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
    handleSearch,
    handleGetList,
    handleChangePage,
    handleChange,
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

  const handleDeletePerms = async (params, id) => {
    setDetailLoading(true);
    const { status } = await editPerms({ id: id ?? detailId, perms: params });
    setDetailId(null);
    status === 200 && message.success("更新成功！");
    setDetailId(detailId);
    setDetailLoading(false);
  };

  const [jsonVisible, setJsonVisible] = useState(false);
  const handleJsonClick = async id => {
    setDetailId(id);
    setJsonVisible(true);
  };

  const [editVisible, setEditVisible] = useState(false);
  const handleEditClick = async id => {
    setDetailId(id);
    setEditVisible(true);
  };
  const handleEdit = async formModel => {
    const { status } = await handleEditHook({
      action: editRole,
      id: currentRow.id,
      ...formModel,
    });
    if (status !== 200) return;
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
  const handleListDeletePermsClick = ({ e, perm, record }) => {
    e.preventDefault();
    Modal.confirm({
      title: "是否删除权限",
      icon: <ExclamationCircleOutlined />,
      content: `即将删除 ${record.name} 「${perm.name}」，是否继续？`,
      okText: "确认",
      cancelText: "取消",
      onOk: close => handleListDeletePerms(close, perm, record),
    });
  };
  const handleListDeletePerms = async (close, perm, record) => {
    const params = { ...record.perms, [perm.key]: false };
    await handleDeletePerms(params, record.id);
    await handleGetList({ page: meta.current });
    close();
  };
  const columns = [
    { title: "ID", dataIndex: "id", sorter: true },
    {
      title: "名称",
      dataIndex: "name",
      editable: true,
      inputType: "string",
      sorter: true,
    },
    {
      title: "权限列表",
      dataIndex: "perms",
      render: (val, record) => (
        <Space size={[0, 4]} wrap>
          {permsToArrayFormat(val).map(i => (
            <Tag
              color="purple"
              key={i.key}
              closable
              onClose={e => handleListDeletePermsClick({ e, perm: i, record })}
            >
              {i.name}
            </Tag>
          ))}
        </Space>
      ),
    },
    { title: "职员数量", dataIndex: "total", sorter: true },
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
      align: "right",
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
          <Button size="small" onClick={() => handleEditUsersClick(record.id)}>
            职员管理
          </Button>
          <Button size="small" onClick={() => handleEditPermClick(record.id)}>
            编辑权限
          </Button>
        </Space>
      ),
    },
  ];
  const defaultColumns = ["id", "name", "perms", "action"];
  const { selectedColumns, handleSelectedColumnsChange } = useColumnsSelect({
    columns,
    defaultColumns,
  });
  return (
    <Space direction="vertical" size="middle" className="w-100">
      <SearchFormFactory fields={searchFields} handleSubmit={handleSearch} />
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAddClick}>
        添加
      </Button>
      <ColumnsSelect
        columns={columns}
        value={selectedColumns}
        onChange={handleSelectedColumnsChange}
      />
      <EditableTable
        columns={selectedColumns}
        dataSource={list}
        loading={listLoading}
        onChangePage={handleChangePage}
        onChange={handleChange}
        onRowEditSubmit={handleRowEditSubmit}
        onShowSizeChange={handleChangePage}
        meta={meta}
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
