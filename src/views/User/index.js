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
  Tag,
  message,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUser,
  getUsers,
  getUser,
  editUser,
  deleteUser,
} from "@/store/slice/user";
import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { paginOptions } from "@/utils/enum";
import Add from "./Add";
import Detail from "./Detail";
import Edit from "./Edit";
const { RangePicker } = DatePicker;

const User = () => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const handleSearch = () => {
    console.log(form.getFieldsValue());
  };
  const handleResetSearch = () => {
    form.resetFields();
  };

  const { users, currentUser } = useSelector(selectUser);
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const [addVisible, setAddVisible] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const handleAddClick = () => {
    setAddVisible(true);
  };
  const handleAddOk = () => {
    setAddLoading(true);
    setAddVisible(false);
  };

  const [detailVisible, setDetailVisible] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const handleDetailClick = async id => {
    setDetailVisible(true);
    setDetailLoading(true);
    await dispatch(getUser(id));
    setDetailLoading(false);
  };

  const [editVisible, setEditVisible] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const handleEditClick = async id => {
    setEditVisible(true);
    setEditLoading(true);
    await dispatch(getUser(id));
    setEditLoading(false);
  };
  const handleEdit = async formModel => {
    const res = await editUser({
      id: currentUser.id,
      formModel: { ...currentUser, ...formModel },
    });
    res && message.success("更新成功！");
    await dispatch(getUsers());
    setEditVisible(false);
  };

  const handleDeleteClick = async id => {
    Modal.confirm({
      title: "確認刪除",
      icon: <ExclamationCircleOutlined />,
      content: `即將刪除 ${id}，是否繼續？`,
      okText: "確認",
      cancelText: "取消",
      onOk: close => handleDelete(close, id),
    });
  };
  const handleDelete = async (close, id) => {
    const res = await deleteUser(id);
    res && message.success("刪除成功！");
    await dispatch(getUsers());
    close();
  };

  const columns = [
    { title: "id", dataIndex: "id" },
    { title: "姓名", dataIndex: "name" },
    { title: "電話", dataIndex: "phone" },
    {
      title: "is_active",
      dataIndex: "is_active",
      render: (_, recore) => (
        <Tag color={_ ? "green" : "default"}>{_.toString()}</Tag>
      ),
    },
    {
      title: "動作",
      dataIndex: "action",
      align: "right",
      render: (_, recore) => (
        <Space>
          <Button onClick={() => handleDetailClick(recore.id)} type="primary">
            查看
          </Button>
          <Button onClick={() => handleEditClick(recore.id)}>編輯</Button>
          <Button onClick={() => handleDeleteClick(recore.id)} type="danger">
            刪除
          </Button>
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
              <Form.Item name="id" label="會員ID">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item name="name" label="會員姓名">
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="created" label="創建日期">
                <RangePicker />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24} className="text-right">
              <Space size="small">
                <Button onClick={handleResetSearch}>清除</Button>
                <Button type="primary" onClick={handleSearch}>
                  搜尋
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Card>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAddClick}>
        添加
      </Button>
      <Table
        columns={columns}
        dataSource={users}
        pagination={paginOptions}
        rowKey="id"
        scroll={{ x: "auto" }}
      />
      <Add
        visible={addVisible}
        onOk={handleAddOk}
        confirmLoading={addLoading}
        onCancel={() => setAddVisible(false)}
      />
      <Detail
        visible={detailVisible}
        data={currentUser}
        onCancel={() => setDetailVisible(false)}
        loading={detailLoading}
      />
      <Edit
        visible={editVisible}
        data={currentUser}
        onCancel={() => setEditVisible(false)}
        onOk={handleEdit}
        loading={editLoading}
      />
    </Space>
  );
};
export default User;
