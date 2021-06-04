import { Row, Col, Form, Input, Button, Space, Card, DatePicker } from "antd";
const { RangePicker } = DatePicker;

const Search = props => {
  const [form] = Form.useForm();
  const handleResetSearch = () => {
    form.resetFields();
  };
  const handleSubmit = () => {
    props.onOk(form.getFieldsValue());
  };
  return (
    <Card>
      <Form form={form}>
        <Row gutter={24}>
          <Col xs={24} md={8}>
            <Form.Item name="id" label="會員ID">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item name="name" label="會員姓名">
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="created" label="創建日期">
              <RangePicker />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24} className="text-right">
            <Space size="small">
              <Button onClick={handleResetSearch}>清除</Button>
              <Button type="primary" onClick={handleSubmit}>
                搜尋
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};
export default Search;
