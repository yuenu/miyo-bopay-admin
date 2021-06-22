import { useEffect } from "react";
import { Modal, Form, Input, Select } from "antd";
import { formLayout, mode, DeveloperStatus } from "@/utils/enum";
import Spin from "@/components/Spin";
import { selectUser, getUsers } from "@/store/slice/user";
import SearchSelect from "@/components/SearchSelect";

const { Option } = Select;

const AddEdit = props => {
  const [form] = Form.useForm();
  const handleOk = () => {
    form.validateFields().then(async formModel => {
      if (!formModel) return;
      await props.onOk(formModel);
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
            label="帐户ID"
            rules={[{ required: true, message: "请输入帐户ID" }]}
          >
            <SearchSelect
              action={getUsers}
              selector={selectUser}
              searchKey="username"
              val="id"
              label={i => `${i.id} ${i.username}`}
            />
          </Form.Item>
          <Form.Item name="username" label="帐户名称">
            <Input />
          </Form.Item>
          <Form.Item name="name" label="姓名">
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="电话">
            <Input />
          </Form.Item>
          <Form.Item name="email" label="email">
            <Input />
          </Form.Item>
          <Form.Item name="org" label="公司/组织">
            <Input />
          </Form.Item>
          <Form.Item name="info" label="公司简介">
            <Input />
          </Form.Item>
          <Form.Item name="site" label="公司官网">
            <Input />
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
