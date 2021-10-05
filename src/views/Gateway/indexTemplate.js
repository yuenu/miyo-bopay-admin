import { useState, useEffect } from "react";
import { Button, Space, Switch, Tag as AntTag, message } from "antd";
import {
  selectGateway,
  getGateways,
  getGateway,
  getGatewayCode,
  addGateway,
  editGateway,
  editGatewayCode,
} from "@/store/slice/gateway";
import { PlusOutlined } from "@ant-design/icons";
import { useList, useDetail } from "@/utils/hook";
import { SearchFormFactory } from "@/components/factory/FormFactory";
import { EditableTable } from "@/components/factory/TableFactory";
import Tag from "@/components/Tag";
import AddEdit from "./AddEdit";
import Detail from "@/components/Detail";
import CodeEditor from "@/components/CodeEditor";
import {
  Currency,
  IsBoolEnum,
  PayMethod,
  WXPayType,
  AmountType,
} from "@/utils/enum";
import { priceFormat, dateFormat } from "@/utils/format";
import JsonModal from "@/components/JsonModal";
import { useHistory, generatePath } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const SwitchRender = (val, record, onChange) => {
  const { meta } = useSelector(selectGateway);
  return (
    <Switch
      checked={val}
      onChange={checked => onChange(checked, record, "is_active", meta)}
    />
  );
};
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
    is_3rd: {
      type: "select",
      label: "是否第三方",
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
  useEffect(() => {
    jsonVisible || setDetailId(null);
  }, [jsonVisible]);

  const [editVisible, setEditVisible] = useState(false);
  const handleEditClick = async id => {
    setDetailId(id);
    setEditVisible(true);
  };
  const handleEdit = async formModel => {
    const { status } = await handleEditHook({
      action: editGateway,
      id: currentRow.id,
      ...formModel,
    });
    if (status !== 200) return;
    setEditVisible(false);
    handleGetList({ page: meta.current });
    setDetailId(null);
  };
  const handleRowEditSubmit = async ({ id, ...params }) => {
    await handleEditHook({ action: editGateway, id, ...params });
    handleGetList({ page: meta.current });
  };

  const dispatch = useDispatch();
  const { codeInfo } = useSelector(selectGateway);
  const [codeId, setCodeId] = useState();
  const [code, setCode] = useState("");
  const [codeVisible, setCodeVisible] = useState(false);
  const [codeLoading, setCodeLoading] = useState(false);
  const handleEditCodeClick = async id => {
    setCodeId(id);
    const { payload } = await dispatch(getGatewayCode(id));
    if (!payload.data.data) return;
    setCode(payload.data.data.source);
    setCodeVisible(true);
  };
  const handleEditCodeOk = async () => {
    setCodeLoading(true);
    const { status } = await editGatewayCode({
      id: codeId,
      formModel: { ...codeInfo, source: code },
    });
    setCodeLoading(false);
    setCodeVisible(false);
    status === 200 && message.success("更新成功！");
  };

  const handleChangeSwitch = async (checked, { id, ...params }, key, mt) => {
    setListLoading(true);
    await handleEditHook({
      action: editGateway,
      id,
      ...params,
      [key]: checked,
    });
    handleGetList({ page: mt.current });
  };

  const history = useHistory();
  const handleToModuleDetail = ({ id, route }) => {
    history.push(generatePath(`/${route}/:id`, { id }));
  };

  const columns = () => [
    { title: "ID", dataIndex: "id", sorter: true },
    {
      title: "名称",
      dataIndex: "name",
      editable: true,
      inputType: "string",
      sorter: true,
    },
    {
      title: "显示名称",
      dataIndex: "display_name",
      editable: true,
      inputType: "string",
      sorter: true,
    },
    {
      title: "别名",
      dataIndex: "alias",
      editable: true,
      inputType: "string",
      sorter: true,
    },
    {
      title: "Apps",
      dataIndex: "apps",
      render: val => val?.map(i => <AntTag key={i}>{i}</AntTag>),
    },
    {
      title: "gateway",
      dataIndex: "gateway",
      sorter: true,
    },
    {
      title: "账户名称",
      dataIndex: "acct_name",
      sorter: true,
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
      title: "通道费率",
      dataIndex: "fee",
      render: val => `${val}%`,
      sorter: true,
    },
    {
      title: "金额类型",
      dataIndex: "amount_type",
      render: val => AmountType[val] || "",
      sorter: true,
    },
    {
      title: "最小金额",
      dataIndex: "amount_min",
      sorter: true,
    },
    {
      title: "最大金额",
      dataIndex: "amount_max",
      sorter: true,
    },
    {
      title: "固定金额列表",
      dataIndex: "amount_fixed",
      render: val => JSON.stringify(val),
    },
    {
      title: "补充付款信息",
      dataIndex: "payer_cred",
      render: val => JSON.stringify(val),
    },
    {
      title: "加密钱包ID",
      dataIndex: "crypto_wallet_id",
      render: val => (
        <Button
          type="link"
          onClick={() =>
            handleToModuleDetail({ id: val, route: "CryptoWalletEdit" })
          }
        >
          {val}
        </Button>
      ),
      sorter: true,
    },
    {
      title: "银行卡ID",
      dataIndex: "card_id",
      sorter: true,
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
      title: "decimals",
      dataIndex: "decimals",
      render: val => Number(val).toFixed(2),
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
      title: "设备类型",
      dataIndex: "devices",
      render: val => val?.map(i => <AntTag key={i}>{i}</AntTag>),
    },
    {
      title: "网关代码配置",
      dataIndex: "spec",
      render: val => JSON.stringify(val),
    },
    {
      title: "代码内容",
      dataIndex: "code",
    },
    {
      title: "评级",
      dataIndex: "rating",
      sorter: true,
    },
    {
      title: "type",
      dataIndex: "type",
    },
    {
      title: "白名单",
      dataIndex: "whitelist",
      render: val => val?.map(i => <AntTag key={i}>{i}</AntTag>),
    },
    {
      title: "备注",
      dataIndex: "note",
      editable: true,
      inputType: "string",
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
      title: "启用",
      dataIndex: "is_active",
      dRender: val => <Tag val={val} />,
      render: (val, record) => SwitchRender(val, record, handleChangeSwitch),
    },
    {
      title: "创建日期",
      dataIndex: "created",
      render: val => dateFormat(val),
      className: "text-nowrap",
      sorter: true,
    },
    {
      title: "更新日期",
      dataIndex: "updated",
      render: val => dateFormat(val),
      className: "text-nowrap",
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
            type="link"
            className="p-0"
          >
            json
          </Button>
          <Button
            size="small"
            onClick={() => handleDetailClick(record.id)}
            type="link"
            className="p-0"
          >
            查看
          </Button>
          <Button
            size="small"
            onClick={() => handleEditClick(record.id)}
            type="text"
            className="p-0"
          >
            编辑
          </Button>
          <Button
            size="small"
            onClick={() => handleEditCodeClick(record.id)}
            type="text"
            className="p-0"
          >
            编辑代码
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
  return (
    <Space direction="vertical" size="middle" className="w-100">
      <SearchFormFactory fields={searchFields} handleSubmit={handleSearch} />
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAddClick}>
        添加
      </Button>
      <EditableTable
        allColumns={columns()}
        defaultColumns={defaultColumns}
        dataSource={list}
        meta={meta}
        loading={listLoading}
        onChangePage={handleChangePage}
        onChange={handleChange}
        onRowEditSubmit={handleRowEditSubmit}
        onShowSizeChange={handleChangePage}
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
        columns={columns().filter(i => i.dataIndex !== "action")}
      />
      <AddEdit
        visible={editVisible}
        onOk={handleEdit}
        onCancel={() => setEditVisible(false)}
        loading={detailLoading}
        data={currentRow}
        mode="edit"
      />
      <CodeEditor
        visible={codeVisible}
        code={code}
        loading={codeLoading}
        onOk={handleEditCodeOk}
        onChange={setCode}
        onCancel={() => setCodeVisible(false)}
      />
    </Space>
  );
};
export default GatewayTypes;
