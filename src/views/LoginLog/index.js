import { useState, useEffect, useCallback } from "react";
import { Space, Table } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { selectLoginLog, getLoginLogs } from "@/store/slice/loginLog";
import { SearchFormFactory } from "@/components/factory/FormFactory";

const LoginLog = () => {
  const dispatch = useDispatch();

  const searchFields = {
    id: { type: "string", lang: "ID" },
    name: { type: "string", lang: "username" },
    login_time__btw: { type: "rangeDate", lang: "loginTime" },
  };

  const { list, meta } = useSelector(selectLoginLog);
  const [listLoading, setListLoading] = useState(false);
  const handleGetList = useCallback(
    async (params = {}) => {
      setListLoading(true);
      await dispatch(getLoginLogs(params));
      setListLoading(false);
    },
    [dispatch],
  );
  useEffect(() => {
    handleGetList();
  }, [handleGetList]);
  const handleChangePage = (pagination, filters, sorter, extra) => {
    handleGetList({ page: pagination.current });
  };

  const columns = [
    { title: "id", dataIndex: "id" },
    { title: "username", dataIndex: "username" },
    { title: "userId", dataIndex: "user_id" },
    { title: "IP", dataIndex: "ip" },
    { title: "device", dataIndex: "device" },
    { title: "loginTime", dataIndex: "login_time" },
    { title: "country", dataIndex: "country" },
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
