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
import { useList, useDetail, useColumnsSelect } from "@/utils/hook";
import { SearchFormFactory } from "@/components/factory/FormFactory";
import EditableTable from "@/components/factory/EditableTableFactory";
import ColumnsSelect from "@/components/ColumnsSelect";
import Tag from "@/components/Tag";
import AddEdit from "./AddEdit";
import Detail from "@/components/Detail";
import { Currency, IsBoolEnum, PayMethod, WXPayType } from "@/utils/enum";
import { priceFormat, dateFormat } from "@/utils/format";
import JsonModal from "@/components/JsonModal";

const GatewayTypes = ({ params }) => {
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
      label: "是否开启h5",
      options: IsBoolEnum,
      isBool: true,
    },
    is_3rd: {
      type: "select",
      label: "是否第三方",
      options: IsBoolEnum,
      isBool: true,
    },
    pc_on: {
      type: "select",
      label: "是否开启pc",
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
  } = useList(getGateways, selectGateway, params);

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

  const handleChangeSwitch = async (checked, { id, ...params }, key) => {
    setListLoading(true);
    await handleEditHook({
      action: editGateway,
      id,
      ...params,
      [key]: checked,
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
      title: "gateway",
      dataIndex: "gateway",
    },
    {
      title: "api",
      dataIndex: "api",
      editable: true,
      inputType: "string",
    },
    {
      title: "appid",
      dataIndex: "appid",
    },
    {
      title: "appsecret",
      dataIndex: "appsecret",
    },
    {
      title: "回调网址",
      dataIndex: "callback_url",
    },
    {
      title: "fee",
      dataIndex: "fee",
      render: (val, record) => priceFormat({ val, currency: record.currency }),
    },
    {
      title: "加密钱包ID",
      dataIndex: "crypto_wallet_id",
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
      title: "付款方式",
      dataIndex: "pay_method",
      render: val => PayMethod[val] || "",
      editable: true,
      inputType: "select",
      options: PayMethod,
    },
    {
      title: "支付类别",
      dataIndex: "pay_type",
      render: val => WXPayType[val] || "",
      editable: true,
      inputType: "select",
      options: WXPayType,
    },
    {
      title: "crypt_type",
      dataIndex: "crypt_type",
    },
    {
      title: "decimals",
      dataIndex: "decimals",
    },
    {
      title: "random_decimals",
      dataIndex: "random_decimals",
    },
    {
      title: "enc_type",
      dataIndex: "enc_type",
    },
    {
      title: "expires",
      dataIndex: "expires",
    },
    {
      title: "extra",
      dataIndex: "extra",
      render: val => JSON.stringify(val),
    },
    {
      title: "评级",
      dataIndex: "rating",
    },
    {
      title: "resp_type",
      dataIndex: "resp_type",
    },
    {
      title: "sign_type",
      dataIndex: "sign_type",
    },
    {
      title: "type",
      dataIndex: "type",
    },
    {
      title: "白名单",
      dataIndex: "whitelist",
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
      title: "是否开启h5",
      dataIndex: "h5_on",
      dRender: val => <Tag val={val} />,
      render: (val, record) => (
        <Switch
          checked={val}
          onChange={checked => handleChangeSwitch(checked, record, "h5_on")}
        />
      ),
    },
    {
      title: "是否第三方",
      dataIndex: "is_3rd",
      dRender: val => <Tag val={val} />,
      render: (val, record) => (
        <Switch
          checked={val}
          onChange={checked => handleChangeSwitch(checked, record, "is_3rd")}
        />
      ),
    },
    {
      title: "是否开启pc",
      dataIndex: "pc_on",
      dRender: val => <Tag val={val} />,
      render: (val, record) => (
        <Switch
          checked={val}
          onChange={checked => handleChangeSwitch(checked, record, "pc_on")}
        />
      ),
    },
    {
      title: "启用",
      dataIndex: "is_active",
      dRender: val => <Tag val={val} />,
      render: (val, record) => (
        <Switch
          checked={val}
          onChange={checked => handleChangeSwitch(checked, record, "is_active")}
        />
      ),
    },
    { title: "创建日期", dataIndex: "created", render: val => dateFormat(val) },
    { title: "更新日期", dataIndex: "updated", render: val => dateFormat(val) },
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
    "name",
    "display_name",
    "alias",
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
      <AddEdit
        visible={addVisible}
        onOk={handleAdd}
        onCancel={() => setAddVisible(false)}
        loading={listLoading}
        mode="add"
      />
      <JsonModal
        width={650}
        visible={jsonVisible}
        data={currentRow}
        onCancel={() => setJsonVisible(false)}
        loading={detailLoading}
      />
      <Detail
        width="700px"
        title="支付网关明细"
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
export default GatewayTypes;
