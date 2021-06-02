import { useState, useEffect } from "react";
import { Button, Space, Table, Modal, Tag, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUser,
  getUsers,
  getUser,
  editUser,
  deleteUser,
} from "@/store/slice/user";
import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import Search from "./Search";
import Add from "./Add";
import Detail from "./Detail";
import Edit from "./Edit";

const User = () => {
  const dispatch = useDispatch();

  const handleSearch = formModel => {
    handleGetList({ ...formModel });
  };

  const { users, currentUser, meta } = useSelector(selectUser);
  const [listLoading, setListLoading] = useState(false);
  const handleGetList = async (params = {}) => {
    setListLoading(true);
    await dispatch(getUsers(params));
    setListLoading(false);
  };
  useEffect(() => {
    handleGetList();
  }, []);
  const handleChangePage = (pagination, filters, sorter, extra) => {
    handleGetList({ page: pagination.current });
  };

  const [addVisible, setAddVisible] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const handleAddClick = () => {
    setAddVisible(true);
  };
  const handleAdd = formModel => {
    setAddLoading(true);
    console.log(formModel);
    setAddLoading(false);
    setAddVisible(false);
  };

  const [detailVisible, setDetailVisible] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const handleDetailClick = async id => {
    setDetailVisible(true);
    setDetailLoading(true);
    await dispatch(getUser(id));
    setDetailLoading(false);
  };

  const [editVisible, setEditVisible] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const handleEditClick = async id => {
    setEditVisible(true);
    setEditLoading(true);
    await dispatch(getUser(id));
    setEditLoading(false);
  };
  const handleEdit = async formModel => {
    setEditLoading(true);
    const { status } = await editUser({
      id: currentUser.id,
      formModel: { ...currentUser, ...formModel },
    });
    status === 204 && message.success("更新成功！");
    await handleGetList({ page: meta.page });
    setEditVisible(false);
    setEditLoading(false);
  };

  const handleDeleteClick = async id => {
    Modal.confirm({
      title: "確認刪除",
      icon: <ExclamationCircleOutlined />,
      content: `即將刪除 ${id}，是否繼續？`,
      okText: "確認",
      cancelText: "取消",
      onOk: close => handleDelete(close, id),
    });
  };
  const handleDelete = async (close, id) => {
    const { status } = await deleteUser(id);
    close();
    if (status !== 204) return;
    message.success("刪除成功！");
    await handleGetList({ page: meta.page });
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
          <Button onClick={() => handleDeleteClick(recore.id)} type="danger">
            刪除
          </Button>
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
        dataSource={users}
        pagination={meta}
        rowKey="id"
        scroll={{ x: "auto" }}
        onChange={handleChangePage}
        loading={listLoading}
      />
      <Add
        visible={addVisible}
        onOk={handleAdd}
        onCancel={() => setAddVisible(false)}
        loading={addLoading}
      />
      <Detail
        visible={detailVisible}
        data={currentUser}
        onCancel={() => setDetailVisible(false)}
        loading={detailLoading}
      />
      <Edit
        visible={editVisible}
        data={currentUser}
        onCancel={() => setEditVisible(false)}
        onOk={handleEdit}
        loading={editLoading}
      />
    </Space>
  );
};
export default User;