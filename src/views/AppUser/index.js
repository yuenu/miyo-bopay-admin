import { useState } from "react";
import { Button, Space, Table, message } from "antd";
import {
  selectAppUser,
  getAppUsers,
  getAppUser,
  addAppUser,
  editAppUser,
} from "@/store/slice/appUser";
import { useList, useDetail } from "@/utils/hook";
import { PlusOutlined } from "@ant-design/icons";
import { SearchFormFactory } from "@/components/factory/FormFactory";
import AddEdit from "./AddEdit";
import Detail from "./Detail";

const AppUser = () => {
  const searchFields = {
    id: { type: "string", label: "會員ID" },
    name: { type: "string", label: "會員姓名" },
    created__btw: { type: "rangeDate", label: "創建日期" },
  };
  const {
    res: { list, meta },
    loading: listLoading,
    handleGetList,
    handleChangePage,
  } = useList(getAppUsers, selectAppUser);

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

  const [detailId, setDetailId] = useState(null);
  const {
    currentRow,
    loading: detailLoading,
    handleEdit,
  } = useDetail({ action: getAppUser, id: detailId }, selectAppUser);
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
  const handleEditOk = async formModel => {
    await handleEdit({ action: editAppUser, id: currentRow.id, ...formModel });
    setEditVisible(false);
  };

  const columns = [
    { title: "id", dataIndex: "id" },
    { title: "姓名", dataIndex: "name" },
    { title: "AppId", dataIndex: "app_id" },
    { title: "AppName", dataIndex: "app_name" },
    { title: "AppUserId", dataIndex: "app_userid" },
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
        onOk={handleEditOk}
        onCancel={() => setEditVisible(false)}
        loading={detailLoading}
        data={currentRow}
        mode="edit"
      />
    </Space>
  );
};
export default AppUser;
