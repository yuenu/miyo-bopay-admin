import React, { useState } from "react";
import { Table, Button, Form, Pagination, Space } from "antd";
import InputFactory from "./InputFactory";

const valuePropName = type =>
  type === "checkbox" || type === "switch" ? "checked" : "value";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  options,
  record,
  index,
  children,
  loading,
  ...restProps
}) => {
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          valuePropName={valuePropName(inputType)}
        >
          <InputFactory type={inputType} disabled={loading} options={options} />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

/**
 * fields
 * @param {Array} columns
 * @param {String} columns.title
 * @param {String} columns.dataIndex
 * @param {Boolean} columns.editable
 * @param {Node} columns.render
 * @param {String} columns.inputType - [string, select, switch]
 * @param {Object} columns.options - if inputType === 'select', using options
 */
const EditableTable = ({
  columns,
  onRowEditSubmit,
  meta,
  onChange,
  onShowSizeChange,
  ...props
}) => {
  const [form] = Form.useForm();
  const [currentEditRow, setCurrentEditRow] = useState("");
  const [loading, setLoading] = useState(false);
  const isEditing = record => record.id === currentEditRow.id;

  const handleEditClick = record => {
    form.setFieldsValue(record);
    setCurrentEditRow(record);
  };
  const handleSubmit = async () => {
    setLoading(true);
    const params = {
      ...currentEditRow,
      ...form.getFieldsValue(),
    };
    await onRowEditSubmit(params);
    setCurrentEditRow("");
    setLoading(false);
  };
  const handleCancel = () => {
    form.resetFields();
    setCurrentEditRow("record");
  };

  const editColumns = [
    ...columns.filter(i => i.dataIndex !== "action"),
    ...[
      {
        title: "快速编辑",
        dataIndex: " edit",
        render: (val, record) => {
          const editable = isEditing(record);
          return editable ? (
            <>
              <Button
                size="small"
                type="link"
                onClick={handleSubmit}
                loading={loading}
              >
                储存
              </Button>
              <Button
                size="small"
                type="link"
                onClick={handleCancel}
                loading={loading}
              >
                取消
              </Button>
            </>
          ) : (
            <Button
              size="small"
              type="link"
              onClick={() => handleEditClick(record)}
            >
              编辑
            </Button>
          );
        },
      },
    ],
    ...columns.filter(i => i.dataIndex === "action"),
  ];
  const mergedColumns = editColumns.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: record => ({
        record,
        inputType: col.inputType,
        options: col.options,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        loading,
      }),
    };
  });
  const components = {
    body: {
      cell: EditableCell,
    },
  };
  return (
    <Space direction="vertical" className="w-100">
      <Form form={form} component={false}>
        <Table
          size="small"
          components={components}
          columns={mergedColumns}
          rowKey="id"
          scroll={{ x: "auto" }}
          pagination={false}
          {...props}
        />
      </Form>
      <Pagination
        className="text-right"
        showSizeChanger
        onShowSizeChange={onShowSizeChange}
        onChange={onChange}
        {...meta}
      />
    </Space>
  );
};

const NormalTable = ({ onShowSizeChange, onChange, meta, ...props }) => {
  return (
    <Space direction="vertical" className="w-100">
      <Table
        size="small"
        rowKey="id"
        scroll={{ x: "auto" }}
        pagination={false}
        {...props}
      />
      <Pagination
        className="text-right"
        showSizeChanger
        onShowSizeChange={onShowSizeChange}
        onChange={onChange}
        {...meta}
      />
    </Space>
  );
};
export { EditableTable, NormalTable };
