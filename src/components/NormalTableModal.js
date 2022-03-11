import { Modal } from "antd";
import { NormalTable } from "@/components/factory/TableFactory";
import { useList } from "@/utils/hook";

const Table = ({
  asyncThunk,
  selector,
  originParams = {},
  ...normalTableConfig
}) => {
  const {
    res: { list, meta },
    loading,
  } = useList(asyncThunk, selector, originParams);

  return (
    <NormalTable
      loading={loading}
      dataSource={list}
      meta={meta}
      {...normalTableConfig}
    />
  );
};

const NormalTableModal = ({
  modalVisible: visible = false,
  modalTitle: title = "default title",
  modalVidth: width = 700,
  onModalCancel: onCancel = () => {},
  tableConfig = {},
}) => {
  return (
    <Modal
      visible={visible}
      title={title}
      width={width}
      onCancel={() => onCancel?.()}
      footer={false}
      destroyOnClose={true}
    >
      {visible ? <Table {...tableConfig} /> : null}
    </Modal>
  );
};

export default NormalTableModal;
