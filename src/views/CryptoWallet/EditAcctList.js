import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
  createContext,
} from "react";
import { Card, Form, Input, Button, Switch, Table } from "antd";
import {
  sortableContainer,
  sortableElement,
  sortableHandle,
} from "react-sortable-hoc";
import { MenuOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCryptoAcct,
  getCryptoAccts,
  editCryptoAcct,
  addCryptoAcct,
} from "@/store/slice/cryptoAcct";
import arrayMove from "array-move";
const DragHandle = sortableHandle(() => (
  <MenuOutlined style={{ cursor: "grab", color: "#999" }} />
));

const EditableContext = createContext(null);

const EditableRow = props => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={{ form }}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
  title,
  children,
  dataIndex,
  editable,
  record,
  wallet_id,
  ...restProps
}) => {
  const { form } = useContext(EditableContext);
  const inputRef = useRef(null);
  const save = async () => {
    try {
      const values = await form.validateFields();
      await editCryptoAcct({
        id: record.id,
        formModel: { ...values, wallet_id, currency: 1 },
      });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };
  useEffect(() => {
    form.setFieldsValue(record);
  });
  let childNode = children;
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
          <Switch
            ref={inputRef}
            onChange={save}
            id={`addr_${dataIndex}_${record.id}`}
          />
        </Form.Item>
      ) : (
        <Input
          ref={inputRef}
          onPressEnter={save}
          onBlur={save}
          id={`addr_${dataIndex}_${record.id}`}
        />
      )}
    </Form.Item>
  ) : dataIndex === "sort" ? (
    <DragHandle />
  ) : (
    children
  );
  return <td {...restProps}>{childNode}</td>;
};
const SortableItem = sortableElement(props => <EditableRow {...props} />);
const SortableContainer = sortableContainer(props => <tbody {...props} />);
const EditAcctList = ({ id }) => {
  const dispatch = useDispatch();
  const [listLoading, setListLoading] = useState(false);
  const { list } = useSelector(selectCryptoAcct);
  const handleGetList = useCallback(
    async (params = {}) => {
      setListLoading(true);
      await dispatch(getCryptoAccts({ wallet_id: Number(id), ...params }));
      setListLoading(false);
    },
    [dispatch, id],
  );
  useEffect(() => {
    handleGetList();
  }, [handleGetList]);

  const handleChangeSeq = newData => {
    newData.forEach(async i => {
      const oldSeq = list.find(j => j.id === i.id).seq;
      oldSeq !== i.seq &&
        (await editCryptoAcct({
          id: i.id,
          formModel: { ...i },
        }));
    });
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
  const columns = [
    {
      title: "Sort",
      dataIndex: "sort",
      width: 65,
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
      title: "启用",
      dataIndex: "is_active",
      editable: true,
    },
    { title: "地址", dataIndex: "address", editable: true },
    { title: "备注", dataIndex: "note", editable: true },
  ];
  const columnsCell = columns.map(i => {
    return {
      ...i,
      onCell: record => ({
        ...i,
        record,
        dataIndex: i.dataIndex,
        editable: i.editable,
        wallet_id: Number(id),
      }),
    };
  });

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
    const params = { ...formModel, wallet_id: Number(id), currency: 1 };
    await addCryptoAcct(params);
    addForm.resetFields();
    handleGetList();
  };
  return (
    <Card title="加密钱包收款帐号" v-loading="true">
      {list.length > 0 && (
        <Table
          size="small"
          columns={columnsCell}
          dataSource={list}
          rowKey="id"
          components={editComponents}
          pagination={false}
          loading={listLoading}
        />
      )}
      <Form form={addForm} component={false}>
        <Table
          size="small"
          columns={columnsCell}
          showHeader={list.length === 0}
          dataSource={[defaultAddFormModel]}
          rowKey="id"
          components={addComponents}
          pagination={false}
        />
      </Form>
      <div className="text-right mt-1">
        <Button type="primary" onClick={handleAddClick}>
          新增地址
        </Button>
      </div>
    </Card>
  );
};

export default EditAcctList;
