import { Modal, Descriptions, Button } from "antd";
import { dateFormat } from "@/utils/format";
import Spin from "@/components/Spin";

const Detail = props => {
  const {
    id,
    name,
    phone,
    app_id,
    app_name,
    app_userid,
    developer_id,
    developer_name,
    rating,
    register_ip,
    userid,
    vip,
    created,
    updated,
  } = props.data;
  return (
    <Modal
      title="App用戶明細"
      visible={props.visible}
      onCancel={props.onCancel}
      footer={[
        <Button key="close" type="primary" onClick={props.onCancel}>
          關閉
        </Button>,
      ]}
    >
      <Spin spinning={props.loading}>
        <Descriptions column={1} bordered>
          <Descriptions.Item label="id">{id}</Descriptions.Item>
          <Descriptions.Item label="姓名">{name}</Descriptions.Item>
          <Descriptions.Item label="電話">{phone}</Descriptions.Item>
          <Descriptions.Item label="AppId">{app_id}</Descriptions.Item>
          <Descriptions.Item label="AppName">{app_name}</Descriptions.Item>
          <Descriptions.Item label="AppUserId">{app_userid}</Descriptions.Item>
          <Descriptions.Item label="DeveloperId">
            {developer_id}
          </Descriptions.Item>
          <Descriptions.Item label="DeveloperName">
            {developer_name}
          </Descriptions.Item>
          <Descriptions.Item label="Rating">{rating}</Descriptions.Item>
          <Descriptions.Item label="RegisterIP">
            {register_ip}
          </Descriptions.Item>
          <Descriptions.Item label="userId">{userid}</Descriptions.Item>
          <Descriptions.Item label="VIP">{vip}</Descriptions.Item>
          <Descriptions.Item label="創建日期">
            {dateFormat(created)}
          </Descriptions.Item>
          <Descriptions.Item label="更新日期">
            {dateFormat(updated)}
          </Descriptions.Item>
        </Descriptions>
      </Spin>
    </Modal>
  );
};

export default Detail;
