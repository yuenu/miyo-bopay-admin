import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCryptoWallet,
  getCryptoWallet,
} from "@/store/slice/cryptoWallet";
import { Card, Form, Spin, Input, Space, Button, Select, Switch } from "antd";

import { formLayout } from "@/utils/enum";
const { Option } = Select;
const Edit = () => {
  const [form] = Form.useForm();
  let { id } = useParams();

  const { currentRow } = useSelector(selectCryptoWallet);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleGetDetail = useCallback(async () => {
    setLoading(true);
    await dispatch(getCryptoWallet(id));
    setLoading(false);
  }, [dispatch, id]);
  useEffect(() => {
    handleGetDetail();
  }, [handleGetDetail]);
  useEffect(() => {
    form.setFieldsValue(currentRow);
  }, [currentRow, form]);

  return (
    <Spin spinning={loading}>
      <Space direction="vertical" className="w-100">
        <h2>编辑钱包</h2>
        <Card>
          <Form form={form} {...formLayout}>
            <Form.Item label="钱包名" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="钱包所有者" name="owner">
              <Input />
            </Form.Item>
            <Form.Item label="收款地址" name="address">
              <Input />
            </Form.Item>
            <Form.Item label="区块链" name="network">
              <Select>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
              </Select>
            </Form.Item>
            <Form.Item label="启用" name="is_active" valuePropName="checked">
              <Switch />
            </Form.Item>
            <div className="text-right">
              <Space size="small">
                <Button type="primary">保存修改</Button>
                <Button>取消</Button>
              </Space>
            </div>
          </Form>
        </Card>
        <Card title="加密钱包收款帐号"></Card>
      </Space>
    </Spin>
  );
};

export default Edit;
