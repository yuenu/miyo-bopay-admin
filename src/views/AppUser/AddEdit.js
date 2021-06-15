import { useEffect } from "react";
import { Modal, Form, Input, Spin, InputNumber } from "antd";
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
          <Form.Item name="app_id" label="AppId">
            <InputNumber />
          </Form.Item>
          <Form.Item name="app_name" label="AppName">
            <Input />
          </Form.Item>
          <Form.Item name="app_userid" label="app_userid">
            <Input />
          </Form.Item>
          <Form.Item name="developer_id" label="developer_id">
            <InputNumber />
          </Form.Item>
          <Form.Item name="developer_name" label="developer_name">
            <Input />
          </Form.Item>
          <Form.Item name="rating" label="rating">
            <InputNumber />
          </Form.Item>
          <Form.Item name="register_ip" label="register_ip">
            <Input />
          </Form.Item>
          <Form.Item name="userid" label="userid">
            <Input />
          </Form.Item>
          <Form.Item name="vip" label="vip">
            <InputNumber />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};
export default AddEdit;
