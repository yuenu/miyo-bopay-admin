import { Modal, Spin, Table, Button, Form } from "antd";
import SearchSelect from "@/components/SearchSelect";
import { selectUser, getUsers } from "@/store/slice/user";
const EditUsers = ({ visible, onCancel, loading, data, onOk }) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    form.validateFields().then(async formModel => {
      if (!formModel) return;
      await onOk(formModel);
      form.resetFields();
    });
  };
  const handleDeleteClick = id => {
    console.log(id);
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
    {
      title: "动作",
      dataIndex: "action",
      align: "right",
      render: (_, record) => (
        <Button onClick={() => handleDeleteClick(record.id)} type="danger">
          删除
        </Button>
      ),
    },
  ];
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
            <Button type="primary" onClick={handleOk}>
              新增
            </Button>
          </Form.Item>
        </Form>
        <Table columns={columns} dataSource={data} pagination={false} />
      </Spin>
    </Modal>
  );
};
export default EditUsers;
