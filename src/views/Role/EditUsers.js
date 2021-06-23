import { useState } from "react";
import { Modal, Spin, Table, Button, Form } from "antd";
import SearchSelect from "@/components/SearchSelect";
import { selectUser, getUsers } from "@/store/slice/user";

const EditUsers = ({ visible, onCancel, loading, data, onAdd, onDelete }) => {
  const [form] = Form.useForm();
  const [selectIds, setSelectIds] = useState([]);

  const handleAdd = async () => {
    form.validateFields().then(async formModel => {
      if (!formModel) return;
      await onAdd(formModel);
      form.resetFields();
    });
  };
  const handleDelete = async () => {
    await onDelete(selectIds);
    setSelectIds([]);
  };
  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "姓名", dataIndex: "name", editable: true, inputType: "string" },
    {
      title: "帐号",
      dataIndex: "username",
      editable: true,
      inputType: "string",
    },
  ];
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectIds(selectedRows.map(i => i.id));
    },
  };
  return (
    <Modal
      destroyOnClose={true}
      title="职员管理"
      visible={visible}
      confirmLoading={loading}
      onCancel={onCancel}
      footer={[
        <Button key="close" type="primary" onClick={onCancel}>
          关闭
        </Button>,
      ]}
    >
      <Spin spinning={loading}>
        <Form form={form}>
          <Form.Item
            name="ids"
            rules={[{ required: true, message: "请输入职员" }]}
          >
            <SearchSelect
              action={getUsers}
              selector={selectUser}
              searchKey="username"
              val="id"
              label={i => `${i.id} ${i.username}`}
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="请选择用户"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleAdd}>
              新增
            </Button>
          </Form.Item>
        </Form>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          rowKey="id"
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
        />
        <div className="text-right mt-1">
          <Button
            type="danger"
            disabled={selectIds.length <= 0}
            onClick={handleDelete}
          >
            批量删除
          </Button>
        </div>
      </Spin>
    </Modal>
  );
};
export default EditUsers;
