import { useEffect } from "react";
import { Modal, Form, Input, Switch, Select, InputNumber } from "antd";
import { formLayout, mode, CardStatus } from "@/utils/enum";
import { getCityArr } from "@/utils/format";
import Spin from "@/components/Spin";
import Banks from "@/utils/enum/bank";
import Prov from "@/utils/enum/prov";
const { Option } = Select;

const AddEdit = props => {
  const [form] = Form.useForm();
  const handleOk = async () => {
    form.validateFields().then(async formModel => {
      if (!formModel) return;
      await props.onOk({
        ...formModel,
        bank_name: Banks[formModel.bank_code],
      });
      form.resetFields();
    });
  };
  useEffect(() => {
    props.visible &&
      form.setFieldsValue(
        props.mode === "edit"
          ? props.data
          : {
              per_trans_limit: 0,
              per_day_limit: 0,
              cur_day_trans: 0,
              has_limit: false,
              rating: 0,
              status: 0,
              deposit_on: false,
              withdraw_on: false,
              is_active: true,
            },
      );
  });

  return (
    <Modal
      destroyOnClose={true}
      title={`${mode[props.mode]}银行卡`}
      visible={props.visible}
      onOk={handleOk}
      onCancel={props.onCancel}
      cancelText="取消"
      okText="送出"
      confirmLoading={props.loading}
    >
      <Spin spinning={props.loading}>
        <Form {...formLayout} form={form}>
          <Form.Item
            name="alias"
            label="别名"
            rules={[{ required: true, message: "请输入别名" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            label="账户名"
            rules={[{ required: true, message: "请输入账户名" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="account"
            label="银行账号"
            rules={[{ required: true, message: "请输入银行账号" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="bank_code"
            label="开户行"
            rules={[{ required: true, message: "请输入开户行" }]}
          >
            <Select>
              {Object.keys(Banks).map(i => (
                <Option value={i} key={i}>
                  {i} {Banks[i]}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="sub_bank" label="支行名称">
            <Input />
          </Form.Item>
          <Form.Item name="prov" label="省">
            <Select>
              {Prov.map(i => (
                <Option value={i} key={i}>
                  {i}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(prev, now) => prev.prov !== now.prov}
          >
            {({ getFieldValue }) => (
              <Form.Item name="city" label="市">
                <Select>
                  {(getCityArr(getFieldValue("prov") || "") || []).map(i => (
                    <Option value={i} key={i}>
                      {i}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            )}
          </Form.Item>
          <Form.Item name="phone" label="手机号">
            <Input />
          </Form.Item>
          <Form.Item name="idcard" label="身份证">
            <Input />
          </Form.Item>
          <Form.Item name="per_trans_limit" label="单笔转账上限">
            <InputNumber />
          </Form.Item>
          <Form.Item name="per_day_limit" label="每日转账上限">
            <InputNumber />
          </Form.Item>
          <Form.Item name="cur_day_trans" label="当日累计转账金额">
            <InputNumber />
          </Form.Item>
          <Form.Item
            name="has_limit"
            label="是否开启转账限额"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <Form.Item name="rating" label="rating">
            <InputNumber />
          </Form.Item>
          <Form.Item name="status" label="状态">
            <Select>
              {Object.keys(CardStatus).map(i => (
                <Option value={Number(i)} key={i}>
                  {CardStatus[i]}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="deposit_on" label="支持入款" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item
            name="withdraw_on"
            label="支持出款"
            valuePropName="checked"
          >
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
