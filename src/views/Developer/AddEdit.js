import { useEffect } from "react";
import { Modal, Form, Input, Select } from "antd";
import { formLayout, mode, DeveloperStatus } from "@/utils/enum";
import Spin from "@/components/Spin";
import { selectUser, getUsers } from "@/store/slice/user";
import SearchSelect from "@/components/SearchSelect";
import { useSelector } from "react-redux";

const { Option } = Select;

const AddEdit = props => {
  const { list: users } = useSelector(selectUser);
  const [form] = Form.useForm();
  const handleOk = () => {
    form.validateFields().then(async formModel => {
      if (!formModel) return;
      await props.onOk({
        ...formModel,
        username: users.find(i => i.id === formModel.user_id).username,
      });
      form.resetFields();
    });
  };
  useEffect(() => {
    props.visible && props.mode === "edit" && form.setFieldsValue(props.data);
  });
  return (
    <Modal
      title={`${mode[props.mode]}开发者`}
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
            name="user_id"
            label="用户"
            rules={[{ required: true, message: "请选择用户" }]}
          >
            <SearchSelect
              action={getUsers}
              selector={selectUser}
              searchKey="username"
              val="id"
              label={i => `${i.id} ${i.username}`}
            />
          </Form.Item>
          <Form.Item
            name="name"
            label="商户名"
            rules={[{ required: true, message: "请输入商户名" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="电话">
            <Input />
          </Form.Item>
          <Form.Item name="email" label="email">
            <Input />
          </Form.Item>
          <Form.Item
            name="org"
            label="公司/组织"
            rules={[{ required: true, message: "请输入公司/组织" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="info" label="公司简介">
            <Input />
          </Form.Item>
          <Form.Item name="site" label="公司官网">
            <Input addonBefore="https://" />
          </Form.Item>
          <Form.Item name="status" label="审核状态">
            <Select>
              {Object.keys(DeveloperStatus).map(i => (
                <Option value={Number(i)} key={i}>
                  {DeveloperStatus[i]}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="telegram" label="telegram">
            <Input />
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
