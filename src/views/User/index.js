import { useState } from "react";
import { Button, Space, Switch } from "antd";
import {
  selectUser,
  getUsers,
  getUser,
  addUser,
  editUser,
} from "@/store/slice/user";
import { PlusOutlined } from "@ant-design/icons";
import { useList, useDetail, useColumnsSelect } from "@/utils/hook";
import { SearchFormFactory } from "@/components/factory/FormFactory";
import { EditableTable } from "@/components/factory/TableFactory";
import ColumnsSelect from "@/components/ColumnsSelect";
import Tag from "@/components/Tag";
import AddEdit from "./AddEdit";
import Detail from "@/components/Detail";
import JsonModal from "@/components/JsonModal";
import { IsBoolEnum } from "@/utils/enum";
import { dateFormat } from "@/utils/format";

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
    handleSearch,
    handleGetList,
    handleChangePage,
    handleChange,
    handleAdd: handleAddHook,
    setLoading: setListLoading,
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
    await handleEditHook({ action: editUser, id: currentRow.id, ...formModel });
    setEditVisible(false);
    handleGetList({ page: meta.page });
    setDetailId(null);
  };
  const handleRowEditSubmit = async ({ id, ...params }) => {
    await handleEditHook({ action: editUser, id, ...params });
    handleGetList({ page: meta.current });
  };
  const handleChangeIsActive = async (checked, { id, ...params }) => {
    setListLoading(true);
    await handleEditHook({
      action: editUser,
      id,
      ...params,
      is_active: checked,
    });
    handleGetList({ page: meta.current });
  };

  const columns = [
    { title: "ID", dataIndex: "id", sorter: true },
    {
      title: "姓名",
      dataIndex: "name",
      editable: true,
      inputType: "string",
      sorter: true,
    },
    {
      title: "帐号",
      dataIndex: "username",
      editable: true,
      inputType: "string",
      sorter: true,
    },
    { title: "电话", dataIndex: "phone", editable: true, inputType: "string" },
    { title: "email", dataIndex: "email", editable: true, inputType: "string" },
    {
      title: "创建日期",
      dataIndex: "created",
      render: val => dateFormat(val),
      width: 120,
      sorter: true,
    },
    {
      title: "更新日期",
      dataIndex: "updated",
      render: val => dateFormat(val),
      width: 120,
      sorter: true,
    },
    {
      title: "启用",
      dataIndex: "is_active",
      dRender: val => <Tag val={val} />,
      render: (val, record) => (
        <Switch
          checked={val}
          onChange={checked => handleChangeIsActive(checked, record)}
        />
      ),
    },
    {
      title: "是否为管理员",
      dataIndex: "is_admin",
      render: val => <Tag val={val} />,
    },
    {
      title: "是否为代理",
      dataIndex: "is_agent",
      render: val => <Tag val={val} />,
    },
    {
      title: "是否为开发者",
      dataIndex: "is_developer",
      render: val => <Tag val={val} />,
    },
    {
      title: "是否为职员",
      dataIndex: "is_staff",
      render: val => <Tag val={val} />,
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
  const defaultColumns = ["id", "name", "username", "is_active", "action"];
  const { selectedColumns, handleSelectedColumnsChange } = useColumnsSelect({
    columns,
    defaultColumns,
  });
  return (
    <Space direction="vertical" size="middle" className="w-100">
      <SearchFormFactory fields={searchFields} handleSubmit={handleSearch} />
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setAddVisible(true)}
      >
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
        meta={meta}
        loading={listLoading}
        onChangePage={handleChangePage}
        onShowSizeChange={handleChangePage}
        onChange={handleChange}
        onRowEditSubmit={handleRowEditSubmit}
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
        title="职员明细"
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
