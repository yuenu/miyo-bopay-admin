import { Input, Select, Switch, Checkbox, DatePicker } from "antd";
import zhCN from "antd/es/date-picker/locale/zh_CN";
const { Option } = Select;
const { RangePicker } = DatePicker;

const InputFactory = props => {
  const { type, options, isBool, ...rest } = props;
  const SelectC = () => {
    return (
      <Select {...rest} allowClear placeholder="请选择">
        {options &&
          Object.keys(options).map(i => (
            <Option value={isBool ? !!Number(i) : Number(i)} key={i}>
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
    rangeDate: <RangePicker locale={zhCN} showTime={true} {...rest} />,
  };
  return types[type] || types.string;
};
export default InputFactory;
