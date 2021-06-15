import { Modal, Form, Input, InputNumber, Spin } from "antd";
import { mode } from "@/utils/enum";
const Edit = props => {
  const [form] = Form.useForm();
  const handleOk = async () => {
    const formModel = form.getFieldsValue();
    await props.onOk({ ...formModel });
    form.resetFields();
  };
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  return (
    <Modal
      title={`${mode[props.mode]}订单`}
      visible={props.visible}
      onOk={handleOk}
      onCancel={props.onCancel}
      cancelText="取消"
      okText="送出"
      confirmLoading={props.loading}
    >
      <Spin spinning={props.loading}>
        <Form {...layout} form={form}>
          <Form.Item label="ID">{props.id}</Form.Item>
          {props.mode === "approve" && (
            <Form.Item name="amount_paid" label="实际付款金额">
              <InputNumber />
            </Form.Item>
          )}
          <Form.Item name="comments" label="comments">
            <Input />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};
export default Edit;
