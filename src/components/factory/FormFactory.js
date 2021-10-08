import React, { useCallback, useEffect, useState } from "react";
import { Card, Form, Row, Col, Space, Button, InputNumber } from "antd";
import InputFactory from "./InputFactory";
import { formLayout } from "@/utils/enum";
import { searchFieldsFormat, priceFormat } from "@/utils/format";
import { useSearchCache } from "@/utils/hook";
import { useLocation } from "react-router-dom";

/**
 * fields
 * @param {object} fields
 * @param {object} fields.name - field key
 * @param {string} fields.name.type - input type [string, select, switch, checkbox, rangeDate]
 * @param {string} fields.name.label - form label
 * @param {string} fields.name.options - when type === 'select', pass options.
 * @function handleSubmit  - 送出表單
 */
export const SearchFormFactory = ({ fields, handleSubmit }) => {
  const [form] = Form.useForm();
  const handleReset = () => {
    form.resetFields();
    handleResetSearchCache({ pathname });
  };
  const { pathname } = useLocation();
  const { handleGetSearchCache, handleSetSearchCache, handleResetSearchCache } =
    useSearchCache();
  const handleSearchClick = useCallback(() => {
    const formModel = form.getFieldsValue();
    Object.keys(formModel).forEach(i => {
      formModel[i] === undefined && delete formModel[i];
    });
    const params = searchFieldsFormat({ fields, formModel });
    handleSubmit(params);
    handleSetSearchCache({ pathname, formModel: params });
  }, [fields, form, handleSetSearchCache, handleSubmit, pathname]);
  useEffect(() => {
    if (handleGetSearchCache()[pathname]) {
      form.setFieldsValue({ ...handleGetSearchCache()[pathname] });
    }
  });
  const valuePropName = type =>
    type === "checkbox" || type === "switch" ? "checked" : "value";
  return (
    <Card size="small">
      <Form form={form} {...formLayout}>
        <Row gutter={24}>
          {Object.keys(fields).map(i => {
            const inputFactoryProps = fields[i];
            return (
              <Col xs={24} md={12} xl={8} key={i}>
                <Form.Item
                  name={i}
                  label={fields[i].label}
                  valuePropName={valuePropName(fields[i].type)}
                >
                  <InputFactory
                    {...inputFactoryProps}
                    id={`search_${fields[i].label}`}
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
                搜寻
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export const CurrencyHelpTextFormItemFactory = ({
  name,
  defaultValKey,
  label,
  row,
  ...rest
}) => {
  const [value, setValue] = useState(null);
  const helpText = useCallback(() => {
    return `数量：${priceFormat({
      val: value || row[defaultValKey] || row[name] || 0,
      currency: row.currency,
    })}`;
    // eslint-disable-next-line
  }, [row.id, value]);
  const handleOnChange = val => {
    setValue(val);
    return val;
  };
  return (
    <Form.Item
      {...rest}
      name={name}
      label={label}
      validateStatus="warning"
      help={helpText()}
      getValueFromEvent={handleOnChange}
    >
      <InputNumber />
    </Form.Item>
  );
};
