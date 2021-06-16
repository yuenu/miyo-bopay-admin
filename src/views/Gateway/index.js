import { useState } from "react";
import { Button, Space, Table } from "antd";
import {
  selectGateway,
  getGateways,
  getGateway,
  addGateway,
  editGateway,
} from "@/store/slice/gateway";
import { PlusOutlined } from "@ant-design/icons";
import { useList, useDetail } from "@/utils/hook";
import { SearchFormFactory } from "@/components/factory/FormFactory";
import Tag from "@/components/Tag";
import AddEdit from "./AddEdit";
import Detail from "./Detail";
import { Currency } from "@/utils/enum";
const Gateway = () => {
  const searchFields = {
    id: { type: "string", label: "ID" },
    name: { type: "string", label: "名称" },
    created__btw: { type: "rangeDate", label: "创建日期" },
  };

  const {
    res: { list, meta },
    loading: listLoading,
    handleGetList,
    handleChangePage,
    handleAdd: handleAddHook,
  } = useList(getGateways, selectGateway);

  const [addVisible, setAddVisible] = useState(false);
  const handleAdd = async formModel => {
    handleAddHook({ action: addGateway, ...formModel });
    setAddVisible(false);
  };

  const [detailId, setDetailId] = useState(null);
  const {
    currentRow,
    loading: detailLoading,
    handleEdit: handleEditHook,
  } = useDetail({ action: getGateway, id: detailId }, selectGateway);
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
    await handleEditHook({
      action: editGateway,
      id: currentRow.id,
      ...formModel,
    });
    setEditVisible(false);
    handleGetList({ page: meta.page });
  };

  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "名称", dataIndex: "name", width: 140 },
    { title: "alias", dataIndex: "alias", width: 120 },
    {
      title: "货币类型",
      dataIndex: "currency",
      render: val => Currency[val] || "",
    },
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
export default Gateway;
