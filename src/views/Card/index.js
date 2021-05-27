import { Row, Col, Form, Input, Button, Space, Table, Card } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const CardC = () => {
  const [form] = Form.useForm();

  return (
    <Space direction="vertical" size="middle" className="w-100">
      <Card>
        <Form form={form}>
          <Row gutter={24}>
            <Col xs={24} md={8}>
              <Form.Item label="會員ID">
                <Input placeholder="input placeholder" />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item label="會員姓名">
                <Input placeholder="input placeholder" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24} className="text-right">
              <Space size="small">
                <Button>Clear</Button>
                <Button type="primary">Submit</Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Card>
      <Button type="primary" icon={<PlusOutlined />}>
        添加
      </Button>
      <Table columns={[]} dataSource={[]} rowKey="id" />
    </Space>
  );
};
export default CardC;
