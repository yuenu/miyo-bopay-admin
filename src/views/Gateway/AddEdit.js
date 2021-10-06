import { useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Switch,
  Select,
  InputNumber,
  Space,
  Divider,
} from "antd";
import {
  formLayout,
  mode as Mode,
  Currency,
  PayMethod,
  WXPayType,
  AmountType,
} from "@/utils/enum";
import Spin from "@/components/Spin";
import {
  selectCryptoWallet,
  getCryptoWallets,
} from "@/store/slice/cryptoWallet";
import { selectGateway, getGateways } from "@/store/slice/gateway";
import { selectCard, getCards } from "@/store/slice/card";
import { selectApp, getApps } from "@/store/slice/app";
import SearchSelect from "@/components/SearchSelect";
import { useSelector } from "react-redux";
const { Option } = Select;
const { TextArea } = Input;
const SelectOne = ({ onChange }) => {
  return (
    <Form.Item label="複製网关" {...formLayout}>
      <SearchSelect
        action={getGateways}
        selector={selectGateway}
        searchKey="name"
        val="id"
        label={i => `${i.id} ${i.name}`}
        onSelect={onChange}
      />
    </Form.Item>
  );
};

const AddEdit = ({ visible, loading, data, mode, onOk, onCancel }) => {
  const handleChangeCpGateway = val => {
    form.setFieldsValue({
      ...val,
      extra: JSON.stringify(val.extra),
      apps: val.apps || [],
      whitelist: Array.isArray(val.whitelist) ? val.whitelist.join(",") : "",
    });
  };

  const { list: wallets } = useSelector(selectCryptoWallet);
  const { list: cards } = useSelector(selectCard);
  const [form] = Form.useForm();
  const handleOk = async () => {
    form.validateFields().then(async formModel => {
      if (!formModel) return;
      const acct_name =
        formModel.currency === 0
          ? cards.find(i => i.id === formModel.card_id)?.name
          : wallets.find(i => i.id === formModel.crypto_wallet_id)?.name;
      await onOk({
        ...formModel,
        acct_name,
        whitelist: formModel.whitelist
          ? formModel.whitelist.replace(/(\r\n|\n|\r)/gm, "").split(",")
          : [],
        extra: JSON.parse(formModel.extra || "{}"),
        payer_cred: JSON.parse(formModel.payer_cred || "{}"),
      });
      form.resetFields();
    });
  };
  useEffect(() => {
    visible &&
      mode === "edit" &&
      form.setFieldsValue({
        ...data,
        extra: JSON.stringify(data.extra),
        apps: data.apps || [],
        whitelist: Array.isArray(data.whitelist)
          ? data.whitelist.join(",")
          : "",
      });
  });
  useEffect(() => {
    visible && mode === "add" && form.resetFields();
  }, [visible]);

  return (
    <Modal
      title={`${Mode[mode]}支付网关`}
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
      cancelText="取消"
      okText="送出"
      confirmLoading={loading}
      destroyOnClose={true}
    >
      <Space direction="vertical" className="w-100">
        {mode === "add" && (
          <>
            <SelectOne onChange={handleChangeCpGateway} />
            <Divider />
          </>
        )}

        <Spin spinning={loading}>
          <Form
            {...formLayout}
            form={form}
            initialValues={{
              random_decimals: 0,
              amount_min: 1,
              amount_max: 9999999,
            }}
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
            <Form.Item name="apps" label="Apps">
              <SearchSelect
                action={getApps}
                selector={selectApp}
                searchKey="name"
                val="id"
                label={i => `${i.id} ${i.name}`}
                mode="multiple"
              />
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
            <Form.Item name="extra" label="extra">
              <TextArea />
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
            <Form.Item
              name="amount_type"
              label="金额类型"
              rules={[{ required: true, message: "请选择金额类型" }]}
            >
              <Select>
                {Object.keys(AmountType).map(i => (
                  <Option value={Number(i)} key={i}>
                    {AmountType[i]}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="amount_min" label="最小金额">
              <InputNumber />
            </Form.Item>
            <Form.Item name="amount_max" label="最大金额">
              <InputNumber />
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
              noStyle
              shouldUpdate={(prev, now) => prev.currency !== now.currency}
            >
              {({ getFieldValue }) =>
                getFieldValue("currency") === 0 ? (
                  <Form.Item name="card_id" label="银行卡ID">
                    <SearchSelect
                      action={getCards}
                      selector={selectCard}
                      searchKey="name"
                      val="id"
                      label={i => `${i.id} ${i.name}`}
                    />
                  </Form.Item>
                ) : null
              }
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
              <TextArea />
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
            <Form.Item
              name="is_active"
              label="是否启用"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
            <Form.Item name="note" label="备注">
              <Input />
            </Form.Item>
          </Form>
        </Spin>
      </Space>
    </Modal>
  );
};
export default AddEdit;
