import { useState } from "react";
import { Button, Space, Table } from "antd";
import { selectAppUser, getAppUsers, getAppUser } from "@/store/slice/appUser";
import { useList, useDetail } from "@/utils/hook";
import { SearchFormFactory } from "@/components/factory/FormFactory";
import Detail from "./Detail";
import { dateFormat } from "@/utils/format";

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

  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "姓名", dataIndex: "name", width: 90 },
    { title: "AppID", dataIndex: "app_id" },
    { title: "App名称", dataIndex: "app_name" },
    { title: "App用户ID", dataIndex: "app_userid" },
    {
      title: "创建日期",
      dataIndex: "created",
      render: val => dateFormat(val),
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
        </Space>
      ),
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
      <Detail
        visible={detailVisible}
        data={currentRow}
        onCancel={() => setDetailVisible(false)}
        loading={detailLoading}
      />
    </Space>
  );
};
export default AppUser;
