import React, { useState, useEffect } from "react";
import { Card, Form, Input, Button, Switch, Table, Pagination } from "antd";
import {
  sortableContainer,
  sortableElement,
  sortableHandle,
} from "react-sortable-hoc";
import { MenuOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { editCryptoAcct, addCryptoAcct } from "@/store/slice/cryptoAcct";
import { selectCryptoWallet } from "@/store/slice/cryptoWallet";
import { EditableCell } from "@/components/factory/TableFactory";
import { Currency } from "@/utils/enum";
import arrayMove from "array-move";
const DragHandle = sortableHandle(() => (
  <MenuOutlined style={{ cursor: "grab", color: "#999" }} />
));

const SortableItem = sortableElement(props => <tr {...props} />);
const SortableContainer = sortableContainer(props => <tbody {...props} />);
const EditAcctList = ({
  id,
  loading,
  list,
  meta,
  handleGetList,
  handleChangePage,
}) => {
  const { currentRow } = useSelector(selectCryptoWallet);

  //edit
  const [form] = Form.useForm();
  const [currentEditRow, setCurrentEditRow] = useState(null);
  const [editLoading, setEditLoading] = useState(false);
  const isEditing = record => record.id === currentEditRow?.id;
  const handleEditClick = record => {
    form.setFieldsValue(record);
    setCurrentEditRow(record);
  };
  const handleSubmit = async () => {
    setEditLoading(true);
    const params = {
      ...currentEditRow,
      ...form.getFieldsValue(),
    };
    await editCryptoAcct({ id: params.id, formModel: { ...params } });
    setCurrentEditRow(null);
    handleGetList();
    setEditLoading(false);
  };
  const handleCancel = () => {
    form.resetFields();
    setCurrentEditRow(null);
  };
  const handleChangeIsActive = async (checked, record) => {
    setEditLoading(true);
    const params = {
      id: record.id,
      formModel: {
        ...record,
        is_active: checked,
      },
    };
    await editCryptoAcct(params);
    handleGetList();
    setEditLoading(false);
  };

  // sort
  const handleChangeSeq = async newData => {
    const funcArr = [];
    newData.forEach(i => {
      const oldSeq = list.find(j => j.id === i.id).seq;
      oldSeq !== i.seq &&
        funcArr.push(
          editCryptoAcct({
            id: i.id,
            formModel: { ...i },
          }),
        );
    });
    await Promise.all(funcArr);
    handleGetList();
  };
  const onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex) {
      const newData = arrayMove([...list], oldIndex, newIndex)
        .filter(el => !!el)
        .map((i, index) => ({ ...i, seq: index }));
      handleChangeSeq(newData);
    }
  };
  const DraggableContainer = props => (
    <SortableContainer
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={onSortEnd}
      {...props}
    />
  );
  const DraggableBodyRow = ({ className, style, ...restProps }) => {
    const index = list.findIndex(x => x.id === restProps["data-row-key"]);
    return <SortableItem index={index} {...restProps} />;
  };

  const columns = (mode = "edit") => [
    {
      title: "Sort",
      dataIndex: "sort",
      width: 65,
      render: val => <DragHandle />,
    },
    {
      title: "ID",
      dataIndex: "id",
      width: 60,
    },
    {
      title: "序号",
      dataIndex: "w",
      width: 80,
    },
    {
      title: "货币",
      dataIndex: "currency",
      render: val =>
        (mode === "edit" ? Currency[val] : Currency[currentRow.currency]) || "",
      width: 110,
    },
    {
      title: "启用",
      dataIndex: "is_active",
      editable: true,
      inputType: "switch",
      render: (val, record) => (
        <Switch
          checked={val}
          onChange={checked => handleChangeIsActive(checked, record)}
        />
      ),
    },
    {
      title: "地址",
      dataIndex: "address",
      editable: true,
      inputType: "string",
    },
    { title: "备注", dataIndex: "note", editable: true, inputType: "string" },
    {
      title: "快速编辑",
      dataIndex: " edit",
      render: (val, record) => {
        const editable = isEditing(record);
        return mode === "edit" ? (
          editable ? (
            <>
              <Button
                size="small"
                type="link"
                onClick={handleSubmit}
                loading={editLoading}
              >
                储存
              </Button>
              <Button
                size="small"
                type="link"
                onClick={handleCancel}
                loading={editLoading}
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
          )
        ) : (
          <Button type="primary" size="small" onClick={handleAddClick}>
            新增地址
          </Button>
        );
      },
    },
  ];
  const formatEditableColumns = cell => {
    if (!cell.editable) {
      return cell;
    }
    return {
      ...cell,
      onCell: record => ({
        ...cell,
        record,
        wallet_id: Number(id),
        editing: isEditing(record),
        loading: editLoading,
      }),
    };
  };
  const editColumnsCell = columns("edit").map(formatEditableColumns);
  const addColumnsCell = columns("add").map(formatEditableColumns);

  const editComponents = {
    body: {
      wrapper: DraggableContainer,
      row: DraggableBodyRow,
      cell: EditableCell,
    },
  };
  const [addForm] = Form.useForm();
  const AddCell = ({
    title,
    children,
    dataIndex,
    editable,
    record,
    render,
    inputType,
    editing,
    loading,
    ...restProps
  }) => {
    let childNode;
    childNode = editable ? (
      <Form.Item
        name={dataIndex}
        rules={
          dataIndex === "address"
            ? [
                {
                  required: true,
                },
              ]
            : null
        }
        noStyle
      >
        {dataIndex === "is_active" ? (
          <Form.Item name={dataIndex} valuePropName="checked" noStyle>
            <Switch id={`addaddr_${dataIndex}`} />
          </Form.Item>
        ) : (
          <Input id={`addaddr_${dataIndex}`} />
        )}
      </Form.Item>
    ) : (
      children
    );
    return <td {...restProps}>{childNode}</td>;
  };
  const addComponents = {
    body: {
      cell: AddCell,
    },
  };
  const defaultAddFormModel = {
    id: null,
    w: 0,
    is_active: true,
    address: null,
    note: null,
    seq: 0,
  };
  useEffect(() => {
    addForm.setFieldsValue(defaultAddFormModel);
  });
  const handleAddClick = async () => {
    const formModel = addForm.getFieldsValue();
    const params = {
      ...formModel,
      wallet_id: Number(id),
      currency: currentRow.currency,
    };
    await addCryptoAcct(params);
    addForm.resetFields();
    handleGetList();
  };
  return (
    <Card title="加密钱包收款帐号" v-loading="true">
      {list.length > 0 && (
        <Form form={form} component={false}>
          <Table
            size="small"
            columns={editColumnsCell}
            dataSource={list}
            rowKey="id"
            components={editComponents}
            pagination={false}
            loading={loading}
          />
        </Form>
      )}
      <Form form={addForm} component={false}>
        <Table
          size="small"
          columns={addColumnsCell}
          showHeader={list.length === 0}
          dataSource={[defaultAddFormModel]}
          rowKey="id"
          components={addComponents}
          pagination={false}
        />
      </Form>
      <Pagination
        className="text-right mt-1"
        showSizeChanger
        onShowSizeChange={handleChangePage}
        onChange={handleChangePage}
        {...meta}
      />
    </Card>
  );
};

export default EditAcctList;
