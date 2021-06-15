import { useEffect } from "react";
import { Modal, Form, Input, Spin, Checkbox, Switch } from "antd";
import { formLayout, mode } from "@/utils/enum";
const AddEdit = props => {
  const wrapperCol = {
    offset: formLayout.labelCol.span,
    span: formLayout.wrapperCol.span,
  };
  const [form] = Form.useForm();
  const handleOk = async () => {
    await props.onOk(form.getFieldsValue());
    form.resetFields();
  };
  useEffect(() => {
    props.visible && props.mode === "edit" && form.setFieldsValue(props.data);
  });

  return (
    <Modal
      title={`${mode[props.mode]}职员`}
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
          <Form.Item name="password" label="password">
            <Input />
          </Form.Item>
          <Form.Item name="is_active" label="是否启用" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item
            name="is_admin"
            wrapperCol={wrapperCol}
            valuePropName="checked"
          >
            <Checkbox>isAdmin</Checkbox>
          </Form.Item>
          <Form.Item
            name="is_agent"
            wrapperCol={wrapperCol}
            valuePropName="checked"
          >
            <Checkbox>isAgent</Checkbox>
          </Form.Item>
          <Form.Item
            name="is_developer"
            wrapperCol={wrapperCol}
            valuePropName="checked"
          >
            <Checkbox>isDeveloper</Checkbox>
          </Form.Item>
          <Form.Item
            name="is_staff"
            wrapperCol={wrapperCol}
            valuePropName="checked"
          >
            <Checkbox>isStaff</Checkbox>
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};
export default AddEdit;
