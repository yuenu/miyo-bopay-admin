import { useEffect } from "react";
import { Modal, Form, Input, Checkbox, Switch } from "antd";
import { formLayout, mode as Mode } from "@/utils/enum";
import Spin from "@/components/Spin";

const AddEdit = ({ visible, mode, data, onCancel, onOk, loading }) => {
  const wrapperCol = {
    offset: formLayout.labelCol.span,
    span: formLayout.wrapperCol.span,
  };
  const [form] = Form.useForm();
  const handleOk = async () => {
    form.validateFields().then(async formModel => {
      if (!formModel) return;
      await onOk(formModel);
      form.resetFields();
    });
  };
  useEffect(() => {
    visible && mode === "edit" && form.setFieldsValue(data);
  });

  return (
    <Modal
      title={`${Mode[mode]}职员`}
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
      cancelText="取消"
      okText="送出"
      confirmLoading={loading}
    >
      <Spin spinning={loading}>
        <Form {...formLayout} form={form}>
          <Form.Item
            name="username"
            label="帐号"
            rules={[{ required: true, message: "请输入帐号" }]}
          >
            <Input />
          </Form.Item>
          {mode === "add" ? (
            <Form.Item name="password" label="密码">
              <Input />
            </Form.Item>
          ) : null}
          <Form.Item name="name" label="姓名">
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="电话">
            <Input />
          </Form.Item>
          <Form.Item name="email" label="email">
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
            <Checkbox>是否为管理员</Checkbox>
          </Form.Item>
          <Form.Item
            name="is_agent"
            wrapperCol={wrapperCol}
            valuePropName="checked"
          >
            <Checkbox>是否为代理</Checkbox>
          </Form.Item>
          <Form.Item
            name="is_developer"
            wrapperCol={wrapperCol}
            valuePropName="checked"
          >
            <Checkbox>是否为开发者</Checkbox>
          </Form.Item>
          <Form.Item
            name="is_staff"
            wrapperCol={wrapperCol}
            valuePropName="checked"
          >
            <Checkbox>是否为职员</Checkbox>
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};
export default AddEdit;
