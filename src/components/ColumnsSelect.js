import { Select } from "antd";
const { Option } = Select;

const ColumnsSelect = ({ columns, value, onChange }) => {
  const handleChange = value => {
    onChange(columns.filter(i => value.indexOf(i.dataIndex) > -1));
  };
  return (
    <>
      自订列表：
      <Select
        size="large"
        mode="multiple"
        value={value.map(i => i.dataIndex)}
        onChange={handleChange}
        style={{ minWidth: 240 }}
      >
        {columns.map(i => (
          <Option key={i.dataIndex} value={i.dataIndex}>
            {i.title}
          </Option>
        ))}
      </Select>
    </>
  );
};

export default ColumnsSelect;
