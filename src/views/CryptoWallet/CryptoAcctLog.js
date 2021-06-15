import { Space, Table } from "antd";
import {
  selectCryptoWallet,
  getCryptoAcctLogs,
} from "@/store/slice/cryptoWallet";
import { Currency, isBoolEnum } from "@/utils/enum";
import { useList } from "@/utils/hook";
import { SearchFormFactory } from "@/components/factory/FormFactory";

const CryptoWallet = () => {
  const searchFields = {
    id: { type: "string", label: "ID" },
    name: { type: "string", label: "钱包名" },
    currency: { type: "select", label: "货币", options: Currency },
    is_active: {
      type: "select",
      label: "是否启用",
      options: isBoolEnum,
      isBool: true,
    },
  };

  const {
    res: { list, meta },
    loading: listLoading,
    handleGetList,
    handleChangePage,
  } = useList(getCryptoAcctLogs, selectCryptoWallet);

  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "钱包名", dataIndex: "name", width: "150px" },
    { title: "钱包所有者", dataIndex: "owner" },
    { title: "区块链", dataIndex: "network" },
    { title: "备注", dataIndex: "note" },
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
    </Space>
  );
};
export default CryptoWallet;
