import { Input, Select, Switch, Checkbox, DatePicker } from "antd";
const { Option } = Select;
const { RangePicker } = DatePicker;

const InputFactory = props => {
  const { type, options } = props;
  const SelectC = () => (
    <Select>
      {options &&
        Object.keys(options).map(i => (
          <Option value={Number(i)} key={i}>
            {options[i]}
          </Option>
        ))}
    </Select>
  );
  const types = {
    string: <Input />,
    select: <SelectC />,
    switch: <Switch />,
    checkbox: <Checkbox />,
    rangeDate: <RangePicker />,
  };
  return types[type] || types.string;
};
export default InputFactory;
