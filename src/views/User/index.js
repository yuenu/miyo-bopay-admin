import { useState, useEffect } from "react";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  DatePicker,
  Space,
  Table,
  Card,
  Modal,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, getUsers } from "@/store/slice/user";
import { PlusOutlined } from "@ant-design/icons";
const { RangePicker } = DatePicker;
const User = () => {
  //search
  const [form] = Form.useForm();

  //list
  const dispatch = useDispatch();
  const columns = [
    { title: "Id", dataIndex: "id" },
    { title: "Name", dataIndex: "name" },
    {
      title: "動作",
      dataIndex: "action",
      render: (_, recore) => <Button type="primary">edit {recore.name}</Button>,
    },
  ];
  const { users } = useSelector(selectUser);
  useEffect(() => {
    const getList = async () => {
      await dispatch(getUsers());
    };
    getList();
  }, [dispatch]);
  const [addStates, setAddStates] = useState({
    visible: false,
    liading: false,
  });
  const handleAddClick = () => {
    setAddStates({ ...addStates, visible: true });
  };
  const handleCancelAdd = () => {
    setAddStates({ ...addStates, visible: false });
  };
  const handleAddOk = () => {
    setAddStates({ ...addStates, visible: false });
  };

  return (
    <Space direction="vertical" size="middle" className="w-100">
      <Card>
        <Form form={form}>
          <Row gutter={24}>
            <Col xs={24} md={8}>
              <Form.Item label="會員ID">
                <Input placeholder="input placeholder" />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item label="會員姓名">
                <Input placeholder="input placeholder" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="創建日期">
                <RangePicker />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24} className="text-right">
              <Space size="small">
                <Button>Clear</Button>
                <Button type="primary">Submit</Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Card>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAddClick}>
        添加
      </Button>
      <Table columns={columns} dataSource={users} rowKey="id" />
      <Modal
        title="添加職員"
        visible={addStates.visible}
        onOk={handleAddOk}
        confirmLoading={addStates.loading}
        onCancel={handleCancelAdd}
        cancelText="取消"
        okText="送出"
      >
        <p>pppp</p>
      </Modal>
    </Space>
  );
};
export default User;
