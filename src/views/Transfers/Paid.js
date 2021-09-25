import React, { useEffect } from "react";
import { Modal, Form, Input } from "antd";
import { formLayout } from "@/utils/enum";
import Spin from "@/components/Spin";
import { CurrencyHelpTextFormItemFactory } from "@/components/factory/FormFactory";
import SearchSelect from "@/components/SearchSelect";
import { selectTransfer, getTransfersGateways } from "@/store/slice/transfer";
import { selectCryptoAcct, getCryptoAccts } from "@/store/slice/cryptoAcct";
import { useSelector } from "react-redux";

const Paid = ({ visible, data, onCancel, onOk, loading }) => {
  const { gateways } = useSelector(selectTransfer);
  const [form] = Form.useForm();
  const handleOk = async () => {
    form.validateFields().then(async formModel => {
      const { crypto_wallet_id, amount, ...rest } = formModel;
      if (!formModel) return;
      await onOk({ amount_paid: amount, ...rest });
      form.resetFields();
    });
  };
  useEffect(() => {
    if (visible) {
      const obj = gateways.find(i => i.id === data.gateway_id);
      form.setFieldsValue({
        ...data,
        crypto_wallet_id: obj?.crypto_wallet_id || null,
      });
    }
  });
  const handleOnSelectGateways = val => {
    form.setFieldsValue({ crypto_wallet_id: val.crypto_wallet_id });
  };
  return (
    <Modal
      title="出款"
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
          <Form.Item
            name="gateway_id"
            label="gateway"
            rules={[{ required: true, message: `请输入gateway` }]}
          >
            <SearchSelect
              action={getTransfersGateways}
              params={{ id: data.id }}
              payloadPos="data"
              selector={selectTransfer}
              searchKey="name"
              val="id"
              label={j => `${j.id} ${j.name}`}
              onSelect={handleOnSelectGateways}
            />
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(prev, now) => prev.gateway_id !== now.gateway_id}
          >
            {({ getFieldValue }) => {
              return (
                getFieldValue("gateway_id") && (
                  <Form.Item name="crypto_wallet_id" label="錢包ID">
                    <Input disabled />
                  </Form.Item>
                )
              );
            }}
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(prev, now) =>
              prev.crypto_wallet_id !== now.crypto_wallet_id
            }
          >
            {({ getFieldValue, resetFields }) => {
              resetFields(["crypto_acct_id"]);
              const wallet_id = getFieldValue("crypto_wallet_id");
              return wallet_id > 0 ? (
                <Form.Item name="crypto_acct_id" label="出款账户">
                  <SearchSelect
                    action={getCryptoAccts}
                    params={{ wallet_id, is_active: true }}
                    selector={selectCryptoAcct}
                    searchKey="name"
                    val="id"
                    label={i => `${i.id} ${i.name}`}
                  />
                </Form.Item>
              ) : null;
            }}
          </Form.Item>
          <CurrencyHelpTextFormItemFactory
            name="amount"
            label="金額"
            row={data}
            rules={[{ required: true, message: "请输入金額" }]}
          />
        </Form>
      </Spin>
    </Modal>
  );
};

export default React.memo(Paid, (prev, next) => {
  return prev.visible === next.visible;
});
