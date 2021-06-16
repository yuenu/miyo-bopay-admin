import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
import { Card, Form, Input, Space, Button, Select, Switch, Table } from "antd";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  selectCryptoWallet,
  getCryptoWallet,
  editCryptoWallet,
} from "@/store/slice/cryptoWallet";
import {
  getCryptoAccts,
  addCryptoAcct,
  editCryptoAcct,
} from "@/store/slice/cryptoAcct";
import { formLayout, Currency } from "@/utils/enum";
import { priceFormat } from "@/utils/format";
import { useDetail } from "@/utils/hook";
import { useHistory } from "react-router-dom";
import Spin from "@/components/Spin";

const EditableContext = React.createContext(null);
const { Option } = Select;

const Edit = () => {
  const dispatch = useDispatch();
  const [accts, setAccts] = useState([]);
  const [acctsState, setAcctsState] = useState([]);
  const history = useHistory();
  let { id } = useParams();
  const [form] = Form.useForm();
  const { currentRow, loading, handleEdit } = useDetail(
    { action: getCryptoWallet, id },
    selectCryptoWallet,
  );

  const [acctsLoading, setAcctsLoading] = useState(false);
  const handleGetAccts = useCallback(async () => {
    setAcctsLoading(true);
    const res = await dispatch(getCryptoAccts({ wallet_id: currentRow.id }));
    setAccts(res.payload.data.data);
    setAcctsLoading(false);
  }, [currentRow.id, dispatch]);
  useEffect(() => {
    form.setFieldsValue(currentRow);
    currentRow.id && handleGetAccts();
  }, [currentRow, form, handleGetAccts]);

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
      dataIndex: "w",
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
        const hasAddr = accts.find(i => i.id === record.id);
        hasAddr ||
          (await dispatch(
            addCryptoAcct({
              ...values,
              wallet_id: currentRow.id,
              currency: 1,
            }),
          ));
        hasAddr &&
          (await dispatch(
            editCryptoAcct({
              id: record.id,
              formModel: { ...values, wallet_id: currentRow.id, currency: 1 },
            }),
          ));
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
    setAcctsState([
      ...acctsState,
      {
        name: "",
        seq: 0,
        w: 0,
        note: "",
        address: "",
      },
    ]);
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
        </Spin>
      </Card>
      <Card title="加密钱包收款帐号" v-loading="true">
        {acctsState.length > 0 && (
          <Table
            columns={columnsCell}
            dataSource={acctsState}
            rowKey="id"
            components={components}
            pagination={false}
            loading={acctsLoading}
          />
        )}
        <div className="text-right mt-1">
          <Button type="primary" onClick={handleAddAddrClick}>
            新增地址
          </Button>
        </div>
      </Card>
    </Space>
  );
};

export default Edit;
