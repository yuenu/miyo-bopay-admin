import { useEffect } from "react";
import { Modal, Form, Input, InputNumber, Switch, Select } from "antd";
import { formLayout, mode as Mode, Currency } from "@/utils/enum";
import Spin from "@/components/Spin";
import SearchSelect from "@/components/SearchSelect";
import {
  selectCryptoWallet,
  getCryptoWallets,
} from "@/store/slice/cryptoWallet";
const { Option } = Select;

const AddEdit = ({ visible, mode, data, onOk, onCancel, loading }) => {
  const [form] = Form.useForm();
  const handleOk = async () => {
    form.validateFields().then(async formModel => {
      if (!formModel) return;
      await onOk(formModel);
      form.resetFields();
    });
  };
  useEffect(() => {
    visible && mode === "edit" && form.setFieldsValue(data);
  });

  const handleOnWalletIdSelect = row => {
    form.setFieldsValue({ currency: row.currency });
  };

  return (
    <Modal
      title={`${Mode[mode]}收款地址`}
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
      cancelText="取消"
      okText="送出"
      confirmLoading={loading}
    >
      <Spin spinning={loading}>
        <Form {...formLayout} form={form}>
          <Form.Item
            name="wallet_id"
            label="钱包ID"
            rules={[{ required: true, message: "请输入钱包ID" }]}
          >
            <SearchSelect
              action={getCryptoWallets}
              selector={selectCryptoWallet}
              searchKey="name"
              val="id"
              label={i => `${i.id} ${i.name}`}
              onSelect={handleOnWalletIdSelect}
            />
          </Form.Item>
          <Form.Item name="currency" label="货币">
            <Select disabled>
              {Object.keys(Currency).map(i => (
                <Option value={Number(i)} key={i}>
                  {Currency[i]}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="name" label="名称">
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="地址"
            rules={[{ required: true, message: "请输入地址" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="balance" label="余额">
            <InputNumber />
          </Form.Item>
          <Form.Item name="last_block" label="last_block">
            <InputNumber />
          </Form.Item>
          <Form.Item name="last_block_time" label="last_block_time">
            <Input />
          </Form.Item>
          <Form.Item name="seq" label="排序">
            <InputNumber />
          </Form.Item>
          <Form.Item name="w" label="序号">
            <InputNumber />
          </Form.Item>
          <Form.Item name="txlimit" label="单笔交易上限">
            <InputNumber />
          </Form.Item>
          <Form.Item name="txlimit_daily" label="单日累计交易上限">
            <InputNumber />
          </Form.Item>
          {mode === "edit" && (
            <Form.Item label="当日累计交易金额">{data?.txlimit_day}</Form.Item>
          )}
          {mode === "edit" && (
            <Form.Item label="累计交易金额">{data?.tx_amount}</Form.Item>
          )}
          {mode === "edit" && (
            <Form.Item label="累计交易笔数">{data?.tx_cnt}</Form.Item>
          )}
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
