import { useState } from "react";
import { Button, Space, message } from "antd";
import {
  selectCardAcct,
  getCardAccts,
  getCardAcct,
  editCardAcct,
  balanceCardAcct,
} from "@/store/slice/cardAcct";
import { useList, useDetail } from "@/utils/hook";
import { SearchFormFactory } from "@/components/factory/FormFactory";
import { EditableTable } from "@/components/factory/TableFactory";
import AddEdit from "./AddEdit";
import Detail from "@/components/Detail";
import { dateFormat, priceFormat } from "@/utils/format";
import JsonModal from "@/components/JsonModal";
import EditableConfirm from "@/components/EditableConfirm";
import { useSelector } from "react-redux";
import { selectAuth } from "@/store/slice/auth";

const CardAcct = () => {
  const { user } = useSelector(selectAuth);

  const searchFields = {
    id__in: { type: "string", label: "ID" },
    card_id__in: { type: "string", label: "银行卡ID" },
    card_name__k: { type: "string", label: "银行卡名称" },
    created__btw: { type: "rangeDate", label: "创建日期" },
  };

  const {
    res: { list, meta },
    loading: listLoading,
    handleSearch,
    handleGetList,
    handleChangePage,
    handleChange,
  } = useList(getCardAccts, selectCardAcct);

  const [detailId, setDetailId] = useState(null);
  const {
    currentRow,
    loading: detailLoading,
    handleEdit: handleEditHook,
  } = useDetail({ action: getCardAcct, id: detailId }, selectCardAcct);
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
    const { status } = await handleEditHook({
      action: editCardAcct,
      id: currentRow.id,
      ...formModel,
    });
    if (status !== 200) return;
    setEditVisible(false);
    setDetailId(null);
    handleGetList({ page: meta.page });
  };
  const fields = [
    {
      label: "金額",
      name: "amount",
      inputType: "price",
      required: true,
    },
    {
      label: "备注",
      name: "note",
      inputType: "string",
    },
  ];
  const [balanceVisible, setBalanceVisible] = useState(false);
  const [balanceLoading, setBalanceLoading] = useState(false);
  const handleBalanceClick = record => {
    setDetailId(record.id);
    setBalanceVisible(true);
  };
  const handleBalance = async formModel => {
    setBalanceLoading(true);
    const { status } = await balanceCardAcct({
      id: currentRow.id,
      formModel: { ...formModel, user_id: user.id },
    });
    setBalanceLoading(false);
    if (status !== 200) return;
    setBalanceVisible(false);
    message.success(`已更新余额`);
    handleGetList({ page: meta.current });
  };
  const handleRowEditSubmit = async ({ id, ...params }) => {
    await handleEditHook({ action: editCardAcct, id, ...params });
    handleGetList({ page: meta.current });
  };
  const columns = [
    { title: "ID", dataIndex: "id", sorter: true },
    {
      title: "总余额",
      dataIndex: "balance",
      render: val => priceFormat({ val, currency: 0 }),
      sorter: true,
    },
    {
      title: "冻结金额",
      dataIndex: "freezes",
      render: val => priceFormat({ val, currency: 0 }),
      sorter: true,
    },
    {
      title: "当前上分数",
      dataIndex: "points",
      sorter: true,
    },
    {
      title: "信用分",
      dataIndex: "credits",
      sorter: true,
    },

    {
      title: "银行卡ID",
      dataIndex: "card_id",
      sorter: true,
    },

    {
      title: "银行卡名字",
      dataIndex: "card_name",
    },
    {
      title: "创建日期",
      dataIndex: "created",
      render: val => dateFormat(val),
      sorter: true,
    },
    {
      title: "更新日期",
      dataIndex: "updated",
      render: val => dateFormat(val),
      sorter: true,
    },
    {
      title: "动作",
      dataIndex: "action",
      align: "center",
      fixed: "right",
      render: (_, record) => (
        <Space>
          <Button
            size="small"
            onClick={() => handleJsonClick(record.id)}
            type="primary"
          >
            json
          </Button>
          <Button
            size="small"
            onClick={() => handleDetailClick(record.id)}
            type="primary"
          >
            查看
          </Button>
          <Button size="small" onClick={() => handleEditClick(record.id)}>
            编辑
          </Button>
          <Button size="small" onClick={() => handleBalanceClick(record)}>
            更新余额
          </Button>
        </Space>
      ),
    },
  ];
  const defaultColumns = [
    "id",
    "balance",
    "freezes",
    "card_id",
    "card_name",
    "action",
  ];
  return (
    <Space direction="vertical" size="middle" className="w-100">
      <SearchFormFactory fields={searchFields} handleSubmit={handleSearch} />
      <EditableTable
        allColumns={columns}
        defaultColumns={defaultColumns}
        dataSource={list}
        meta={meta}
        loading={listLoading}
        onChangePage={handleChangePage}
        onChange={handleChange}
        onShowSizeChange={handleChangePage}
        onRowEditSubmit={handleRowEditSubmit}
      />
      <JsonModal
        visible={jsonVisible}
        data={currentRow}
        onCancel={() => setJsonVisible(false)}
        loading={detailLoading}
      />
      <Detail
        title="银行卡账户明细"
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
      <EditableConfirm
        title="更新余额"
        fields={fields}
        visible={balanceVisible}
        data={{ ...currentRow, currency: 0 }}
        onCancel={() => setBalanceVisible(false)}
        loading={balanceLoading}
        onOk={handleBalance}
      />
    </Space>
  );
};
export default CardAcct;
