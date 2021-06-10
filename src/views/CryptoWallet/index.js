import { useState, useEffect, useCallback } from "react";
import { Button, Space, Table, Tag, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCryptoWallet,
  getCryptoWallets,
  getCryptoWallet,
  addCryptoWallet,
} from "@/store/slice/cryptoWallet";
import { isActiveLang, Currency, isBoolEnum } from "@/utils/enum";
import { priceFormat } from "@/utils/format";
import { PlusOutlined } from "@ant-design/icons";
import { SearchFormFactory } from "@/components/factory/FormFactory";
import AddEdit from "./AddEdit";
import Detail from "./Detail";
import { useHistory, generatePath } from "react-router-dom";

const CryptoWallet = () => {
  const history = useHistory();

  const dispatch = useDispatch();

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
    login_time__btw: { type: "rangeDate", lang: "loginTime" },
  };

  const { list, currentRow, meta } = useSelector(selectCryptoWallet);
  const [listLoading, setListLoading] = useState(false);
  const handleGetList = useCallback(
    async (params = {}) => {
      setListLoading(true);
      await dispatch(getCryptoWallets(params));
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
    const { status } = await addCryptoWallet(formModel);
    status === 200 && message.success("新增成功！");
    await handleGetList({ page: meta.page });
    setAddLoading(false);
    setAddVisible(false);
  };

  const handleGetDetail = async id => {
    await dispatch(getCryptoWallet(id));
  };

  const [detailVisible, setDetailVisible] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const handleDetailClick = async id => {
    setDetailVisible(true);
    setDetailLoading(true);
    await handleGetDetail(id);
    setDetailLoading(false);
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
      render: (_, recore) => (
        <Tag color={_ ? "green" : "default"}>{isActiveLang(_)}</Tag>
      ),
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
