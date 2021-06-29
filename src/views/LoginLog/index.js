import { useState } from "react";
import { Space, Table, Button } from "antd";
import {
  selectLoginLog,
  getLoginLogs,
  getLoginLog,
} from "@/store/slice/loginLog";
import { SearchFormFactory } from "@/components/factory/FormFactory";
import { useList, useDetail } from "@/utils/hook";
import { dateFormat } from "@/utils/format";
import JsonModal from "@/components/JsonModal";

const LoginLog = () => {
  const searchFields = {
    id__in: { type: "string", label: "ID" },
    name__k: { type: "string", label: "帐号" },
    user_id__in: { type: "string", label: "用户ID" },
    device: { type: "string", label: "设备" },
    ip: { type: "string", label: "IP" },
    login_time__btw: { type: "rangeDate", label: "登入时间" },
  };
  const {
    res: { list, meta },
    loading: listLoading,
    handleGetList,
    handleChangePage,
  } = useList(getLoginLogs, selectLoginLog);

  const [detailId, setDetailId] = useState(null);
  const { currentRow, loading: detailLoading } = useDetail(
    { action: getLoginLog, id: detailId },
    selectLoginLog,
  );

  const [jsonVisible, setJsonVisible] = useState(false);
  const handleJsonClick = async id => {
    setDetailId(id);
    setJsonVisible(true);
  };

  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "帐号", dataIndex: "username" },
    { title: "用户ID", dataIndex: "user_id" },
    { title: "IP", dataIndex: "ip" },
    { title: "设备", dataIndex: "device" },
    {
      title: "登入时间",
      dataIndex: "login_time",
      width: 120,
      render: val => dateFormat(val),
    },
    { title: "country", dataIndex: "country" },
    {
      title: "创建日期",
      dataIndex: "created",
      width: 120,
      render: val => dateFormat(val),
    },
    {
      title: "更新日期",
      dataIndex: "updated",
      width: 120,
      render: val => dateFormat(val),
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
        </Space>
      ),
    },
  ];
  return (
    <Space direction="vertical" size="middle" className="w-100">
      <SearchFormFactory fields={searchFields} handleSubmit={handleGetList} />
      <Table
        size="small"
        columns={columns}
        dataSource={list}
        pagination={meta}
        rowKey="id"
        scroll={{ x: "auto" }}
        onChange={handleChangePage}
        loading={listLoading}
      />
      <JsonModal
        visible={jsonVisible}
        data={currentRow}
        onCancel={() => setJsonVisible(false)}
        loading={detailLoading}
      />
    </Space>
  );
};
export default LoginLog;
