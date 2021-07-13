import { useEffect } from "react";
import { Modal, Form, Input, Switch, Select, InputNumber } from "antd";
import { formLayout, mode, Currency, PayMethod, WXPayType } from "@/utils/enum";
import Spin from "@/components/Spin";
import {
  selectCryptoWallet,
  getCryptoWallets,
} from "@/store/slice/cryptoWallet";
import SearchSelect from "@/components/SearchSelect";
const { Option } = Select;

const AddEdit = props => {
  const [form] = Form.useForm();
  const handleOk = async () => {
    form.validateFields().then(async formModel => {
      if (!formModel) return;
      await props.onOk(formModel);
      form.resetFields();
    });
  };
  useEffect(() => {
    props.visible &&
      props.mode === "edit" &&
      form.setFieldsValue({
        ...props.data,
        extra: JSON.stringify(props.data.extra),
      });
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
        <Form
          {...formLayout}
          form={form}
          initialValues={{ random_decimals: 0 }}
        >
          <Form.Item
            name="name"
            label="名称"
            rules={[{ required: true, message: "请输入名称" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="display_name" label="显示名称">
            <Input />
          </Form.Item>
          <Form.Item
            name="alias"
            label="别名"
            rules={[{ required: true, message: "请输入别名" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="type"
            label="type"
            rules={[{ required: true, message: "请输入type" }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            name="gateway"
            label="gateway"
            rules={[{ required: true, message: "请输入gateway" }]}
          >
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
          <Form.Item name="callback_url" label="回调网址">
            <Input />
          </Form.Item>
          <Form.Item name="crypto_wallet_id" label="加密钱包ID">
            <SearchSelect
              action={getCryptoWallets}
              selector={selectCryptoWallet}
              searchKey="name"
              val="id"
              label={i => `${i.id} ${i.name}`}
            />
          </Form.Item>
          <Form.Item
            name="currency"
            label="货币"
            rules={[{ required: true, message: "请选择货币" }]}
          >
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
          <Form.Item name="rating" label="评级">
            <InputNumber />
          </Form.Item>
          <Form.Item name="resp_type" label="resp_type">
            <Input />
          </Form.Item>
          <Form.Item name="sign_type" label="sign_type">
            <Input />
          </Form.Item>
          <Form.Item name="whitelist" label="白名单">
            <Input />
          </Form.Item>
          <Form.Item name="h5_on" label="是否开启h5" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item name="is_3rd" label="是否第三方" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item name="pc_on" label="是否开启pc" valuePropName="checked">
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
