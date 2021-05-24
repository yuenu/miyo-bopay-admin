import { Card } from "antd";
import { Row, Col, Form, Input, Button, DatePicker, Space, Table } from "antd";
const { RangePicker } = DatePicker;

const Employee = () => {
  const [form] = Form.useForm();
  const columns = [
    { title: "Id", dataIndex: "id" },
    { title: "Name", dataIndex: "name" },
  ];
  const data = [
    { name: "JEsss", id: 1 },
    { name: "JEsss", id: 2 },
  ];
  return (
    <>
      <Card className="mb-1">
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
            <Col span={24}>
              <Form.Item label="創建日期">
                <RangePicker />
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
      <Table columns={columns} dataSource={data} rowKey="id" />
    </>
  );
};
export default Employee;
