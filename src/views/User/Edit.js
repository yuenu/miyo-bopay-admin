import { useEffect } from "react";
import { Modal, Form, Input } from "antd";
import Spin from "@/components/Spin";
const Edit = props => {
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };
  const [form] = Form.useForm();
  const handleOk = () => {
    props.onOk(form.getFieldsValue());
  };
  useEffect(() => {
    props.visible && form.setFieldsValue(props.data);
  });
  return (
    <Modal
      title="編輯職員"
      visible={props.visible}
      onOk={handleOk}
      onCancel={props.onCancel}
      okText="送出"
      cancelText="取消"
    >
      <Spin spinning={props.loading}>
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
        </Form>
      </Spin>
    </Modal>
  );
};
export default Edit;
