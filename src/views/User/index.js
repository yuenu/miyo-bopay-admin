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
  //search
  const [form] = Form.useForm();
  const handleSearch = () => {
    console.log(form.getFieldsValue());
  };
  const handleResetSearch = () => {
    form.resetFields();
  };

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
    editVisible: false,
    current: {},
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
    setDetailStates({ ...detailStates, visible: false, current: {} });
  };

  const handleEditClick = async id => {
    const currentUser = await getUser(id);
    setDetailStates({
      ...detailStates,
      editVisible: true,
      current: currentUser,
    });
  };
  const handleEditCancel = () => {
    setDetailStates({ ...detailStates, editVisible: false, current: {} });
  };
  const handleEdit = async formModel => {
    const res = await editUser({
      id: detailStates.current.id,
      formModel: { ...detailStates.current, ...formModel },
    });
    res && message.success("更新成功！");
    await dispatch(getUsers());
    handleEditCancel();
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
        visible={addStates.visible}
        onOk={handleAddOk}
        confirmLoading={addStates.loading}
        onCancel={handleCancelAdd}
      />
      <Detail
        visible={detailStates.visible}
        data={detailStates.current}
        onCancel={handleDetailCancel}
      />
      <Edit
        visible={detailStates.editVisible}
        data={detailStates.current}
        onCancel={handleEditCancel}
        onOk={handleEdit}
      />
    </Space>
  );
};
export default User;
