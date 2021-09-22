import { Modal, Descriptions, Button, Tag, Space } from "antd";
import { dateFormat, permsToArrayFormat } from "@/utils/format";
import Spin from "@/components/Spin";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const Detail = ({ visible, loading, data, onCancel, onDelete }) => {
  const { id, name, total, perms, created, updated, note } = data;
  const permsArr = permsToArrayFormat(perms);
  const handleDeleteClick = (e, row) => {
    e.preventDefault();
    Modal.confirm({
      title: "是否删除权限",
      icon: <ExclamationCircleOutlined />,
      content: `即将删除 ${row.name}，是否继续？`,
      okText: "确认",
      cancelText: "取消",
      onOk: close => handleDelete(close, row),
    });
  };
  const handleDelete = async (close, row) => {
    const params = { ...perms, [row.key]: false };
    await onDelete(params);
    close();
  };
  return (
    <Modal
      title="角色明细"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="close" type="primary" onClick={onCancel}>
          关闭
        </Button>,
      ]}
    >
      <Spin spinning={loading}>
        <Descriptions column={1} bordered size="small">
          <Descriptions.Item label="ID">{id}</Descriptions.Item>
          <Descriptions.Item label="名称">{name}</Descriptions.Item>
          <Descriptions.Item label="职员数量">{total}</Descriptions.Item>
          <Descriptions.Item label="权限列表">
            <Space size={[0, 4]} wrap>
              {permsArr.map(i => (
                <Tag
                  color="purple"
                  key={i.key}
                  closable
                  onClose={e => handleDeleteClick(e, i)}
                >
                  {i.name}
                </Tag>
              ))}
            </Space>
          </Descriptions.Item>
          <Descriptions.Item label="创建日期">
            {dateFormat(created)}
          </Descriptions.Item>
          <Descriptions.Item label="更新日期">
            {dateFormat(updated)}
          </Descriptions.Item>
          <Descriptions.Item label="备注">{note}</Descriptions.Item>
        </Descriptions>
      </Spin>
    </Modal>
  );
};

export default Detail;
