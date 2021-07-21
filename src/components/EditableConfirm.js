import { useEffect } from "react";
import { Modal, Form, Input } from "antd";
import { formLayout } from "@/utils/enum";
import Spin from "@/components/Spin";
import { CurrencyHelpTextFormItemFactory } from "@/components/factory/FormFactory";
const Edit = ({ visible, data, onCancel, onOk, loading, title, fields }) => {
  const [form] = Form.useForm();
  const handleOk = async () => {
    const formModel = form.getFieldsValue();
    await onOk({ ...formModel });
    form.resetFields();
  };
  useEffect(() => {
    visible && form.setFieldsValue(data);
  });

  return (
    <Modal
      title={title}
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
          {fields.map(i => {
            return i.inputType === "price" ? (
              <CurrencyHelpTextFormItemFactory
                name={i.name}
                label={i.label}
                row={data}
                defaultValKey={i.name}
                key={i.name}
              />
            ) : (
              <Form.Item name={i.name} label={i.label} key={i.name}>
                <Input />
              </Form.Item>
            );
          })}
        </Form>
      </Spin>
    </Modal>
  );
};
export default Edit;
