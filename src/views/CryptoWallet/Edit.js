import React, { useState, useEffect, useContext, useRef } from "react";
import {
  Card,
  Form,
  Spin,
  Input,
  Space,
  Button,
  Select,
  Switch,
  Table,
} from "antd";
import { useParams } from "react-router-dom";
import {
  selectCryptoWallet,
  getCryptoWallet,
  editCryptoWallet,
} from "@/store/slice/cryptoWallet";
import { formLayout, Currency } from "@/utils/enum";
import { priceFormat } from "@/utils/format";
import { useDetail } from "@/utils/hook";
import { useHistory } from "react-router-dom";

const EditableContext = React.createContext(null);
const { Option } = Select;

const Edit = () => {
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
    handleEdit({ action: editCryptoWallet, id, ...formModel });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: 60,
    },
    {
      title: "序号",
      dataIndex: "no",
    },
    {
      title: "启用",
      dataIndex: "is_active",
    },
    { title: "地址", dataIndex: "address" },
    { title: "备注", dataIndex: "note" },
    { title: "排序", dataIndex: "order" },
  ];
  const columnsCell = columns.map(i => {
    return {
      ...i,
      onCell: record => ({ ...i, record, dataIndex: i.dataIndex }),
    };
  });
  const [addrs, setAddrs] = useState([
    { id: 10, no: 100, is_active: true, address: "add", note: "", order: 0 },
    { id: 11, no: 110, is_active: false, address: "add", note: "", order: 1 },
  ]);

  const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
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
    const form = useContext(EditableContext);
    const inputRef = useRef(null);
    const save = async () => {
      try {
        const values = await form.validateFields();
        console.log(values);
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
          <Switch ref={inputRef} />
        </Form.Item>
      ) : (
        <Form.Item
          name={dataIndex}
          rules={
            dataIndex === "no" || dataIndex === "address"
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
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const handleAddAddrClick = () => {
    setAddrs([
      ...addrs,
      {
        id: null,
        no: null,
        is_active: false,
        address: null,
        note: "",
        order: null,
      },
    ]);
  };
  return (
    <Spin spinning={loading}>
      <Space direction="vertical" className="w-100">
        <h2>编辑钱包</h2>
        <Card>
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
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
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
        </Card>
        <Card title="加密钱包收款帐号">
          <Table
            columns={columnsCell}
            dataSource={addrs}
            rowKey="id"
            components={components}
            pagination={false}
          />
          <div className="text-right mt-1">
            <Button type="primary" onClick={handleAddAddrClick}>
              新增地址
            </Button>
          </div>
        </Card>
      </Space>
    </Spin>
  );
};

export default Edit;
