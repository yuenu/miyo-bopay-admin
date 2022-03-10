import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Space, Switch } from "antd";
import {
  selectAgent,
  getAgents,
  getAgent,
  addAgent,
  editAgent,
  getConfigAgent,
  selectUpperLayerAgentList,
  getUpperLayerAgentList,
} from "@/store/slice/agent";
import { PlusOutlined } from "@ant-design/icons";
import { useList, useDetail } from "@/utils/hook";
import { SearchFormFactory } from "@/components/factory/FormFactory";
import { EditableTable } from "@/components/factory/TableFactory";
import NormalTableModal from "@/components/NormalTableModal";
import Tag from "@/components/Tag";
import AddEdit from "./AddEdit";
import Detail from "@/components/Detail";
import { IsBoolEnum } from "@/utils/enum";
import { dateFormat } from "@/utils/format";
import JsonModal from "@/components/JsonModal";

const UpperLayerAgentListModal = (props) => {
  const defaultColumns = [
    "id",
    "user_id",
    "username",
    "name",
    "is_active",
    "action",
  ];
  const columns = [
    { title: "ID", dataIndex: "id", sorter: true },
    {
      title: "用户ID",
      dataIndex: "user_id",
      sorter: true,
    },
    {
      title: "用户名",
      dataIndex: "username",
      sorter: true,
    },
    {
      title: "姓名",
      dataIndex: "name",
      editable: true,
      inputType: "string",
      sorter: true,
    },
    {
      title: "代收费率",
      dataIndex: "recharge_rate",
      inputType: "string",
      sorter: true,
    },
    {
      title: "代付费率",
      dataIndex: "withdraw_rate",
      inputType: "string",
      sorter: true,
    },
    {
      title: "创建日期",
      dataIndex: "created",
      render: val => dateFormat(val),
      sorter: true,
      className: "text-nowrap",
    },
    {
      title: "更新日期",
      dataIndex: "updated",
      render: val => dateFormat(val),
      sorter: true,
      className: "text-nowrap",
    },
    { title: "备注", dataIndex: "note" },
  ];
  return (<NormalTableModal
    title="上级代理"
    width={1200}
    columns={columns}
    defaultColumns={defaultColumns}
    asyncThunk={getUpperLayerAgentList}
    selector={selectUpperLayerAgentList}
    {...props}
  />)
}

const Agent = () => {
  const searchFields = {
    id__in: { type: "string", label: "ID" },
    user_id__in: { type: "string", label: "用户ID" },
    username__k: { type: "string", label: "用户名" },
    name__k: { type: "string", label: "姓名" },
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
  } = useList(getAgents, selectAgent);

  const dispatch = useDispatch();
  const { configAgentData } = useSelector(selectAgent);
  const [addVisible, setAddVisible] = useState(false);
  const handleAddClick = async () => {
    await dispatch(getConfigAgent());
    setAddVisible(true);
  };
  const handleAdd = async formModel => {
    handleAddHook({ action: addAgent, ...formModel });
    setAddVisible(false);
  };

  const [upperLayerId, setUpperLayerId] = useState(null);
  const [upperLayerAgentListVisible, setUpperLayerAgentListVisible] = useState(false)
  const handleUpperLayerAgentListClick = async id => {
    setUpperLayerId(id);
    setUpperLayerAgentListVisible(true);
  };

  const [detailId, setDetailId] = useState(null);
  const {
    currentRow,
    loading: detailLoading,
    handleEdit: handleEditHook,
  } = useDetail({ action: getAgent, id: detailId }, selectAgent);
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
      action: editAgent,
      id: currentRow.id,
      ...formModel,
    });
    if (status !== 200) return;
    setEditVisible(false);
    setDetailId(null);
    handleGetList({ page: meta.current });
  };
  const handleRowEditSubmit = async ({ id, ...params }) => {
    await handleEditHook({ action: editAgent, id, ...params });
    handleGetList({ page: meta.current });
  };

  const handleChangeIsActive = async (checked, { id, ...params }) => {
    setListLoading(true);
    await handleEditHook({
      action: editAgent,
      id,
      ...params,
      is_active: checked,
    });
    handleGetList({ page: meta.current });
  };

  const columns = [
    { title: "ID", dataIndex: "id", sorter: true },
    {
      title: "用户ID",
      dataIndex: "user_id",
      sorter: true,
    },
    {
      title: "用户名",
      dataIndex: "username",
      sorter: true,
    },
    {
      title: "姓名",
      dataIndex: "name",
      editable: true,
      inputType: "string",
      sorter: true,
    },
    {
      title: "代收费率",
      dataIndex: "recharge_rate",
      inputType: "string",
      sorter: true,
    },
    {
      title: "代付费率",
      dataIndex: "withdraw_rate",
      inputType: "string",
      sorter: true,
    },
    {
      title: "创建日期",
      dataIndex: "created",
      render: val => dateFormat(val),
      sorter: true,
      className: "text-nowrap",
    },
    {
      title: "更新日期",
      dataIndex: "updated",
      render: val => dateFormat(val),
      sorter: true,
      className: "text-nowrap",
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
      title: "查看上级代理",
      dataIndex: "action-look-up-upper-layer-list",
      align: "center",
      fixed: "right",
      render: (_, record) => (
        <Space>
          <Button
            size="small"
            onClick={() => handleUpperLayerAgentListClick(record.id)}
            type="link"
            className="p-0"
          >
            查看
          </Button>
        </Space>
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
            type="text"
            className="p-0"
            onClick={() => handleEditClick(record.id)}
          >
            编辑
          </Button>
        </Space>
      ),
    },
  ];
  const defaultColumns = [
    "id",
    "user_id",
    "username",
    "name",
    "action-look-up-upper-layer-list",
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
        initData={{ upper_layer_id: configAgentData.user_id }}
        mode="add"
      /> 
      <UpperLayerAgentListModal
        visible={upperLayerAgentListVisible}
        onCancel={() => setUpperLayerAgentListVisible(false)}
        params={{ id: upperLayerId }}
      />
      <JsonModal
        visible={jsonVisible}
        data={currentRow}
        onCancel={() => setJsonVisible(false)}
        loading={detailLoading}
      />
      <Detail
        title="App明细"
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
export default Agent;
