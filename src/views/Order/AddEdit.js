import { useEffect } from "react";
import { Modal, Form, Input, InputNumber, Select } from "antd";
import {
  formLayout,
  mode,
  OrderStatus,
  WXPayType,
  PayMethod,
  PayStatus,
  ApprovalStatus,
  NotifyStatus,
  Currency,
} from "@/utils/enum";
import SearchSelect from "@/components/SearchSelect";
import { selectDeveloper, getDevelopers } from "@/store/slice/developer";
import { selectApp, getApps } from "@/store/slice/app";
import { selectUser, getUsers } from "@/store/slice/user";

import Spin from "@/components/Spin";
const { Option } = Select;
const AddEdit = props => {
  const [form] = Form.useForm();
  const handleOk = async () => {
    const formModel = form.getFieldsValue();
    await props.onOk({ ...formModel, status: formModel.status ? 1 : 0 });
    form.resetFields();
  };
  useEffect(() => {
    props.visible && props.mode === "edit" && form.setFieldsValue(props.data);
  });
  return (
    <Modal
      title={`${mode[props.mode]}订单`}
      visible={props.visible}
      onOk={handleOk}
      onCancel={props.onCancel}
      cancelText="取消"
      okText="送出"
      confirmLoading={props.loading}
    >
      <Spin spinning={props.loading}>
        <Form {...formLayout} form={form}>
          <Form.Item name="order_no" label="订单号">
            <Input />
          </Form.Item>
          <Form.Item name="trans_no" label="第三方订单号">
            <Input />
          </Form.Item>
          <Form.Item name="app_id" label="AppID">
            <SearchSelect
              action={getApps}
              selector={selectApp}
              searchKey="name"
              val="id"
              label={i => `${i.id} ${i.name}`}
            />
          </Form.Item>
          <Form.Item name="developer_id" label="商戶ID">
            <SearchSelect
              action={getDevelopers}
              selector={selectDeveloper}
              searchKey="name"
              val="id"
              label={i => `${i.id} ${i.name}`}
            />
          </Form.Item>
          <Form.Item name="userid" label="会员ID">
            <SearchSelect
              action={getUsers}
              selector={selectUser}
              searchKey="username"
              val="id"
              label={i => `${i.id} ${i.username}`}
            />
          </Form.Item>
          <Form.Item name="payer_name" label="会员姓名">
            <Input />
          </Form.Item>
          <Form.Item name="status" label="订单状态">
            <Select>
              {Object.keys(OrderStatus).map(i => (
                <Option value={Number(i)} key={i}>
                  {OrderStatus[i]}
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
          <Form.Item name="pay_method" label="付款方式">
            <Select>
              {Object.keys(PayMethod).map(i => (
                <Option value={Number(i)} key={i}>
                  {PayMethod[i]}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="payer_name" label="付款人姓名">
            <Input />
          </Form.Item>
          <Form.Item name="payer_cred" label="付款人信息">
            <Input />
          </Form.Item>
          <Form.Item name="device_type" label="设备类型">
            <InputNumber />
          </Form.Item>
          <Form.Item name="pay_status" label="支付状态">
            <Select>
              {Object.keys(PayStatus).map(i => (
                <Option value={Number(i)} key={i}>
                  {PayStatus[i]}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="approval_status" label="审核状态">
            <Select>
              {Object.keys(ApprovalStatus).map(i => (
                <Option value={Number(i)} key={i}>
                  {ApprovalStatus[i]}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="notify_status" label="通知状态">
            <Select>
              {Object.keys(NotifyStatus).map(i => (
                <Option value={Number(i)} key={i}>
                  {NotifyStatus[i]}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="client_ip" label="IP">
            <Input />
          </Form.Item>
          <Form.Item name="failure_code" label="错误代码">
            <Input />
          </Form.Item>
          <Form.Item name="failure_msg" label="错误信息">
            <Input />
          </Form.Item>
          <Form.Item name="amount" label="订单金额">
            <InputNumber />
          </Form.Item>
          <Form.Item name="amount_paid" label="实际付款金额">
            <InputNumber />
          </Form.Item>
          <Form.Item name="bonus" label="赠送金额">
            <InputNumber />
          </Form.Item>
          <Form.Item name="currency" label="货币类型">
            <Select>
              {Object.keys(Currency).map(i => (
                <Option value={Number(i)} key={i}>
                  {Currency[i]}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};
export default AddEdit;
