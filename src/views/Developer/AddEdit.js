import { useEffect } from "react";
import { Modal, Form, Input, Spin, Switch } from "antd";
import { formLayout, mode } from "@/utils/enum";
const AddEdit = props => {
  const [form] = Form.useForm();
  const handleOk = async () => {
    const formModel = form.getFieldsValue();
    await props.onOk({ ...formModel, status: formModel.status ? 1 : 0 });
    form.resetFields();
  };
  useEffect(() => {
    props.visible && props.mode === "edit" && form.setFieldsValue(props.data);
  });
  return (
    <Modal
      title={`${mode[props.mode]}App用戶`}
      visible={props.visible}
      onOk={handleOk}
      onCancel={props.onCancel}
      cancelText="取消"
      okText="送出"
      confirmLoading={props.loading}
    >
      <Spin spinning={props.loading}>
        <Form {...formLayout} form={form}>
          <Form.Item name="name" label="姓名">
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="电话">
            <Input />
          </Form.Item>
          <Form.Item name="email" label="email">
            <Input />
          </Form.Item>
          <Form.Item name="username" label="username">
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
          <Form.Item name="status" label="status" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item name="telegram" label="telegram">
            <Input />
          </Form.Item>
          <Form.Item name="user_id" label="user_id">
            <Input />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};
export default AddEdit;
