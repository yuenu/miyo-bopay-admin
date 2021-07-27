import { useEffect } from "react";
import { Modal, Form, InputNumber } from "antd";
import { formLayout, mode as Mode } from "@/utils/enum";
import { dateFormat } from "@/utils/format";
import Spin from "@/components/Spin";
import SearchSelect from "@/components/SearchSelect";
import { selectCard, getCards } from "@/store/slice/card";
import { useSelector } from "react-redux";
import { CurrencyHelpTextFormItemFactory } from "@/components/factory/FormFactory";

const AddEdit = ({ visible, mode, data, onOk, onCancel, loading }) => {
  const { list: cards } = useSelector(selectCard);

  const [form] = Form.useForm();
  const handleOk = async () => {
    form.validateFields().then(async formModel => {
      if (!formModel) return;
      await onOk({
        ...formModel,
        card_name: cards.find(i => i.id === formModel.card_id)?.name,
      });
    });
  };
  useEffect(() => {
    visible && mode === "edit" && form.setFieldsValue(data);
  });

  return (
    <Modal
      title={`${Mode[mode]}银行卡账户`}
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
      cancelText="取消"
      okText="送出"
      confirmLoading={loading}
    >
      <Spin spinning={loading}>
        <Form {...formLayout} form={form}>
          <Form.Item label="ID">{data.id}</Form.Item>
          <Form.Item
            name="card_id"
            label="银行卡ID"
            rules={[{ required: true, message: "请输入银行卡" }]}
          >
            <SearchSelect
              action={getCards}
              selector={selectCard}
              searchKey="name"
              val="id"
              label={i => `${i.id} ${i.name}`}
            />
          </Form.Item>
          <Form.Item label="总余额">{data.balance}</Form.Item>
          <CurrencyHelpTextFormItemFactory
            name="freezes"
            label="冻结金额"
            row={{ ...data, currency: 0 }}
            defaultValKey="freezes"
          />
          <Form.Item name="points" label="当前上分数">
            <InputNumber />
          </Form.Item>
          <Form.Item name="credits" label="信用分">
            <InputNumber />
          </Form.Item>
          <Form.Item label="创建时间">{dateFormat(data.created)}</Form.Item>
          <Form.Item label="更新时间">{dateFormat(data.updated)}</Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};
export default AddEdit;
