import { Space } from "antd";
import {
  selectAppDaily,
  getAppDaily,
  getAppDailySum,
} from "@/store/slice/appDaily";
import { SearchFormFactory } from "@/components/factory/FormFactory";
import { useList } from "@/utils/hook";
import { dateFormat, priceFormat } from "@/utils/format";
import { Currency, IsBoolEnum } from "@/utils/enum";
import { NormalTable } from "@/components/factory/TableFactory";
import Tag from "@/components/Tag";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import SumTable from "@/components/SumTable";

const AppDaily = () => {
  const searchFields = {
    id__in: { type: "string", label: "ID" },
    app_id__in: { type: "string", label: "商户ID" },
    app_name__k: { type: "string", label: "商户名称" },
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
  } = useList(getAppDaily, selectAppDaily);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAppDailySum());
    // eslint-disable-next-line
  }, []);
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
      title: "扣除通道费后金额汇总",
      dataIndex: "total_amount_gateway",
      render: (val, record) =>
        priceFormat({ val: val || 0, currency: record.currency }),
      className: "text-nowrap",
      sorter: true,
    },
    {
      title: "扣除商户费(商户+通道)后金额汇总",
      dataIndex: "total_amount_app",
      render: (val, record) =>
        priceFormat({ val: val || 0, currency: record.currency }),
      className: "text-nowrap",
      sorter: true,
    },
    {
      title: "累计盈利金额",
      dataIndex: "total_profit_amount",
      render: (val, record) =>
        priceFormat({ val: val || 0, currency: record.currency }),
      className: "text-nowrap",
      sorter: true,
    },
    {
      title: "是否线上渠道",
      dataIndex: "is_online",
      render: val => <Tag val={val} />,
      sorter: true,
    },
    {
      title: "提交代付金额",
      dataIndex: "transfer_amount",
      render: (val, record) =>
        priceFormat({ val: val || 0, currency: record.currency }),
      className: "text-nowrap",
      sorter: true,
    },
    {
      title: "成功代付金额",
      dataIndex: "transfer_succeeded_amount",
      render: (val, record) =>
        priceFormat({ val: val || 0, currency: record.currency }),
      className: "text-nowrap",
      sorter: true,
    },
    {
      title: "提交代付笔数",
      dataIndex: "transfer_times",
      sorter: true,
    },
    {
      title: "成功代付笔数",
      dataIndex: "transfer_succeeded_times",
      sorter: true,
    },
    {
      title: "提交代付人数",
      dataIndex: "transfer_users",
      sorter: true,
    },
    {
      title: "成功代付人数",
      dataIndex: "transfer_succeeded_users",
      sorter: true,
    },
    {
      title: "提交存款人数",
      dataIndex: "order_users",
      sorter: true,
    },
    {
      title: "成功存款人数",
      dataIndex: "order_succeeded_users",
      sorter: true,
    },
    {
      title: "存提差",
      dataIndex: "total_succeeded_amount",
      render: (val, record) => val - record.transfer_succeeded_amount,
      sorter: true,
    },
  ];
  const sumColumns = [
    {
      title: "订单次数",
      dataIndex: "order_times",
    },
    {
      title: "订单成功此时",
      dataIndex: "order_succeeded_times",
    },
    {
      title: "订单成功金额",
      dataIndex: "order_succeeded_amount",
      render: val => priceFormat({ val, currency: 0 }),
    },
    {
      title: "代付次数",
      dataIndex: "transfer_times",
    },
    {
      title: "代付成功次数",
      dataIndex: "transfer_succeeded_times",
    },
    {
      title: "代付成功金额",
      dataIndex: "transfer_succeeded_amount",
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
export default AppDaily;
