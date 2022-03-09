import { useEffect } from "react";
import { Modal, Form, Input } from "antd";
import { mode as Mode, formLayout } from "@/utils/enum";
import Spin from "@/components/Spin";
// import { CurrencyHelpTextFormItemFactory } from "@/components/factory/FormFactory";
const Edit = ({ visible, mode, data, onCancel, onOk, loading }) => {
  const [form] = Form.useForm();
  const handleOk = async () => {
    const formModel = form.getFieldsValue();
    await onOk({ ...formModel });
    form.resetFields();
  };
  useEffect(() => {
    visible &&
      mode === "approve" &&
      form.setFieldsValue({ amount_paid: data.amount });
  });
  return (
    <Modal
      title={`${Mode[mode]}订单`}
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
      cancelText="取消"
      okText="送出"
      confirmLoading={loading}
      destroyOnClose={true}
    >
      <Spin spinning={loading}>
        <Form {...formLayout} form={form}>
          <Form.Item label="ID">{data.id}</Form.Item>
          {/* {mode === "approve" && (
            <CurrencyHelpTextFormItemFactory
              name="amount_paid"
              label="实际付款金额"
              row={data}
              defaultValKey="amount"
            />
          )} */}
          <Form.Item name="comments" label="备注">
            <Input />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};
export default Edit;
