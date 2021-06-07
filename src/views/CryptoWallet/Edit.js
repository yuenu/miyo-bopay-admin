import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { PageHeader, Card, Form, Spin, Input } from "antd";
import { formLayout } from "@/utils/enum";
const Edit = () => {
  let { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  return (
    <Spin spinning={loading}>
      <PageHeader title="编辑钱包" />
      <Card>
        <Form {...formLayout}>
          <Form.Item label="钱包名" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="钱包所有者" name="owner">
            <Input />
          </Form.Item>
          <Form.Item label="收款地址" name="address">
            <Input />
          </Form.Item>
        </Form>
      </Card>
    </Spin>
  );
};

export default Edit;
