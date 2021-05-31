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
import { selectUser, getUsers, getUser } from "@/store/slice/user";
import { PlusOutlined } from "@ant-design/icons";
import Detail from "./Detail";
const { RangePicker } = DatePicker;
const User = () => {
  //search
  const [form] = Form.useForm();

  //list
  const dispatch = useDispatch();
  const { users } = useSelector(selectUser);
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const [addStates, setAddStates] = useState({
    visible: false,
    loading: false,
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

  const [detailStates, setDetailStates] = useState({
    visible: false,
    current: null,
  });
  const handleDetailClick = async id => {
    const currentUser = await getUser(id);
    setDetailStates({
      ...detailStates,
      visible: true,
      current: currentUser,
    });
  };
  const handleDetailCancel = () => {
    setDetailStates({ ...detailStates, visible: false, current: null });
  };

  const columns = [
    { title: "姓名", dataIndex: "name" },
    { title: "電話", dataIndex: "phone" },
    {
      title: "動作",
      dataIndex: "action",
      render: (_, recore) => (
        <Space>
          <Button onClick={() => handleDetailClick(recore.id)} type="primary">
            查看
          </Button>
          <Button>編輯</Button>
          <Button type="danger">刪除</Button>
        </Space>
      ),
    },
  ];
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
      <Modal
        title="職員明細"
        visible={detailStates.visible}
        onCancel={handleDetailCancel}
        footer={[
          <Button key="close" type="primary" onClick={handleDetailCancel}>
            關閉
          </Button>,
        ]}
      >
        <Detail data={detailStates.current} />
      </Modal>
    </Space>
  );
};
export default User;
