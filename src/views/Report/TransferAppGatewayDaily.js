import { Space } from "antd";
import {
  selectTransferAppGatewayDaily,
  getTransferAppGatewayDaily,
  getTransferAppGatewayDailySum,
} from "@/store/slice/transferAppGatewayDaily";
import { SearchFormFactory } from "@/components/factory/FormFactory";
import { useList } from "@/utils/hook";
import { dateFormat, priceFormat } from "@/utils/format";
import { Currency } from "@/utils/enum";
import { NormalTable } from "@/components/factory/TableFactory";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import SumTable from "@/components/SumTable";

const TransferAppGatewayDaily = () => {
  const searchFields = {
    id__in: { type: "string", label: "ID" },
    app_id__in: { type: "string", label: "商户ID" },
    app_name__k: { type: "string", label: "商户名称" },
    created__btw: { type: "rangeDate", label: "报表时间" },
    currency: { type: "select", label: "货币类型", options: Currency },
  };
  const {
    res: { list, meta, sum },
    loading: listLoading,
    handleSearch,
    handleChangePage,
    handleChange,
  } = useList(getTransferAppGatewayDaily, selectTransferAppGatewayDaily);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTransferAppGatewayDailySum());
    // eslint-disable-next-line
  }, []);
  const handleSearchClick = params => {
    handleSearch(params);
    dispatch(getTransferAppGatewayDailySum(params));
  };
  const columns = [
    { title: "ID", dataIndex: "id", sorter: true },
    { title: "商户ID", dataIndex: "app_id", sorter: true },
    { title: "商户名称", dataIndex: "app_name", sorter: true },
    {
      title: "报表时间",
      dataIndex: "created",
      className: "text-nowrap",
      render: val => dateFormat(val),
      sorter: true,
    },
    {
      title: "渠道ID",
      dataIndex: "gateway_id",
      sorter: true,
    },
    {
      title: "渠道名称",
      dataIndex: "gateway_name",
      sorter: true,
    },
    {
      title: "渠道别名",
      dataIndex: "gateway_alias_name",
      sorter: true,
    },
    {
      title: "累计金额",
      dataIndex: "total_amount",
      render: (val, record) => priceFormat({ val, currency: record.currency }),
      className: "text-nowrap",
      sorter: true,
    },
    {
      title: "累计成功金额",
      dataIndex: "total_succeeded_amount",
      render: (val, record) => priceFormat({ val, currency: record.currency }),
      className: "text-nowrap",
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
      className: "text-nowrap",
    },
    {
      title: "累计成功次数",
      dataIndex: "total_succeeded_times",
      sorter: true,
    },
  ];
  const sumColumns = [
    {
      title: "代付次数",
      dataIndex: "total_times",
    },
    {
      title: "代付成功次数",
      dataIndex: "total_succeeded_times",
    },
    {
      title: "代付成功金额",
      dataIndex: "total_succeeded_amount",
      render: val => priceFormat({ val, currency: 0 }),
    },
  ];
  const statisticsColumns = columns.filter(
    i => ["total_times", "total_succeeded_times"].indexOf(i.dataIndex) !== -1,
  );
  return (
    <Space direction="vertical" size="middle" className="w-100">
      <SearchFormFactory
        fields={searchFields}
        handleSubmit={handleSearchClick}
      />
      <SumTable data={sum} labels={sumColumns} />
      <NormalTable
        allColumns={columns}
        defaultColumns={columns.map(i => i.dataIndex)}
        dataSource={list}
        meta={meta}
        onChangePage={handleChangePage}
        onChange={handleChange}
        loading={listLoading}
        onShowSizeChange={handleChangePage}
        statisticsColumns={statisticsColumns}
      />
    </Space>
  );
};
export default TransferAppGatewayDaily;
