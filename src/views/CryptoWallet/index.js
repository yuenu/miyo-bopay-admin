import { useState } from "react";
import { Button, Space, Table, message } from "antd";
import {
  selectCryptoWallet,
  getCryptoWallets,
  getCryptoWallet,
  addCryptoWallet,
} from "@/store/slice/cryptoWallet";
import { Currency, isBoolEnum } from "@/utils/enum";
import { priceFormat } from "@/utils/format";
import { PlusOutlined } from "@ant-design/icons";
import { useList, useDetail } from "@/utils/hook";
import { SearchFormFactory } from "@/components/factory/FormFactory";
import AddEdit from "./AddEdit";
import Detail from "./Detail";
import Tag from "@/components/Tag";
import { useHistory, generatePath } from "react-router-dom";

const CryptoWallet = () => {
  const history = useHistory();

  const searchFields = {
    id: { type: "string", lang: "ID" },
    name: { type: "string", lang: "钱包名" },
    currency: { type: "select", lang: "货币", options: Currency },
    is_active: {
      type: "select",
      lang: "是否启用",
      options: isBoolEnum,
      isBool: true,
    },
  };

  const {
    res: { list, meta },
    loading: listLoading,
    handleGetList,
    handleChangePage,
  } = useList(getCryptoWallets, selectCryptoWallet);

  const [addVisible, setAddVisible] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const handleAddClick = () => {
    setAddVisible(true);
  };
  const handleAdd = async formModel => {
    setAddLoading(true);
    const { status } = await addCryptoWallet(formModel);
    status === 200 && message.success("新增成功！");
    await handleGetList({ page: meta.page });
    setAddLoading(false);
    setAddVisible(false);
  };

  const [detailId, setDetailId] = useState(null);
  const { currentRow, loading: detailLoading } = useDetail(
    { action: getCryptoWallet, id: detailId },
    selectCryptoWallet,
  );
  const [detailVisible, setDetailVisible] = useState(false);
  const handleDetailClick = async id => {
    setDetailVisible(true);
    setDetailId(id);
  };

  const handleEditClick = async id => {
    history.push(generatePath("/CryptoWalletEdit/:id", { id }));
  };

  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "钱包名", dataIndex: "name", width: "150px" },
    { title: "钱包所有者", dataIndex: "owner" },
    {
      title: "货币",
      dataIndex: "currency",
      render: val => Currency[val] || "",
    },
    {
      title: "余额",
      dataIndex: "balance",
      render: (val, record) => priceFormat({ val, currency: record.currency }),
    },
    { title: "区块链", dataIndex: "network" },
    {
      title: "是否启用",
      dataIndex: "is_active",
      render: val => <Tag val={val} />,
    },
    { title: "备注", dataIndex: "note" },
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
          <Button>禁用</Button>
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
    </Space>
  );
};
export default CryptoWallet;
