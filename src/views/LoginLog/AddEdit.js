import { useEffect } from "react";
import { Modal, Form, Input, Spin, Checkbox } from "antd";
import { formLayout, mode } from "@/utils/enum";
const AddEdit = props => {
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
      title={`${mode[props.mode]}職員`}
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
          <Form.Item name="phone" label="電話">
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
          <Form.Item
            name="is_active"
            wrapperCol={{ offset: 4, span: 20 }}
            valuePropName="checked"
          >
            <Checkbox>isActive</Checkbox>
          </Form.Item>
          <Form.Item
            name="is_admin"
            wrapperCol={{ offset: 4, span: 20 }}
            valuePropName="checked"
          >
            <Checkbox>isAdmin</Checkbox>
          </Form.Item>
          <Form.Item
            name="is_agent"
            wrapperCol={{ offset: 4, span: 20 }}
            valuePropName="checked"
          >
            <Checkbox>isAgent</Checkbox>
          </Form.Item>
          <Form.Item
            name="is_developer"
            wrapperCol={{ offset: 4, span: 20 }}
            valuePropName="checked"
          >
            <Checkbox>isDeveloper</Checkbox>
          </Form.Item>
          <Form.Item
            name="is_staff"
            wrapperCol={{ offset: 4, span: 20 }}
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
