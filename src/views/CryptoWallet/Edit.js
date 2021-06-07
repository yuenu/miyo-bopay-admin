import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  useRef,
} from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCryptoWallet,
  getCryptoWallet,
} from "@/store/slice/cryptoWallet";
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

import { formLayout } from "@/utils/enum";
const EditableContext = React.createContext(null);
const { Option } = Select;

const Edit = () => {
  let { id } = useParams();
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const { currentRow } = useSelector(selectCryptoWallet);
  const [loading, setLoading] = useState(false);

  const handleGetDetail = useCallback(async () => {
    setLoading(true);
    await dispatch(getCryptoWallet(id));
    setLoading(false);
  }, [dispatch, id]);
  useEffect(() => {
    handleGetDetail();
  }, [handleGetDetail]);
  useEffect(() => {
    form.setFieldsValue(currentRow);
  }, [currentRow, form]);

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
    {
      title: "",
      dataIndex: "action",
      width: "120px",
    },
  ];
  const columnsCell = columns.map(i => {
    return {
      ...i,
      onCell: record => ({ ...i, record, dataIndex: i.dataIndex }),
    };
  });
  const data = [
    { id: 10, no: 10, is_active: true, address: "add", note: "", order: 0 },
    { id: 11, no: 11, is_active: false, address: "add", note: "", order: 1 },
  ];
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
        const values = await form.getFieldsValue();
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
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          valuePropName="checked"
        >
          <Switch ref={inputRef} />
        </Form.Item>
      ) : (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          key={record.id}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      );
    return <td {...restProps}>{childNode}</td>;
  };

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
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
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
            <Form.Item label="启用" name="is_active" valuePropName="checked">
              <Switch />
            </Form.Item>
            <div className="text-right">
              <Space size="small">
                <Button type="primary">保存修改</Button>
                <Button>取消</Button>
              </Space>
            </div>
          </Form>
        </Card>
        <Card title="加密钱包收款帐号">
          <Table
            columns={columnsCell}
            dataSource={data}
            rowKey="id"
            components={components}
          />
        </Card>
      </Space>
    </Spin>
  );
};

export default Edit;
