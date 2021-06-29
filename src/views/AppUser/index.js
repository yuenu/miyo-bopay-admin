import { useState } from "react";
import { Button, Space, Table } from "antd";
import { selectAppUser, getAppUsers, getAppUser } from "@/store/slice/appUser";
import { useList, useDetail, useColumnsSelect } from "@/utils/hook";
import { SearchFormFactory } from "@/components/factory/FormFactory";
import ColumnsSelect from "@/components/ColumnsSelect";
import Detail from "@/components/Detail";
import { dateFormat } from "@/utils/format";
import JsonModal from "@/components/JsonModal";

const AppUser = () => {
  const searchFields = {
    id__in: { type: "string", label: "ID" },
    userid__in: { type: "string", label: "会员ID" },
    app_id__in: { type: "string", label: "App ID" },
    name__k: { type: "string", label: "姓名" },
    app_name__k: { type: "string", label: "App名称" },
    app_userid__in: { type: "string", label: "App用户ID" },
    developer_id__in: { type: "string", label: "开发者ID" },
    developer_name__k: { type: "string", label: "开发者姓名" },
    created__btw: { type: "rangeDate", label: "创建日期" },
  };
  const {
    res: { list, meta },
    loading: listLoading,
    handleGetList,
    handleChangePage,
  } = useList(getAppUsers, selectAppUser);

  const [detailId, setDetailId] = useState(null);
  const { currentRow, loading: detailLoading } = useDetail(
    { action: getAppUser, id: detailId },
    selectAppUser,
  );
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
  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "会员ID", dataIndex: "userid" },
    { title: "姓名", dataIndex: "name", width: 90 },
    { title: "电话", dataIndex: "phone" },
    { title: "AppID", dataIndex: "app_id" },
    { title: "App名称", dataIndex: "app_name" },
    { title: "App用户ID", dataIndex: "app_userid" },
    { title: "开发者ID", dataIndex: "developer_id" },
    { title: "开发者姓名", dataIndex: "developer_name" },
    { title: "评级", dataIndex: "rating" },
    { title: "注册IP", dataIndex: "register_ip" },
    { title: "等级", dataIndex: "vip" },
    {
      title: "创建日期",
      dataIndex: "created",
      render: val => dateFormat(val),
    },
    {
      title: "更新日期",
      dataIndex: "updated",
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
          <Button
            size="small"
            onClick={() => handleDetailClick(record.id)}
            type="primary"
          >
            查看
          </Button>
        </Space>
      ),
    },
  ];
  const defaultColumns = [
    "id",
    "name",
    "app_id",
    "app_name",
    "app_userid",
    "created",
    "action",
  ];
  const { selectedColumns, setSelectedColumns } = useColumnsSelect({
    columns,
    defaultColumns,
  });
  return (
    <Space direction="vertical" size="middle" className="w-100">
      <SearchFormFactory fields={searchFields} handleSubmit={handleGetList} />
      <ColumnsSelect
        columns={columns}
        value={selectedColumns}
        onChange={setSelectedColumns}
      />
      <Table
        size="small"
        columns={selectedColumns}
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
      <Detail
        title="App用戶明細"
        visible={detailVisible}
        data={currentRow}
        onCancel={() => setDetailVisible(false)}
        loading={detailLoading}
        columns={columns.filter(i => i.dataIndex !== "action")}
      />
    </Space>
  );
};
export default AppUser;
