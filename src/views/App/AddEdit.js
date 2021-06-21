import { useEffect } from "react";
import { Modal, Form, Input, Switch, InputNumber, Select } from "antd";
import { formLayout, mode, AppStatus } from "@/utils/enum";
import { filterOption } from "@/utils";
import Spin from "@/components/Spin";
import { selectDeveloper } from "@/store/slice/developer";
import { useSelector } from "react-redux";

const { Option } = Select;

const AddEdit = props => {
  const { list } = useSelector(selectDeveloper);
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
      title={`${mode[props.mode]}App`}
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
          <Form.Item name="name_cn" label="名称CN">
            <Input />
          </Form.Item>
          <Form.Item name="developer_id" label="开发者ID">
            <Select showSearch filterOption={filterOption}>
              {list.map(i => (
                <Option value={i.user_id} key={i.id} label={i.username}>
                  {i.user_id} {i.username}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="developer_name" label="开发者姓名">
            <Input />
          </Form.Item>
          <Form.Item name="callback_url" label="回调网址">
            <Input />
          </Form.Item>
          <Form.Item name="secret" label="secret">
            <Input />
          </Form.Item>
          <Form.Item name="info" label="info">
            <Input />
          </Form.Item>
          <Form.Item name="status" label="状态">
            <Select>
              {Object.keys(AppStatus).map(i => (
                <Option value={Number(i)} key={i}>
                  {AppStatus[i]}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="token" label="Token">
            <Input />
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
