import { useEffect } from "react";
import { Modal, Form, Input } from "antd";
import { formLayout } from "@/utils/enum";
import Spin from "@/components/Spin";

const SetActiveModal = props => {
  const [form] = Form.useForm();
  const handleOk = async () => {
    await props.onOk({ ...form.getFieldsValue(), is_actvie: false });
    form.resetFields();
  };
  useEffect(() => {
    props.visible && form.setFieldsValue(props.data);
  });
  return (
    <Modal
      title={`禁用${props.title || ""}，是否继续？`}
      visible={props.visible}
      onOk={handleOk}
      onCancel={props.onCancel}
      cancelText="取消"
      okText="送出"
    >
      <Spin spinning={props.loading}>
        <Form {...formLayout} form={form}>
          <Form.Item name="note" label="备注">
            <Input />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

export default SetActiveModal;
