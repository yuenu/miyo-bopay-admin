import React, { useState } from "react";
import { Table, Button, Form, Pagination, Space } from "antd";
import InputFactory from "./InputFactory";
import { useColumnsSelect } from "@/utils/hook";
import ColumnsSelect from "@/components/ColumnsSelect";
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
  render,
  editable,
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
  onRowEditSubmit,
  meta,
  onChangePage,
  onShowSizeChange,
  allColumns,
  defaultColumns,
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
  const { selectedColumns, handleSelectedColumnsChange } = useColumnsSelect({
    columns: allColumns,
    defaultColumns,
  });
  const editColumns = [
    ...selectedColumns.filter(i => i.dataIndex !== "action"),
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
    ...selectedColumns.filter(i => i.dataIndex === "action"),
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
      <ColumnsSelect
        columns={allColumns}
        value={selectedColumns}
        onChange={handleSelectedColumnsChange}
      />
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
        onChange={onChangePage}
        {...meta}
      />
    </Space>
  );
};

const NormalTable = ({
  onShowSizeChange,
  onChangePage,
  meta,
  allColumns,
  defaultColumns,
  statisticsColumns,
  ...props
}) => {
  const { selectedColumns, handleSelectedColumnsChange } = useColumnsSelect({
    columns: allColumns,
    defaultColumns,
  });
  const handleRenderSummery = pageData => {
    let statistics = statisticsColumns.reduce((a, v) => {
      return { ...a, [v.dataIndex]: 0 };
    }, {});
    pageData.forEach(i => {
      statisticsColumns.forEach(j => {
        statistics[j.dataIndex] += i[j.dataIndex];
      });
    });
    return (
      <Table.Summary.Row>
        {selectedColumns.map((i, index) => {
          return (
            <Table.Summary.Cell index={i.dataIndex} key={i.dataIndex}>
              {index === 0
                ? "总计"
                : statistics[i.dataIndex] !== undefined
                ? statistics[i.dataIndex]
                : ""}
            </Table.Summary.Cell>
          );
        })}
      </Table.Summary.Row>
    );
  };
  return (
    <Space direction="vertical" className="w-100">
      <ColumnsSelect
        columns={allColumns}
        value={selectedColumns}
        onChange={handleSelectedColumnsChange}
      />
      <Table
        size="small"
        rowKey="id"
        scroll={{ x: "auto" }}
        pagination={false}
        columns={selectedColumns}
        summary={pageData =>
          statisticsColumns && handleRenderSummery(pageData, statisticsColumns)
        }
        {...props}
      />
      <Pagination
        className="text-right"
        showSizeChanger
        onShowSizeChange={onShowSizeChange}
        onChange={onChangePage}
        {...meta}
      />
    </Space>
  );
};
export { EditableTable, NormalTable, EditableCell };
