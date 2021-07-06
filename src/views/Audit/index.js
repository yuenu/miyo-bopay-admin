import { useState } from "react";
import { Space, Button } from "antd";
import { selectAudit, getAudits, getAudit } from "@/store/slice/audit";
import { useList, useDetail } from "@/utils/hook";
import { SearchFormFactory } from "@/components/factory/FormFactory";
import Tag from "@/components/Tag";
import Detail from "@/components/Detail";
import { dateFormat } from "@/utils/format";
import JsonModal from "@/components/JsonModal";
import { NormalTable } from "@/components/factory/TableFactory";

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
    handleSearch,
    handleChangePage,
    handleChange,
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

  const [jsonVisible, setJsonVisible] = useState(false);
  const handleJsonClick = async id => {
    setDetailId(id);
    setJsonVisible(true);
  };
  const columns = [
    { title: "ID", dataIndex: "id", sorter: true },
    { title: "帐号", dataIndex: "username", sorter: true },
    { title: "用户ID", dataIndex: "user_id", sorter: true },
    { title: "设备", dataIndex: "device" },
    { title: "IP", dataIndex: "client_ip" },
    { title: "Brief", dataIndex: "brief" },
    { title: "Method", dataIndex: "method" },
    { title: "Verb", dataIndex: "verb" },
    { title: "Err", dataIndex: "err" },
    {
      title: "成功",
      dataIndex: "succeeded",
      render: val => <Tag val={val} />,
    },
    {
      title: "创建日期",
      dataIndex: "created",
      render: val => dateFormat(val),
      sorter: true,
    },
    {
      title: "更新日期",
      dataIndex: "updated",
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
  const defaultColumns = ["id", "username", "user_id", "succeeded", "action"];
  return (
    <Space direction="vertical" size="middle" className="w-100">
      <SearchFormFactory fields={searchFields} handleSubmit={handleSearch} />
      <NormalTable
        allColumns={columns}
        defaultColumns={defaultColumns}
        dataSource={list}
        meta={meta}
        onChangePage={handleChangePage}
        onChange={handleChange}
        loading={listLoading}
        onShowSizeChange={handleChangePage}
      />
      <JsonModal
        width={650}
        visible={jsonVisible}
        data={currentRow}
        onCancel={() => setJsonVisible(false)}
        loading={detailLoading}
      />
      <Detail
        title="审计日志明细"
        visible={detailVisible}
        data={currentRow}
        onCancel={() => setDetailVisible(false)}
        loading={detailLoading}
        columns={columns.filter(i => i.dataIndex !== "action")}
      />
    </Space>
  );
};
export default Audit;
