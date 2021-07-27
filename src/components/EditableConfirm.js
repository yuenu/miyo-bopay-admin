import { useEffect } from "react";
import { Modal, Form, Input } from "antd";
import { formLayout } from "@/utils/enum";
import Spin from "@/components/Spin";
import { CurrencyHelpTextFormItemFactory } from "@/components/factory/FormFactory";
import SearchSelect from "@/components/SearchSelect";

const Edit = ({ visible, data, onCancel, onOk, loading, title, fields }) => {
  const [form] = Form.useForm();
  const handleOk = async () => {
    form.validateFields().then(async formModel => {
      if (!formModel) return;
      await onOk({ ...formModel });
      form.resetFields();
    });
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
                rules={
                  i.required
                    ? [{ required: true, message: `请输入${i.label}` }]
                    : []
                }
              />
            ) : (
              <Form.Item
                name={i.name}
                label={i.label}
                key={i.name}
                rules={
                  i.required
                    ? [{ required: true, message: `请输入${i.label}` }]
                    : []
                }
              >
                {i.inputType === "searchSelect" ? (
                  <SearchSelect
                    action={i.action}
                    selector={i.selector}
                    searchKey="name"
                    val="id"
                    label={j => `${j.id} ${j.name}`}
                  />
                ) : (
                  <Input />
                )}
              </Form.Item>
            );
          })}
        </Form>
      </Spin>
    </Modal>
  );
};
export default Edit;
