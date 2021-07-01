import { Select } from "antd";
import { useState } from "react";
import { useLocation } from "react-router-dom";
const { Option } = Select;

const ColumnsSelect = ({ columns, value, onChange }) => {
  const { pathname } = useLocation();

  const [options, setOptions] = useState(columns);
  const handleChange = value => {
    onChange({
      columns: columns.filter(i => value.indexOf(i.dataIndex) > -1),
      pathname,
    });
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
        onBlur={() => setOptions(columns)}
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
