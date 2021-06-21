import { useState } from "react";
import { Space, Table, Button } from "antd";
import { selectAudit, getAudits, getAudit } from "@/store/slice/audit";
import { SearchFormFactory } from "@/components/factory/FormFactory";
import { useList, useDetail } from "@/utils/hook";
import Tag from "@/components/Tag";
import Detail from "./Detail";

const Audit = () => {
  const searchFields = {
    id__in: { type: "string", label: "ID" },
    username__k: { type: "string", label: "帐号" },
    user_id__in: { type: "string", label: "用户ID" },
    device: { type: "string", label: "设备" },
    client_ip: { type: "string", label: "IP" },
    created__btw: { type: "rangeDate", label: "创建日期" },
  };
  const {
    res: { list, meta },
    loading: listLoading,
    handleGetList,
    handleChangePage,
  } = useList(getAudits, selectAudit);
  const [detailId, setDetailId] = useState(null);
  const { currentRow, loading: detailLoading } = useDetail(
    { action: getAudit, id: detailId },
    selectAudit,
  );
  const [detailVisible, setDetailVisible] = useState(false);
  const handleDetailClick = async id => {
    setDetailId(id);
    setDetailVisible(true);
  };
  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "帐号", dataIndex: "username" },
    { title: "用户ID", dataIndex: "user_id" },
    { title: "设备", dataIndex: "device" },
    { title: "成功", dataIndex: "succeeded", render: val => <Tag val={val} /> },
    {
      title: "动作",
      dataIndex: "action",
      align: "right",
      render: (_, record) => (
        <Button onClick={() => handleDetailClick(record.id)} type="primary">
          查看
        </Button>
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
export default Audit;
