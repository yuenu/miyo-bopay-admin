import { useEffect } from "react";
import { Modal, Form, Input, Switch, Select, InputNumber } from "antd";
import { formLayout, mode, Currency, PayMethod, WXPayType } from "@/utils/enum";
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
      title={`${mode[props.mode]}支付网关`}
      visible={props.visible}
      onOk={handleOk}
      onCancel={props.onCancel}
      cancelText="取消"
      okText="送出"
      confirmLoading={props.loading}
    >
      <Spin spinning={props.loading}>
        <Form {...formLayout} form={form}>
          <Form.Item name="name" label="名称">
            <Input />
          </Form.Item>
          <Form.Item name="display_name" label="display_name">
            <Input />
          </Form.Item>

          <Form.Item name="alias" label="alias">
            <Input />
          </Form.Item>
          <Form.Item name="api" label="api">
            <Input />
          </Form.Item>
          <Form.Item name="appid" label="appid">
            <Input />
          </Form.Item>
          <Form.Item name="appsecret" label="appsecret">
            <Input />
          </Form.Item>

          <Form.Item name="callback_url" label="callback_url">
            <Input />
          </Form.Item>
          <Form.Item name="crypto_wallet_id" label="加密钱包ID">
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
          <Form.Item name="pay_method" label="付款方式">
            <Select>
              {Object.keys(PayMethod).map(i => (
                <Option value={Number(i)} key={i}>
                  {PayMethod[i]}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="pay_type" label="支付类别">
            <Select>
              {Object.keys(WXPayType).map(i => (
                <Option value={Number(i)} key={i}>
                  {WXPayType[i]}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="decimals" label="decimals">
            <InputNumber />
          </Form.Item>
          <Form.Item name="random_decimals" label="random_decimals">
            <InputNumber />
          </Form.Item>
          <Form.Item name="expires" label="expires">
            <InputNumber />
          </Form.Item>
          <Form.Item name="fee" label="fee">
            <InputNumber />
          </Form.Item>
          <Form.Item name="gateway" label="gateway">
            <Input />
          </Form.Item>
          <Form.Item name="rating" label="rating">
            <InputNumber />
          </Form.Item>
          <Form.Item name="resp_type" label="resp_type">
            <Input />
          </Form.Item>
          <Form.Item name="sign_type" label="sign_type">
            <Input />
          </Form.Item>
          <Form.Item name="type" label="type">
            <Input />
          </Form.Item>
          <Form.Item name="whitelist" label="whitelist">
            <Input />
          </Form.Item>
          <Form.Item name="h5_on" label="h5_on" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item name="is_3rd" label="is_3rd" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item name="pc_on" label="pc_on" valuePropName="checked">
            <Switch />
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
