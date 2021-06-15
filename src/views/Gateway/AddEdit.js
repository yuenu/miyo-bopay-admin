import { useEffect } from "react";
import { Modal, Form, Input, Spin, Switch } from "antd";
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
      title={`${mode[props.mode]}支付网关`}
      visible={props.visible}
      onOk={handleOk}
      onCancel={props.onCancel}
      cancelText="取消"
      okText="送出"
      confirmLoading={props.loading}
    >
      <Spin spinning={props.loading}>
        <Form {...formLayout} form={form}>
          <Form.Item name="name" label="名称">
            <Input />
          </Form.Item>
          <Form.Item name="alias" label="alias">
            <Input />
          </Form.Item>
          <Form.Item name="api" label="api">
            <Input />
          </Form.Item>
          <Form.Item name="appid" label="appid">
            <Input />
          </Form.Item>
          <Form.Item name="appsecret" label="appsecret">
            <Input />
          </Form.Item>
          <Form.Item name="is_active" label="是否启用" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item name="callback_url" label="callback_url">
            <Input />
          </Form.Item>
          <Form.Item name="display_name" label="display_name">
            <Input />
          </Form.Item>
          <Form.Item name="gateway" label="gateway">
            <Input />
          </Form.Item>
          <Form.Item name="whitelist" label="whitelist">
            <Input />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};
export default AddEdit;
