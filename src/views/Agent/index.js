import { useState, useEffect, useCallback } from "react";
import { Button, Space, Table, Modal, Tag, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAgent,
  getAgents,
  getAgent,
  addAgent,
  editAgent,
  deleteAgent,
} from "@/store/slice/agent";
import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import Search from "./Search";
import AddEdit from "./AddEdit";
import Detail from "./Detail";

const Agent = () => {
  const dispatch = useDispatch();

  const handleSearch = formModel => {
    handleGetList({ ...formModel });
  };

  const { list, currentRow, meta } = useSelector(selectAgent);
  const [listLoading, setListLoading] = useState(false);
  const handleGetList = useCallback(
    async (params = {}) => {
      setListLoading(true);
      await dispatch(getAgents(params));
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
    const { status } = await addAgent(formModel);
    status === 200 && message.success("新增成功！");
    await handleGetList({ page: meta.page });
    setAddLoading(false);
    setAddVisible(false);
  };

  const handleGetDetail = async id => {
    await dispatch(getAgent(id));
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
    const { status } = await editAgent({
      id: currentRow.id,
      formModel: { ...currentRow, ...formModel },
    });
    status === 200 && message.success("更新成功！");
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
    const { status } = await deleteAgent(id);
    close();
    if (status !== 200) return;
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
export default Agent;
