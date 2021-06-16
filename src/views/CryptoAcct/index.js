import { useState } from "react";
import { Button, Space, Table } from "antd";
import {
  selectCryptoAcct,
  getCryptoAccts,
  getCryptoAcct,
  addCryptoAcct,
  editCryptoAcct,
} from "@/store/slice/cryptoAcct";
import { PlusOutlined } from "@ant-design/icons";
import { useList, useDetail } from "@/utils/hook";
import { SearchFormFactory } from "@/components/factory/FormFactory";
import Tag from "@/components/Tag";
import AddEdit from "./AddEdit";
import Detail from "./Detail";
import { Currency } from "@/utils/enum";
import { priceFormat } from "@/utils/format";
const CryptoAcct = () => {
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
  } = useList(getCryptoAccts, selectCryptoAcct);

  const [addVisible, setAddVisible] = useState(false);
  const handleAdd = async formModel => {
    handleAddHook({ action: addCryptoAcct, ...formModel });
    setAddVisible(false);
  };
  const [detailId, setDetailId] = useState(null);
  const {
    currentRow,
    loading: detailLoading,
    handleEdit: handleEditHook,
  } = useDetail({ action: getCryptoAcct, id: detailId }, selectCryptoAcct);
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
      action: editCryptoAcct,
      id: currentRow.id,
      ...formModel,
    });
    setEditVisible(false);
    setDetailId(null);
    handleGetList({ page: meta.page });
  };

  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "名称", dataIndex: "name" },
    {
      title: "余额",
      dataIndex: "balance",
      render: (val, record) => priceFormat({ val, currency: record.currency }),
    },
    {
      title: "货币",
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
export default CryptoAcct;
