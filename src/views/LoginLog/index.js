import { useState, useEffect } from "react";
import { Space, Button } from "antd";
import {
  selectLoginLog,
  getLoginLogs,
  getLoginLog,
} from "@/store/slice/loginLog";
import { SearchFormFactory } from "@/components/factory/FormFactory";
import { useList, useDetail } from "@/utils/hook";
import { dateFormat } from "@/utils/format";
import JsonModal from "@/components/JsonModal";
import { NormalTable } from "@/components/factory/TableFactory";

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
    handleSearch,
    handleChangePage,
    handleChange,
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
  useEffect(() => {
    jsonVisible || setDetailId(null);
  }, [jsonVisible]);

  const columns = [
    { title: "ID", dataIndex: "id", sorter: true },
    { title: "帐号", dataIndex: "username", sorter: true },
    { title: "用户ID", dataIndex: "user_id", sorter: true },
    { title: "IP", dataIndex: "ip" },
    { title: "设备", dataIndex: "device" },
    {
      title: "登入时间",
      dataIndex: "login_time",
      className: "text-nowrap",
      render: val => dateFormat(val),
      sorter: true,
    },
    { title: "国家", dataIndex: "country" },
    { title: "省份", dataIndex: "prov" },
    { title: "城市", dataIndex: "city" },
    {
      title: "创建日期",
      dataIndex: "created",
      className: "text-nowrap",
      render: val => dateFormat(val),
      sorter: true,
    },
    {
      title: "更新日期",
      dataIndex: "updated",
      className: "text-nowrap",
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
            type="link"
            className="p-0"
          >
            json
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <Space direction="vertical" size="middle" className="w-100">
      <SearchFormFactory fields={searchFields} handleSubmit={handleSearch} />
      <NormalTable
        allColumns={columns}
        defaultColumns={columns.map(i => i.dataIndex)}
        dataSource={list}
        meta={meta}
        onChangePage={handleChangePage}
        onChange={handleChange}
        loading={listLoading}
        onShowSizeChange={handleChangePage}
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
