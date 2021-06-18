import { useEffect } from "react";
import { Modal, Form, Input, InputNumber } from "antd";
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
      title={`${mode[props.mode]}App用户`}
      visible={props.visible}
      onOk={handleOk}
      onCancel={props.onCancel}
      cancelText="取消"
      okText="送出"
      confirmLoading={props.loading}
    >
      <Spin spinning={props.loading}>
        <Form {...formLayout} form={form}>
          {props.mode === "edit" && (
            <Form.Item name="id" label="ID">
              <InputNumber disabled />
            </Form.Item>
          )}
          <Form.Item name="name" label="姓名">
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="电话">
            <Input />
          </Form.Item>
          <Form.Item name="app_id" label="AppID">
            <InputNumber />
          </Form.Item>
          <Form.Item name="app_name" label="App名称">
            <Input />
          </Form.Item>
          <Form.Item name="app_userid" label="App用户ID">
            <Input />
          </Form.Item>
          <Form.Item name="developer_id" label="开发者ID">
            <InputNumber />
          </Form.Item>
          <Form.Item name="developer_name" label="开发者姓名">
            <Input />
          </Form.Item>
          <Form.Item name="rating" label="评级">
            <InputNumber />
          </Form.Item>
          <Form.Item name="register_ip" label="注册IP">
            <Input />
          </Form.Item>
          <Form.Item name="userid" label="会员ID">
            <Input />
          </Form.Item>
          <Form.Item name="vip" label="等级">
            <InputNumber />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};
export default AddEdit;
