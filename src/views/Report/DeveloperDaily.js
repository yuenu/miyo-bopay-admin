import { Space } from "antd";
import {
  selectDeveloperDaily,
  getDeveloperDaily,
  getDeveloperDailySum,
} from "@/store/slice/developerDaily";
import { SearchFormFactory } from "@/components/factory/FormFactory";
import { useList } from "@/utils/hook";
import { dateFormat, priceFormat } from "@/utils/format";
import { Currency, IsBoolEnum } from "@/utils/enum";
import { NormalTable } from "@/components/factory/TableFactory";
import Tag from "@/components/Tag";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import SumTable from "@/components/SumTable";

const DeveloperDaily = () => {
  const searchFields = {
    id__in: { type: "string", label: "ID" },
    developer_id__in: { type: "string", label: "用户ID" },
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
  } = useList(getDeveloperDaily, selectDeveloperDaily);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDeveloperDailySum());
    // eslint-disable-next-line
  }, []);
  const columns = [
    { title: "ID", dataIndex: "id", sorter: true },
    { title: "用户ID", dataIndex: "developer_id", sorter: true },
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
  return (
    <Space direction="vertical" size="middle" className="w-100">
      <SearchFormFactory fields={searchFields} handleSubmit={handleSearch} />
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
      />
    </Space>
  );
};
export default DeveloperDaily;
