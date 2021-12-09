import { useState } from "react";
import { Space, Button, Modal } from "antd";
import {
  selectAgentWhitelist,
  getList,
  addIps,
  deleteIp,
} from "@/store/slice/agentWhitelist";
import { SearchFormFactory } from "@/components/factory/FormFactory";
import { useList } from "@/utils/hook";
import { NormalTable } from "@/components/factory/TableFactory";
import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import AddEdit from "./AddEdit";

const AgentWhitelist = () => {
  const searchFields = {
    ip__k: { type: "string", label: "IP" },
  };
  const {
    res: { list },
    loading: listLoading,
    handleSearch,
    handleChangePage,
    handleChange,
    handleAdd: handleAddHook,
    handleDelete: handleDeleteHook,
  } = useList(getList, selectAgentWhitelist);
  const [addVisible, setAddVisible] = useState(false);
  const handleAddClick = () => {
    setAddVisible(true);
  };
  const handleAdd = async formModel => {
    handleAddHook({ action: addIps, ...formModel });
    setAddVisible(false);
  };

  const handleDeleteClick = record => {
    Modal.confirm({
      title: "是否刪除",
      icon: <ExclamationCircleOutlined />,
      content: `即将刪除 ${record.ip}，是否继续？`,
      okText: "确认",
      cancelText: "取消",
      onOk: close => handleDelete(close, record),
    });
  };
  const handleDelete = async (close, record) => {
    handleDeleteHook({ action: deleteIp, ...record });
    close();
    handleSearch();
  };

  const columns = [
    { title: "IP", dataIndex: "ip" },
    {
      title: "动作",
      dataIndex: "action",
      align: "center",
      fixed: "right",
      render: (_, record) => (
        <Space>
          <Button
            size="small"
            onClick={() => handleDeleteClick(record)}
            type="link"
            danger
            className="p-0"
          >
            刪除
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <Space direction="vertical" size="middle" className="w-100">
      <SearchFormFactory fields={searchFields} handleSubmit={handleSearch} />
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAddClick}>
        添加
      </Button>
      <NormalTable
        allColumns={columns}
        defaultColumns={columns.map(i => i.dataIndex)}
        dataSource={list}
        onChangePage={handleChangePage}
        onChange={handleChange}
        loading={listLoading}
        onShowSizeChange={handleChangePage}
        rowKey="ip"
      />
      <AddEdit
        visible={addVisible}
        onOk={handleAdd}
        onCancel={() => setAddVisible(false)}
        loading={listLoading}
        mode="add"
      />
    </Space>
  );
};
export default AgentWhitelist;
