import { Select } from "antd";
import { useState } from "react";
const { Option } = Select;

const ColumnsSelect = ({ columns, value, onChange }) => {
  const [options, setOptions] = useState(columns);
  const handleChange = value => {
    onChange(columns.filter(i => value.indexOf(i.dataIndex) > -1));
  };
  const handleSearch = value => {
    const filterOptions = columns.filter(
      i => i.title.includes(value) || i.dataIndex.includes(value),
    );
    setOptions(filterOptions);
  };
  return (
    <>
      自订列表：
      <Select
        size="large"
        mode="multiple"
        filterOption={false}
        value={value.map(i => i.dataIndex)}
        onChange={handleChange}
        onSearch={handleSearch}
        style={{ minWidth: 240 }}
      >
        {options.map(i => (
          <Option key={i.dataIndex} value={i.dataIndex}>
            {i.title}
          </Option>
        ))}
      </Select>
    </>
  );
};

export default ColumnsSelect;
