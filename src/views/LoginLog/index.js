import { Space, Table } from "antd";
import { selectLoginLog, getLoginLogs } from "@/store/slice/loginLog";
import { SearchFormFactory } from "@/components/factory/FormFactory";
import { useList } from "@/utils/hook";
import { dateFormat } from "@/utils/format";

const LoginLog = () => {
  const searchFields = {
    id: { type: "string", label: "ID" },
    name: { type: "string", label: "帐号" },
    login_time__btw: { type: "rangeDate", label: "登入时间" },
  };
  const {
    res: { list, meta },
    loading: listLoading,
    handleGetList,
    handleChangePage,
  } = useList(getLoginLogs, selectLoginLog);

  const columns = [
    { title: "id", dataIndex: "id" },
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
  ];
  return (
    <Space direction="vertical" size="middle" className="w-100">
      <SearchFormFactory fields={searchFields} handleSubmit={handleGetList} />
      <Table
        columns={columns}
        dataSource={list}
        pagination={meta}
        rowKey="id"
        scroll={{ x: "auto" }}
        onChange={handleChangePage}
        loading={listLoading}
      />
    </Space>
  );
};
export default LoginLog;
