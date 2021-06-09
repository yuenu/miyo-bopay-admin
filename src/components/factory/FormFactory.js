import { Card, Form, Row, Col, Space, Button } from "antd";
import InputFactory from "./InputFactory";
/**
 * fields
 * @param {object} fields
 * @param {object} fields.name - field key
 * @param {string} fields.name.type - input type [string, select, switch, checkbox, rangeDate]
 * @param {string} fields.name.lang - form label
 * @param {string} fields.name.options - when type === 'select', pass options.
 * @function handleSubmit  - 送出表單
 * @function handleReset - 清除表單
 */
export const SearchFormFactory = ({ fields, handleSubmit }) => {
  const [form] = Form.useForm();
  const handleReset = () => {
    form.resetFields();
  };
  const handleSearchClick = () => {
    handleSubmit(form.getFieldsValue());
  };
  return (
    <Card>
      <Form form={form}>
        <Row gutter={24}>
          {Object.keys(fields).map(i => {
            const mdCol = fields[i].type === "rangeDate" ? 16 : 8;
            return (
              <Col xs={24} md={mdCol} key={i}>
                <Form.Item name={i} label={fields[i].lang}>
                  <InputFactory
                    type={fields[i].type}
                    options={fields[i].options}
                  />
                </Form.Item>
              </Col>
            );
          })}
        </Row>
        <Row>
          <Col span={24} className="text-right">
            <Space size="small">
              <Button onClick={handleReset}>清除</Button>
              <Button type="primary" onClick={handleSearchClick}>
                搜尋
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};
