import { useEffect } from "react";
import { Modal, Form, Input, InputNumber, Switch } from "antd";
import { formLayout, mode } from "@/utils/enum";
import Spin from "@/components/Spin";

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
      title={`${mode[props.mode]}App`}
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
          <Form.Item name="name_cn" label="名称CN">
            <Input />
          </Form.Item>
          <Form.Item name="developer_id" label="开发者ID">
            <InputNumber />
          </Form.Item>
          <Form.Item name="developer_name" label="开发者姓名">
            <Input />
          </Form.Item>
          <Form.Item name="callback_url" label="callback_url">
            <Input />
          </Form.Item>
          <Form.Item name="secret" label="secret">
            <Input />
          </Form.Item>
          <Form.Item name="info" label="info">
            <Input />
          </Form.Item>
          <Form.Item name="status" label="status">
            <InputNumber />
          </Form.Item>
          <Form.Item name="token" label="Token">
            <Input />
          </Form.Item>
          <Form.Item name="is_active" label="是否启用" valuePropName="checked">
            <Switch />
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
