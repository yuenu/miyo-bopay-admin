import { Modal, Descriptions, Button, Tag, Space } from "antd";
import { dateFormat } from "@/utils/format";
import Spin from "@/components/Spin";
import { Perms } from "@/utils/enum";

const Detail = ({ visible, loading, data, onCancel, onDelete }) => {
  const { id, name, total, perms, created, updated, note } = data;
  const permsArr = [];
  perms &&
    Object.keys(perms).forEach(i => {
      if (i.split(".").length <= 1 || !perms[i]) return;
      let name;
      Perms.forEach(j => {
        j.children.forEach(k => {
          k.key === i && (name = k.title);
        });
      });
      permsArr.push({ key: i, name });
    });
  const handleDeleteClick = async (e, row) => {
    e.preventDefault();
    const params = { ...perms, [row.key]: false };
    onDelete(params);
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
        <Descriptions column={1} bordered>
          <Descriptions.Item label="ID">{id}</Descriptions.Item>
          <Descriptions.Item label="名称">{name}</Descriptions.Item>
          <Descriptions.Item label="职员数量">{total}</Descriptions.Item>
          <Descriptions.Item label="权限列表">
            <Space size={[4, 4]} wrap>
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
