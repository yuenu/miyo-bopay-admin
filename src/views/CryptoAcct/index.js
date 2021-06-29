import { useState } from "react";
import { Button, Space, Switch, Typography } from "antd";
import {
  selectCryptoAcct,
  getCryptoAccts,
  getCryptoAcct,
  addCryptoAcct,
  editCryptoAcct,
  activeCryptoAcct,
} from "@/store/slice/cryptoAcct";
import { PlusOutlined } from "@ant-design/icons";
import { useList, useDetail, useColumnsSelect } from "@/utils/hook";
import { SearchFormFactory } from "@/components/factory/FormFactory";
import EditableTable from "@/components/factory/EditableTableFactory";
import ColumnsSelect from "@/components/ColumnsSelect";
import Tag from "@/components/Tag";
import AddEdit from "./AddEdit";
import Detail from "@/components/Detail";
import { Currency, IsBoolEnum, AddrRedirect } from "@/utils/enum";
import { priceFormat } from "@/utils/format";
import { dateFormat } from "@/utils/format";
import JsonModal from "@/components/JsonModal";
const { Link, Text, Paragraph } = Typography;

const CryptoAcct = () => {
  const searchFields = {
    id__in: { type: "string", label: "ID" },
    name__k: { type: "string", label: "名称" },
    currency: { type: "select", label: "货币", options: Currency },
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
    await handleEditHook({
      action: editCryptoAcct,
      id: currentRow.id,
      ...formModel,
    });
    setEditVisible(false);
    setDetailId(null);
    handleGetList({ page: meta.page });
  };

  const handleRowEditSubmit = async ({ id, ...params }) => {
    await handleEditHook({ action: editCryptoAcct, id, ...params });
    handleGetList({ page: meta.current });
  };
  const handleChangeIsActive = async (checked, { id }) => {
    setListLoading(true);
    await activeCryptoAcct({
      id,
      is_active: checked,
    });
    handleGetList({ page: meta.current });
  };
  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "名称", dataIndex: "name", editable: true, inputType: "string" },
    { title: "钱包ID", dataIndex: "wallet_id" },
    {
      title: "地址",
      dataIndex: "address",
      editable: true,
      inputType: "string",
      render: (val, record) => {
        return (
          <Paragraph
            style={{
              width: 200,
            }}
          >
            {AddrRedirect[record.currency] ? (
              <Link
                href={`${AddrRedirect[record.currency]}/${val}`}
                target="_blank"
              >
                {val}
              </Link>
            ) : (
              <Text>{val}</Text>
            )}
          </Paragraph>
        );
      },
    },
    {
      title: "余额",
      dataIndex: "balance",
      render: (val, record) => priceFormat({ val, currency: record.currency }),
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
      title: "last_block",
      dataIndex: "last_block",
    },
    {
      title: "last_block_time",
      dataIndex: "last_block_time",
    },
    {
      title: "排序",
      dataIndex: "seq",
    },
    {
      title: "序号",
      dataIndex: "w",
    },
    {
      title: "备注",
      dataIndex: "note",
      editable: true,
      inputType: "string",
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
      title: "动作",
      dataIndex: "action",
      align: "right",
      render: (_, record) => (
        <Space>
          <Button onClick={() => handleJsonClick(record.id)} type="primary">
            json
          </Button>
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
    "wallet_id",
    "address",
    "balance",
    "currency",
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
        title="收款地址明细"
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
export default CryptoAcct;
