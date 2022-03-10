import { useEffect } from "react";
import { Modal, Form, Input, Switch, InputNumber } from "antd";
import { formLayout, mode as Mode } from "@/utils/enum";
import { selectUser, getUsers } from "@/store/slice/user";
import SearchSelect from "@/components/SearchSelect";
import Spin from "@/components/Spin";
import { useSelector } from "react-redux";

const AddEdit = ({
  visible,
  mode,
  initData = {},
  data,
  onOk,
  onCancel,
  loading,
}) => {
  const { list: users } = useSelector(selectUser);
  const [form] = Form.useForm();
  const handleOk = async () => {
    form.validateFields().then(async formModel => {
      if (!formModel) return;
      await onOk({
        ...formModel,
        username: users.find(i => i.id === formModel.user_id)?.name,
      });
      form.resetFields();
    });
  };

  useEffect(() => {
    if (visible) {
      mode === "add" && form.setFieldsValue(initData);
      mode === "edit" && form.setFieldsValue(data);
    }
  });

  return (
    <Modal
      destroyOnClose={true}
      title={`${Mode[mode]}代理`}
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
      cancelText="取消"
      okText="送出"
      confirmLoading={loading}
    >
      <Spin spinning={loading}>
        <Form {...formLayout} form={form}>
          {mode === "edit" && (
            <>
              <Form.Item label="ID">{data.id}</Form.Item>
              <Form.Item label="用户ID">{data.user_id}</Form.Item>
            </>
          )}
          {mode === "add" && (
            <>
              <Form.Item name="upper_layer_id" label="上級代理">
                <SearchSelect
                  action={getUsers}
                  selector={selectUser}
                  searchKey="name"
                  val="id"
                  label={i => `${i.id} ${i.name}`}
                />
              </Form.Item>
              <Form.Item
                name="user_id"
                label="用户ID"
                rules={[{ required: true, message: "请输入用户ID" }]}
              >
                <SearchSelect
                  action={getUsers}
                  selector={selectUser}
                  searchKey="name"
                  val="id"
                  label={i => `${i.id} ${i.name}`}
                />
              </Form.Item>
            </>
          )}

          <Form.Item
            name="name"
            label="姓名"
            rules={[{ required: true, message: "请输入姓名" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="recharge_rate" label="代收费率">
            <InputNumber step="1" />
          </Form.Item>
          <Form.Item name="withdraw_rate" label="代付费率">
            <InputNumber step="1" />
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
