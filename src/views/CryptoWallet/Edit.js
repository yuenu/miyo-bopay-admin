import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
import { Card, Form, Input, Space, Button, Select, Switch, Table } from "antd";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  selectCryptoWallet,
  getCryptoWallet,
  editCryptoWallet,
} from "@/store/slice/cryptoWallet";
import {
  selectCryptoAcct,
  getCryptoAccts,
  editCryptoAcct,
  addCryptoAcct,
} from "@/store/slice/cryptoAcct";
import { formLayout, Currency, Network } from "@/utils/enum";
import { priceFormat } from "@/utils/format";
import { useDetail } from "@/utils/hook";
import { useHistory } from "react-router-dom";
import Spin from "@/components/Spin";

const EditableContext = React.createContext(null);
const { Option } = Select;

const Edit = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let { id } = useParams();
  const [form] = Form.useForm();
  const { currentRow, loading, handleEdit } = useDetail(
    { action: getCryptoWallet, id },
    selectCryptoWallet,
  );
  useEffect(() => {
    form.setFieldsValue(currentRow);
  }, [currentRow, form]);

  const handleCancel = () => {
    history.push("/CryptoWallet");
  };
  const handleSubmit = () => {
    const formModel = form.getFieldsValue();
    handleEdit({ action: editCryptoWallet, ...currentRow, id, ...formModel });
  };

  const [listLoading, setListLoading] = useState(false);
  const { list } = useSelector(selectCryptoAcct);
  const handleGetList = useCallback(
    async (params = {}) => {
      setListLoading(true);
      await dispatch(getCryptoAccts({ wallet_id: id, ...params }));
      setListLoading(false);
    },
    [dispatch, id],
  );
  useEffect(() => {
    handleGetList();
  }, [handleGetList]);

  const columns = [
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
    },
    { title: "地址", dataIndex: "address" },
    { title: "备注", dataIndex: "note" },
    { title: "排序", dataIndex: "seq" },
  ];
  const columnsCell = columns.map(i => {
    return {
      ...i,
      onCell: record => ({ ...i, record, dataIndex: i.dataIndex }),
    };
  });

  const EditableRow = ({ index, ...props }) => {
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
    record,
    ...restProps
  }) => {
    const { form } = useContext(EditableContext);
    const inputRef = useRef(null);
    const save = async () => {
      try {
        const values = await form.validateFields();
        await editCryptoAcct({
          id: record.id,
          formModel: { ...values, wallet_id: currentRow.id, currency: 1 },
        });
      } catch (errInfo) {
        console.log("Save failed:", errInfo);
      }
    };
    useEffect(() => {
      form.setFieldsValue(record);
    });
    let childNode = children;
    childNode =
      dataIndex === "id" ? (
        <div>{record.id}</div>
      ) : dataIndex === "is_active" ? (
        <Form.Item name={dataIndex} valuePropName="checked" noStyle>
          <Switch ref={inputRef} onChange={save} />
        </Form.Item>
      ) : (
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
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      );
    return <td {...restProps}>{childNode}</td>;
  };
  const editComponents = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const [addForm] = Form.useForm();
  const AddCel = ({ title, children, dataIndex, record, ...restProps }) => {
    let childNode = children;
    childNode =
      dataIndex === "id" ? (
        <div>{record.id}</div>
      ) : dataIndex === "is_active" ? (
        <Form.Item name={dataIndex} valuePropName="checked" noStyle>
          <Switch />
        </Form.Item>
      ) : (
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
          <Input />
        </Form.Item>
      );
    return <td {...restProps}>{childNode}</td>;
  };
  const addComponents = {
    body: {
      cell: AddCel,
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
    <Space direction="vertical" className="w-100">
      <h2>编辑钱包</h2>
      <Card>
        <Spin spinning={loading}>
          <Form form={form} {...formLayout}>
            <Form.Item label="钱包名" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="余额">
              {priceFormat({
                val: currentRow.balance,
                currency: currentRow.currency,
              })}
            </Form.Item>
            <Form.Item label="钱包所有者" name="owner">
              <Input />
            </Form.Item>
            <Form.Item label="收款地址" name="address">
              <Input />
            </Form.Item>
            <Form.Item label="区块链" name="network">
              <Select>
                {Object.keys(Network).map(i => (
                  <Option value={Number(i)} key={i}>
                    {Network[i]}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="货币" name="currency">
              <Select>
                {Object.keys(Currency).map(i => (
                  <Option value={Number(i)} key={i}>
                    {Currency[i]}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="启用" name="is_active" valuePropName="checked">
              <Switch />
            </Form.Item>
            <div className="text-right">
              <Space size="small">
                <Button type="primary" onClick={handleSubmit}>
                  保存修改
                </Button>
                <Button onClick={handleCancel}>取消</Button>
              </Space>
            </div>
          </Form>
        </Spin>
      </Card>
      <Card title="加密钱包收款帐号" v-loading="true">
        {list.length > 0 && (
          <Table
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
    </Space>
  );
};

export default Edit;
