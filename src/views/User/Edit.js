import { Form, Input } from "antd";
const Edit = props => {
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };
  return (
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
  );
};
export default Edit;
