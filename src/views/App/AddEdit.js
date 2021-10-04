import { useEffect } from "react";
import { Modal, Form, Input, Switch, Select, InputNumber } from "antd";
import { formLayout, mode, AppStatus } from "@/utils/enum";
import { selectUser, getUsers } from "@/store/slice/user";
import SearchSelect from "@/components/SearchSelect";
import Spin from "@/components/Spin";
import { useSelector } from "react-redux";
const { Option } = Select;

const AddEdit = props => {
  const { list: users } = useSelector(selectUser);
  const [form] = Form.useForm();
  const handleOk = async () => {
    form.validateFields().then(async formModel => {
      if (!formModel) return;
      await props.onOk({
        ...formModel,
        developer_name: users.find(i => i.id === formModel.developer_id)?.name,
        fee: formModel.fee.toString(),
      });
      form.resetFields();
    });
  };
  useEffect(() => {
    props.visible && props.mode === "edit" && form.setFieldsValue(props.data);
  });

  return (
    <Modal
      destroyOnClose={true}
      title={`${mode[props.mode]}App`}
      visible={props.visible}
      onOk={handleOk}
      onCancel={props.onCancel}
      cancelText="取消"
      okText="送出"
      confirmLoading={props.loading}
    >
      <Spin spinning={props.loading}>
        <Form {...formLayout} form={form} initialValues={{ status: 0 }}>
          <Form.Item
            name="name"
            label="名称"
            rules={[{ required: true, message: "请输入名称" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="name_cn"
            label="名称CN"
            rules={[{ required: true, message: "请输入名称CN" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="developer_id" label="开发者ID">
            <SearchSelect
              action={getUsers}
              params={{ is_developer: 1 }}
              selector={selectUser}
              searchKey="name"
              val="id"
              label={i => `${i.id} ${i.name}`}
            />
          </Form.Item>
          <Form.Item
            name="callback_url"
            label="回调网址"
            rules={[{ required: true, message: "请输入回调网址" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="fee" label="商户费率">
            <InputNumber step="0.01" />
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
