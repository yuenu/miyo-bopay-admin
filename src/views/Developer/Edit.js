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
  }, [props.visible, form, props.data]);
  return (
    <Modal
      title="編輯開發者"
      visible={props.visible}
      onOk={handleOk}
      onCancel={props.onCancel}
      okText="送出"
      cancelText="取消"
      confirmLoading={props.loading}
    >
      <Spin spinning={props.loading}>
        <Form {...layout} form={form} initialValues={props.data}>
          <Form.Item name="name" label="name">
            <Input />
          </Form.Item>
          <Form.Item name="email" label="email">
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="phone">
            <Input />
          </Form.Item>
          <Form.Item name="info" label="info">
            <Input />
          </Form.Item>
          <Form.Item name="note" label="note">
            <Input />
          </Form.Item>
          <Form.Item name="org" label="org">
            <Input />
          </Form.Item>
          <Form.Item name="site" label="site">
            <Input />
          </Form.Item>
          <Form.Item name="status" label="status">
            <Input />
          </Form.Item>
          <Form.Item name="telegram" label="telegram">
            <Input />
          </Form.Item>
          <Form.Item name="user_id" label="user_id">
            <Input />
          </Form.Item>
          <Form.Item name="username" label="username">
            <Input />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};
export default Edit;
