import { useEffect } from "react";
import { Modal, Form, Input, InputNumber, Switch, Select } from "antd";
import { formLayout, mode, Currency } from "@/utils/enum";
import Spin from "@/components/Spin";
const { Option } = Select;

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
      title={`${mode[props.mode]}收款地址`}
      visible={props.visible}
      onOk={handleOk}
      onCancel={props.onCancel}
      cancelText="取消"
      okText="送出"
      confirmLoading={props.loading}
    >
      <Spin spinning={props.loading}>
        <Form {...formLayout} form={form}>
          <Form.Item name="wallet_id" label="钱包ID">
            <InputNumber />
          </Form.Item>
          <Form.Item name="name" label="名称">
            <Input />
          </Form.Item>
          <Form.Item name="address" label="地址">
            <Input />
          </Form.Item>
          <Form.Item name="balance" label="余额">
            <InputNumber />
          </Form.Item>
          <Form.Item name="currency" label="货币">
            <Select>
              {Object.keys(Currency).map(i => (
                <Option value={Number(i)} key={i}>
                  {Currency[i]}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="last_block" label="last_block">
            <InputNumber />
          </Form.Item>
          <Form.Item name="last_block_time" label="last_block_time">
            <Input />
          </Form.Item>
          <Form.Item name="seq" label="seq">
            <InputNumber />
          </Form.Item>
          <Form.Item name="w" label="w">
            <InputNumber />
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
