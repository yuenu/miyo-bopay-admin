import { Space } from "antd";
import {
  selectAgentDaily,
  getAgentDaily,
  getAgentDailySum,
} from "@/store/slice/agentDaily";
import { SearchFormFactory } from "@/components/factory/FormFactory";
import { useList } from "@/utils/hook";
import { dateFormat, priceFormat } from "@/utils/format";
import { Currency, IsBoolEnum } from "@/utils/enum";
import { NormalTable } from "@/components/factory/TableFactory";
import Tag from "@/components/Tag";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import SumTable from "@/components/SumTable";
const AgentDaily = () => {
  const searchFields = {
    id__in: { type: "string", label: "ID" },
    agent_id__in: { type: "string", label: "用户ID" },
    agent_name__k: { type: "string", label: "代理名称" },
    created__btw: { type: "rangeDate", label: "报表时间" },
    currency: { type: "select", label: "货币类型", options: Currency },
    is_online: {
      type: "select",
      label: "是否线上渠道",
      options: IsBoolEnum,
    },
  };
  const {
    res: { list, meta, sum },
    loading: listLoading,
    handleSearch,
    handleChangePage,
    handleChange,
  } = useList(getAgentDaily, selectAgentDaily);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAgentDailySum());
    // eslint-disable-next-line
  }, []);
  const handleSearchClick = params => {
    handleSearch(params);
    dispatch(getAgentDailySum(params));
  };
  const columns = [
    { title: "ID", dataIndex: "id", sorter: true },
    { title: "用户ID", dataIndex: "agent_id", sorter: true },
    { title: "代理名称", dataIndex: "agent_name", sorter: true },
    {
      title: "报表时间",
      dataIndex: "created",
      className: "text-nowrap",
      render: val => dateFormat(val),
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
      title: "累计赠金金额",
      dataIndex: "total_bonus",
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
    {
      title: "是否线上渠道",
      dataIndex: "is_online",
      render: val => <Tag val={val} />,
      sorter: true,
    },
  ];

  const sumColumns = [
    {
      title: "订单次数",
      dataIndex: "total_times",
    },
    {
      title: "订单成功次数",
      dataIndex: "total_succeeded_times",
    },
    {
      title: "订单成功金额",
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
export default AgentDaily;
