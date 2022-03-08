import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal, Form, Select, InputNumber, Input } from "antd";
import { formLayout, mode, Currency } from "@/utils/enum";
import Spin from "@/components/Spin";
import { selectApp, getApps } from "@/store/slice/app";
import SearchSelect from "@/components/SearchSelect";

const { Option } = Select;

const AddEdit = props => {
  const { list: appList } = useSelector(selectApp);

  const [form] = Form.useForm();
  const handleOk = () => {
    form.validateFields().then(async formModel => {
      if (!formModel) return;
      const appData = appList.find(i => i.id === formModel.app_id) || {};
      const params = {
        ...formModel,
        ...(props.mode === "add" && {
          app_name: appData.name,
          userid: appData.developer_id ? String(appData.developer_id) : null,
        }),
      };
      await props.onOk(params);
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
          {props.mode === "add" && (
            <>
              <Form.Item
                name="app_id"
                label="商户ID"
                rules={[{ required: true, message: "请选择商户" }]}
              >
                <SearchSelect
                  action={getApps}
                  selector={selectApp}
                  searchKey="name"
                  val="id"
                  label={i => `${i.id} ${i.name}`}
                />
              </Form.Item>
              <Form.Item name="currency" label="货币">
                <Select>
                  {Object.keys(Currency).map(i => (
                    <Option value={Number(i)} key={i}>
                      {Currency[i]}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="balance" label="余额">
                <InputNumber />
              </Form.Item>
            </>
          )}
          <Form.Item
            hidden={props.mode === "add"}
            name="app_name"
            label="商户名称"
          >
            <Input type={props.mode === "add" ? "hidden" : "input"} />
          </Form.Item>
          <Form.Item name="agent_fee" label="商户帐户支付代理手续费">
            <InputNumber />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};
export default AddEdit;
