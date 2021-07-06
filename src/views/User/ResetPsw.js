import { Modal, Form, Input } from "antd";
import { formLayout } from "@/utils/enum";
import Spin from "@/components/Spin";

const ResetPsw = ({ visible, mode, data, onCancel, onOk, loading }) => {
  const [form] = Form.useForm();
  const handleOk = async () => {
    form.validateFields().then(async formModel => {
      if (!formModel) return;
      await onOk(formModel);
      form.resetFields();
    });
  };
  return (
    <Modal
      title="重置密码"
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
      cancelText="取消"
      okText="送出"
      confirmLoading={loading}
    >
      <Spin spinning={loading}>
        <Form {...formLayout} form={form}>
          <Form.Item label="帐号">{data.username}</Form.Item>
          <Form.Item
            name="password"
            label="密码"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};
export default ResetPsw;
