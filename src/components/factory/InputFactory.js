import { Input, Select, Switch, Checkbox, DatePicker } from "antd";
const { Option } = Select;
const { RangePicker } = DatePicker;

const InputFactory = props => {
  const { type, options, isModule, ...rest } = props;
  const SelectC = () => {
    return (
      <Select {...rest} allowClear>
        {options &&
          Object.keys(options).map(i => (
            <Option value={isModule ? !!Number(i) : Number(i)} key={i}>
              {options[i]}
            </Option>
          ))}
      </Select>
    );
  };
  const types = {
    string: <Input {...rest} />,
    select: <SelectC />,
    switch: <Switch {...rest} />,
    checkbox: <Checkbox {...rest} />,
    rangeDate: <RangePicker {...rest} />,
  };
  return types[type] || types.string;
};
export default InputFactory;
