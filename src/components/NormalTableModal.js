import { Modal } from "antd";
import { NormalTable } from "@/components/factory/TableFactory";
import { useList } from "@/utils/hook";

const Table = ({
  columns,
  defaultColumns,
  asyncThunk,
  selector,
  params = {},
}) => {
  const {
    res: { list },
    loading,
  } = useList(asyncThunk, selector, params);

  return (
    <NormalTable
      allColumns={columns}
      defaultColumns={defaultColumns}
      dataSource={list}
      loading={loading}
    />
  )
}

const NormalTableModal = ({
  visible,
  title,
  width = 700,
  onCancel,
  ...rest
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
      {visible ? <Table {...rest} /> : null}
    </Modal>
  )
}

export default NormalTableModal;
