import { useEffect } from "react";
import { Modal, Form, Input, InputNumber } from "antd";
import { mode, formLayout } from "@/utils/enum";
import Spin from "@/components/Spin";

const Edit = props => {
  const [form] = Form.useForm();
  const handleOk = async () => {
    const formModel = form.getFieldsValue();
    await props.onOk({ ...formModel });
    form.resetFields();
  };
  useEffect(() => {
    props.visible &&
      props.mode === "approve" &&
      form.setFieldsValue({ amount_paid: props.data.amount });
  });
  return (
    <Modal
      title={`${mode[props.mode]}订单`}
      visible={props.visible}
      onOk={handleOk}
      onCancel={props.onCancel}
      cancelText="取消"
      okText="送出"
      confirmLoading={props.loading}
      destroyOnClose={true}
    >
      <Spin spinning={props.loading}>
        <Form {...formLayout} form={form}>
          <Form.Item label="ID">{props.data.id}</Form.Item>
          {props.mode === "approve" && (
            <Form.Item name="amount_paid" label="实际付款金额">
              <InputNumber />
            </Form.Item>
          )}
          <Form.Item name="comments" label="备注">
            <Input />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};
export default Edit;
