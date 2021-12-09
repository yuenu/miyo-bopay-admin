import { useEffect } from "react";
import { Modal, Form, Input } from "antd";
import { formLayout, mode as Mode } from "@/utils/enum";
import Spin from "@/components/Spin";

const AddEdit = ({ visible, mode, data, onOk, onCancel, loading }) => {
  const [form] = Form.useForm();
  const handleOk = async () => {
    form.validateFields().then(async formModel => {
      if (!formModel) return;
      await onOk({
        ...formModel,
      });
      form.resetFields();
    });
  };
  useEffect(() => {
    visible && mode === "edit" && form.setFieldsValue(data);
  });

  return (
    <Modal
      destroyOnClose={true}
      title={`${Mode[mode]}白名單IP`}
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
      cancelText="取消"
      okText="送出"
      confirmLoading={loading}
    >
      <Spin spinning={loading}>
        <Form {...formLayout} form={form}>
          {mode === "edit" && <Form.Item label="ID">{data.id}</Form.Item>}
          <Form.Item
            name="ips"
            label="IP"
            rules={[{ required: true, message: "请输入ip，以逗號隔開" }]}
          >
            <Input placeholder="请输入ip，以逗號隔開" />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};
export default AddEdit;
