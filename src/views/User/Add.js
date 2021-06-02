import { Modal, Form, Input, Spin } from "antd";
const Add = props => {
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
      title="添加職員"
      visible={props.visible}
      onOk={handleOk}
      onCancel={props.onCancel}
      cancelText="取消"
      okText="送出"
      confirmLoading={props.loading}
    >
      <Spin spinning={props.loading}>
        <Form {...layout} form={form}>
          <Form.Item name="email" label="email">
            <Input />
          </Form.Item>
          <Form.Item name="name" label="姓名">
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="電話">
            <Input />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};
export default Add;
