import { useState } from "react";
import { Button, Space } from "antd";
import {
  selectCardAcct,
  getCardAccts,
  getCardAcct,
  editCardAcct,
} from "@/store/slice/cardAcct";
import { useList, useDetail } from "@/utils/hook";
import { SearchFormFactory } from "@/components/factory/FormFactory";
import { EditableTable } from "@/components/factory/TableFactory";
import AddEdit from "./AddEdit";
import Detail from "@/components/Detail";
import { Currency, IsBoolEnum } from "@/utils/enum";
import { dateFormat } from "@/utils/format";
import JsonModal from "@/components/JsonModal";

const CardAcct = () => {
  const searchFields = {
    id__in: { type: "string", label: "ID" },
    wallet_id__in: { type: "string", label: "钱包ID" },
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
  const handleRowEditSubmit = async ({ id, ...params }) => {
    await handleEditHook({ action: editCardAcct, id, ...params });
    handleGetList({ page: meta.current });
  };
  const columns = [
    { title: "ID", dataIndex: "id", sorter: true },
    {
      title: "总余额",
      dataIndex: "balance",
      sorter: true,
    },
    {
      title: "冻结金额",
      dataIndex: "freezes",
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
export default CardAcct;
