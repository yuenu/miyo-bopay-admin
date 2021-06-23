import { useState } from "react";
import { Button, Space, Switch } from "antd";
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
import EditableTable from "@/components/factory/EditableTableFactory";
import AddEdit from "./AddEdit";
import Detail from "./Detail";
import { Currency, IsBoolEnum, PayMethod, WXPayType } from "@/utils/enum";
const GatewayTypes = ({ type }) => {
  const searchFields = {
    id__in: { type: "string", label: "ID" },
    crypto_wallet_id__in: { type: "string", label: "加密钱包ID" },
    name__k: { type: "string", label: "名称" },
    alias__k: { type: "string", label: "别名" },
    display_name__k: { type: "string", label: "显示名称" },
    currency: { type: "select", label: "货币类型", options: Currency },
    pay_method: { type: "select", label: "付款方式", options: PayMethod },
    pay_type: { type: "select", label: "支付类别", options: WXPayType },
    gateway__k: { type: "string", label: "gateway" },
    is_active: {
      type: "select",
      label: "是否启用",
      options: IsBoolEnum,
      isBool: true,
    },
    h5_on: {
      type: "select",
      label: "h5_on",
      options: IsBoolEnum,
      isBool: true,
    },
    is_3rd: {
      type: "select",
      label: "is_3rd",
      options: IsBoolEnum,
      isBool: true,
    },
    pc_on: {
      type: "select",
      label: "pc_on",
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
  } = useList(getGateways, selectGateway, { type });

  const [addVisible, setAddVisible] = useState(false);
  const handleAddClick = () => {
    setAddVisible(true);
  };
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
    handleGetList({ page: meta.current });
  };
  const handleRowEditSubmit = async ({ id, ...params }) => {
    await handleEditHook({ action: editGateway, id, ...params });
    handleGetList({ page: meta.current });
  };
  const handleChangeIsActive = async (checked, { id, ...params }) => {
    setListLoading(true);
    await handleEditHook({
      action: editGateway,
      id,
      ...params,
      is_active: checked,
    });
    handleGetList({ page: meta.current });
  };
  const columns = [
    { title: "ID", dataIndex: "id" },
    {
      title: "名称",
      dataIndex: "name",
      editable: true,
      inputType: "string",
    },
    {
      title: "显示名称",
      dataIndex: "display_name",
      editable: true,
      inputType: "string",
    },
    {
      title: "别名",
      dataIndex: "alias",
      editable: true,
      inputType: "string",
    },
    {
      title: "货币类型",
      dataIndex: "currency",
      render: val => Currency[val] || "",
      editable: true,
      inputType: "select",
      options: Currency,
    },
    {
      title: "启用",
      dataIndex: "is_active",
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
  return (
    <Space direction="vertical" size="middle" className="w-100">
      <SearchFormFactory fields={searchFields} handleSubmit={handleGetList} />
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAddClick}>
        添加
      </Button>
      <EditableTable
        columns={columns}
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
export default GatewayTypes;
