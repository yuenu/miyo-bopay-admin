import { useState, useEffect, useCallback } from "react";
import { Button, Space, Table, Tag, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAppUser,
  getAppUsers,
  getAppUser,
  addAppUser,
  editAppUser,
} from "@/store/slice/appUser";
import { PlusOutlined } from "@ant-design/icons";
import Search from "./Search";
import AddEdit from "./AddEdit";
import Detail from "./Detail";

const AppUser = () => {
  const dispatch = useDispatch();

  const handleSearch = formModel => {
    handleGetList({ ...formModel });
  };

  const { list, currentRow, meta } = useSelector(selectAppUser);
  const [listLoading, setListLoading] = useState(false);
  const handleGetList = useCallback(
    async (params = {}) => {
      setListLoading(true);
      await dispatch(getAppUsers(params));
      setListLoading(false);
    },
    [dispatch],
  );
  useEffect(() => {
    handleGetList();
  }, [handleGetList]);
  const handleChangePage = (pagination, filters, sorter, extra) => {
    handleGetList({ page: pagination.current });
  };

  const [addVisible, setAddVisible] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const handleAddClick = () => {
    setAddVisible(true);
  };
  const handleAdd = async formModel => {
    setAddLoading(true);
    const { status } = await addAppUser(formModel);
    status === 200 && message.success("新增成功！");
    await handleGetList({ page: meta.page });
    setAddLoading(false);
    setAddVisible(false);
  };

  const handleGetDetail = async id => {
    await dispatch(getAppUser(id));
  };

  const [detailVisible, setDetailVisible] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const handleDetailClick = async id => {
    setDetailVisible(true);
    setDetailLoading(true);
    await handleGetDetail(id);
    setDetailLoading(false);
  };

  const [editVisible, setEditVisible] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const handleEditClick = async id => {
    setEditVisible(true);
    setEditLoading(true);
    await handleGetDetail(id);
    setEditLoading(false);
  };
  const handleEdit = async formModel => {
    setEditLoading(true);
    const { status } = await editAppUser({
      id: currentRow.id,
      formModel: { ...currentRow, ...formModel },
    });
    status === 200 && message.success("更新成功！");
    await handleGetList({ page: meta.page });
    setEditVisible(false);
    setEditLoading(false);
  };

  const columns = [
    { title: "id", dataIndex: "id" },
    { title: "姓名", dataIndex: "name" },
    { title: "電話", dataIndex: "phone" },
    {
      title: "is_active",
      dataIndex: "is_active",
      render: (_, recore) => (
        <Tag color={_ ? "green" : "default"}>{_.toString()}</Tag>
      ),
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
      <Search onOk={handleSearch} />
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
        loading={editLoading}
        data={currentRow}
        mode="edit"
      />
    </Space>
  );
};
export default AppUser;
