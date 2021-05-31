import { Modal, Form, Input, Button, Space } from "antd";
const Edit = props => {
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };
  const [form] = Form.useForm();
  const handleOk = () => {
    props.onOk(form.getFieldsValue());
  };
  return (
    <Modal
      title="編輯職員"
      visible={props.visible}
      onCancel={props.onCancel}
      okText="送出"
      cancelText="取消"
      footer={false}
    >
      <Form {...layout} form={form} initialValues={props.data}>
        <Form.Item name="email" label="email">
          <Input />
        </Form.Item>
        <Form.Item name="name" label="姓名">
          <Input />
        </Form.Item>
        <Form.Item name="phone" label="電話">
          <Input />
        </Form.Item>
        <div className="text-right w-100">
          <Space>
            <Button onClick={props.onCancel}>取消</Button>
            <Button onClick={handleOk} type="primary">
              送出
            </Button>
          </Space>
        </div>
      </Form>
    </Modal>
  );
};
export default Edit;
