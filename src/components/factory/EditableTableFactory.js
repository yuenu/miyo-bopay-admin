import React, { useState } from "react";
import { Table, Button, Form } from "antd";
import InputFactory from "./InputFactory";

const valuePropName = type =>
  type === "checkbox" || type === "switch" ? "checked" : "value";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
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
          <InputFactory type={inputType} disabled={loading} />
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
 */
const EditableTable = ({ columns, onRowEditSubmit, ...props }) => {
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
              <Button type="link" onClick={handleSubmit} loading={loading}>
                储存
              </Button>
              <Button type="link" onClick={handleCancel} loading={loading}>
                取消
              </Button>
            </>
          ) : (
            <Button type="link" onClick={() => handleEditClick(record)}>
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
    <Form form={form} component={false}>
      <Table
        components={components}
        columns={mergedColumns}
        rowKey="id"
        scroll={{ x: "auto" }}
        {...props}
      />
    </Form>
  );
};

export default EditableTable;
