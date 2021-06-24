import { useState } from "react";
import { Button, Space, Switch } from "antd";
import {
  selectCryptoWallet,
  getCryptoWallets,
  getCryptoWallet,
  addCryptoWallet,
  editCryptoWallet,
} from "@/store/slice/cryptoWallet";
import { Currency, IsBoolEnum, Network } from "@/utils/enum";
import { priceFormat } from "@/utils/format";
import { PlusOutlined } from "@ant-design/icons";
import { useList, useDetail, useColumnsSelect } from "@/utils/hook";
import { SearchFormFactory } from "@/components/factory/FormFactory";
import EditableTable from "@/components/factory/EditableTableFactory";
import ColumnsSelect from "@/components/ColumnsSelect";
import Tag from "@/components/Tag";
import Add from "./Add";
import Detail from "@/components/Detail";
import { useHistory, generatePath } from "react-router-dom";
import { dateFormat } from "@/utils/format";

const CryptoWallet = () => {
  const history = useHistory();

  const searchFields = {
    id__in: { type: "string", label: "ID" },
    name__k: { type: "string", label: "钱包名" },
    owner__k: { type: "string", label: "钱包所有者" },
    currency: { type: "select", label: "货币", options: Currency },
    network: { type: "select", label: "区块链", options: Network },
    is_active: {
      type: "select",
      label: "是否启用",
      options: IsBoolEnum,
      isBool: true,
    },
    created__btw: { type: "rangeDate", label: "创建日期" },
  };

  const {
    res: { list, meta },
    loading: listLoading,
    handleGetList,
    handleChangePage,
    handleAdd: handleAddHook,
    setLoading: setListLoading,
  } = useList(getCryptoWallets, selectCryptoWallet);

  const [addVisible, setAddVisible] = useState(false);
  const handleAddClick = () => {
    setAddVisible(true);
  };
  const handleAdd = async formModel => {
    handleAddHook({ action: addCryptoWallet, ...formModel });
    setAddVisible(false);
  };

  const [detailId, setDetailId] = useState(null);
  const {
    currentRow,
    loading: detailLoading,
    handleEdit: handleEditHook,
  } = useDetail({ action: getCryptoWallet, id: detailId }, selectCryptoWallet);
  const [detailVisible, setDetailVisible] = useState(false);
  const handleDetailClick = async id => {
    setDetailVisible(true);
    setDetailId(id);
  };

  const handleEditClick = async id => {
    history.push(generatePath("/CryptoWalletEdit/:id", { id }));
  };
  const handleRowEditSubmit = async ({ id, ...params }) => {
    await handleEditHook({ action: editCryptoWallet, id, ...params });
    handleGetList({ page: meta.current });
  };
  const handleChangeIsActive = async (checked, { id, ...params }) => {
    setListLoading(true);
    await handleEditHook({
      action: editCryptoWallet,
      id,
      ...params,
      is_active: checked,
    });
    handleGetList({ page: meta.current });
  };
  const columns = [
    { title: "ID", dataIndex: "id" },
    {
      title: "钱包名",
      dataIndex: "name",
      width: "150px",
      editable: true,
      inputType: "string",
    },
    {
      title: "钱包所有者",
      dataIndex: "owner",
      editable: true,
      inputType: "string",
    },
    {
      title: "货币",
      dataIndex: "currency",
      editable: true,
      inputType: "select",
      options: Currency,
      render: val => Currency[val] || "",
    },
    {
      title: "余额",
      dataIndex: "balance",
      render: (val, record) => priceFormat({ val, currency: record.currency }),
    },
    {
      title: "区块链",
      dataIndex: "network",
      editable: true,
      inputType: "select",
      options: Network,
      render: val => Network[val] || "",
    },
    {
      title: "收款地址",
      dataIndex: "address",
      editable: true,
      inputType: "string",
    },
    {
      title: "备注",
      dataIndex: "note",
      editable: true,
      inputType: "string",
    },
    {
      title: "创建日期",
      dataIndex: "created",
      render: val => dateFormat(val),
    },
    {
      title: "更新日期",
      dataIndex: "updated",
      render: val => dateFormat(val),
    },
    {
      title: "是否启用",
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
  const defaultColumns = [
    "id",
    "name",
    "currency",
    "balance",
    "is_active",
    "action",
  ];
  const { selectedColumns, setSelectedColumns } = useColumnsSelect({
    columns,
    defaultColumns,
  });
  return (
    <Space direction="vertical" size="middle" className="w-100">
      <SearchFormFactory fields={searchFields} handleSubmit={handleGetList} />
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAddClick}>
        添加
      </Button>
      <ColumnsSelect
        columns={columns}
        value={selectedColumns}
        onChange={setSelectedColumns}
      />
      <EditableTable
        columns={selectedColumns}
        dataSource={list}
        pagination={meta}
        loading={listLoading}
        onChange={handleChangePage}
        onRowEditSubmit={handleRowEditSubmit}
      />
      <Add
        visible={addVisible}
        onOk={handleAdd}
        onCancel={() => setAddVisible(false)}
        loading={listLoading}
        mode="add"
      />
      <Detail
        title="钱包明細"
        visible={detailVisible}
        data={currentRow}
        onCancel={() => setDetailVisible(false)}
        loading={detailLoading}
        columns={columns.filter(i => i.dataIndex !== "action")}
      />
    </Space>
  );
};
export default CryptoWallet;
