import { useEffect } from "react";
import { Modal, Form, Input, InputNumber, Spin } from "antd";
import { formLayout, mode } from "@/utils/enum";
const AddEdit = props => {
  const [form] = Form.useForm();
  const handleOk = async () => {
    const formModel = form.getFieldsValue();
    await props.onOk(formModel);
    form.resetFields();
  };
  useEffect(() => {
    props.visible && props.mode === "edit" && form.setFieldsValue(props.data);
  });
  return (
    <Modal
      title={`${mode[props.mode]}开发者`}
      visible={props.visible}
      onOk={handleOk}
      onCancel={props.onCancel}
      cancelText="取消"
      okText="送出"
      confirmLoading={props.loading}
    >
      <Spin spinning={props.loading}>
        <Form {...formLayout} form={form}>
          <Form.Item name="user_id" label="帐户ID">
            <InputNumber />
          </Form.Item>
          <Form.Item name="username" label="帐户名称">
            <Input />
          </Form.Item>
          <Form.Item name="name" label="姓名">
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="电话">
            <Input />
          </Form.Item>
          <Form.Item name="email" label="email">
            <Input />
          </Form.Item>
          <Form.Item name="org" label="org">
            <Input />
          </Form.Item>
          <Form.Item name="info" label="info">
            <Input />
          </Form.Item>
          <Form.Item name="site" label="site">
            <Input />
          </Form.Item>
          <Form.Item name="status" label="status">
            <InputNumber />
          </Form.Item>
          <Form.Item name="telegram" label="telegram">
            <Input />
          </Form.Item>
          <Form.Item name="note" label="备注">
            <Input />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};
export default AddEdit;
