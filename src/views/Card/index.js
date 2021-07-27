import { useState } from "react";
import { Button, Space, Switch } from "antd";
import {
  selectCard,
  getCards,
  getCard,
  addCard,
  editCard,
} from "@/store/slice/card";
import { PlusOutlined } from "@ant-design/icons";
import { useList, useDetail } from "@/utils/hook";
import { SearchFormFactory } from "@/components/factory/FormFactory";
import { EditableTable } from "@/components/factory/TableFactory";
import Tag from "@/components/Tag";
import AddEdit from "./AddEdit";
import Detail from "@/components/Detail";
import { IsBoolEnum, CardStatus } from "@/utils/enum";
import { dateFormat, priceFormat } from "@/utils/format";
import JsonModal from "@/components/JsonModal";

const Card = () => {
  const searchFields = {
    id__in: { type: "string", label: "ID" },
    alias__k: { type: "string", label: "账户名" },
    name__k: { type: "string", label: "名称" },
    status: {
      type: "select",
      label: "状态",
      options: CardStatus,
    },
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
    handleAdd: handleAddHook,
    setLoading: setListLoading,
  } = useList(getCards, selectCard);

  const [addVisible, setAddVisible] = useState(false);
  const handleAddClick = () => {
    setAddVisible(true);
  };
  const handleAdd = async formModel => {
    handleAddHook({ action: addCard, ...formModel });
    setAddVisible(false);
  };

  const [detailId, setDetailId] = useState(null);
  const {
    currentRow,
    loading: detailLoading,
    handleEdit: handleEditHook,
  } = useDetail({ action: getCard, id: detailId }, selectCard);
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
      action: editCard,
      id: currentRow.id,
      ...formModel,
    });
    if (status !== 200) return;
    setEditVisible(false);
    setDetailId(null);
    handleGetList({ page: meta.current });
  };
  const handleRowEditSubmit = async ({ id, ...params }) => {
    await handleEditHook({ action: editCard, id, ...params });
    handleGetList({ page: meta.current });
  };

  const handleChangeIsActive = async (checked, { id, ...params }) => {
    setListLoading(true);
    await handleEditHook({
      action: editCard,
      id,
      ...params,
      is_active: checked,
    });
    handleGetList({ page: meta.current });
  };

  const columns = [
    { title: "ID", dataIndex: "id", sorter: true },
    {
      title: "别名",
      dataIndex: "alias",
      editable: true,
      inputType: "string",
      sorter: true,
    },
    {
      title: "账户名",
      dataIndex: "name",
      editable: true,
      inputType: "string",
      sorter: true,
    },
    {
      title: "银行账号",
      dataIndex: "account",
      editable: true,
      inputType: "string",
      sorter: true,
    },
    {
      title: "开户行中文名",
      dataIndex: "bank_name",
    },
    {
      title: "开户行代码",
      dataIndex: "bank_code",
      sorter: true,
    },
    {
      title: "支行名称",
      dataIndex: "sub_bank",
    },
    {
      title: "省",
      dataIndex: "prov",
    },
    {
      title: "市",
      dataIndex: "city",
    },
    {
      title: "手机号",
      dataIndex: "phone",
    },
    {
      title: "身份证",
      dataIndex: "idcard",
    },
    {
      title: "单笔转账上限",
      dataIndex: "per_trans_limit",
      sorter: true,
    },
    {
      title: "每日转账上限",
      dataIndex: "per_day_limit",
      sorter: true,
    },
    {
      title: "当日累计转账金额",
      dataIndex: "cur_day_trans",
      render: val => priceFormat({ val, currency: 0 }),
      sorter: true,
    },
    {
      title: "是否开启转账限额",
      dataIndex: "has_limit",
      render: val => <Tag val={val} />,
    },
    {
      title: "rating",
      dataIndex: "rating",
    },
    {
      title: "状态",
      dataIndex: "status",
      render: val => CardStatus[val] || "",
    },
    {
      title: "支持入款",
      dataIndex: "deposit_on",
      render: val => <Tag val={val} />,
    },
    {
      title: "支持出款",
      dataIndex: "withdraw_on",
      render: val => <Tag val={val} />,
    },
    {
      title: "用户ID(代理)",
      dataIndex: "agent_id",
      sorter: true,
    },
    {
      title: "代理名称",
      dataIndex: "agent_name",
      sorter: true,
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
    { title: "备注", dataIndex: "note" },
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
    "alias",
    "name",
    "status",
    "bank_name",
    "is_active",
    "action",
  ];
  return (
    <Space direction="vertical" size="middle" className="w-100">
      <SearchFormFactory fields={searchFields} handleSubmit={handleSearch} />
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAddClick}>
        添加
      </Button>
      <EditableTable
        allColumns={columns}
        defaultColumns={defaultColumns}
        dataSource={list}
        loading={listLoading}
        onChangePage={handleChangePage}
        onChange={handleChange}
        onRowEditSubmit={handleRowEditSubmit}
        onShowSizeChange={handleChangePage}
        meta={meta}
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
        title="银行卡明细"
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
export default Card;
