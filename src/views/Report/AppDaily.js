import { Space } from "antd";
import { selectAppDaily, getAppDaily } from "@/store/slice/appDaily";
import { SearchFormFactory } from "@/components/factory/FormFactory";
import { useList } from "@/utils/hook";
import { dateFormat, priceFormat } from "@/utils/format";
import { Currency } from "@/utils/enum";
import { NormalTable } from "@/components/factory/TableFactory";

const AppDaily = () => {
  const searchFields = {
    id__in: { type: "string", label: "ID" },
    app_id__in: { type: "string", label: "商户ID" },
    app_name__k: { type: "string", label: "商户名称" },
    created__btw: { type: "rangeDate", label: "报表时间" },
    currency: { type: "select", label: "货币类型", options: Currency },
  };
  const {
    res: { list, meta },
    loading: listLoading,
    handleSearch,
    handleChangePage,
    handleChange,
  } = useList(getAppDaily, selectAppDaily);

  const columns = [
    { title: "ID", dataIndex: "id", sorter: true },
    { title: "商户ID", dataIndex: "app_id", sorter: true },
    { title: "商户名称", dataIndex: "app_name", sorter: true },
    {
      title: "报表时间",
      dataIndex: "created",
      width: 120,
      render: val => dateFormat(val),
      sorter: true,
    },
    {
      title: "累计金额",
      dataIndex: "total_amount",
      render: (val, record) => priceFormat({ val, currency: record.currency }),
      width: 100,
      sorter: true,
    },
    {
      title: "累计赠金金额",
      dataIndex: "total_bonus",
      render: (val, record) => priceFormat({ val, currency: record.currency }),
      width: 100,
      sorter: true,
    },
    {
      title: "累计成功金额",
      dataIndex: "total_succeeded_amount",
      render: (val, record) => priceFormat({ val, currency: record.currency }),
      width: 100,
      sorter: true,
    },
    {
      title: "累计订单次数",
      dataIndex: "total_times",
      sorter: true,
    },
    {
      title: "货币类型",
      dataIndex: "currency",
      render: val => Currency[val] || "",
      width: 100,
    },
    {
      title: "累计成功次数",
      dataIndex: "total_succeeded_times",
      sorter: true,
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
    </Space>
  );
};
export default AppDaily;
