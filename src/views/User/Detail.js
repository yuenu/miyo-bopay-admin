import { Descriptions, Tag } from "antd";
import { dateFormat } from "@/utils/format";
const Detail = props => {
  const { id, name, phone, email, created, updated, is_active, username } =
    props.data;
  return (
    <Descriptions column={1} bordered>
      <Descriptions.Item label="id">{id}</Descriptions.Item>
      <Descriptions.Item label="姓名">{name}</Descriptions.Item>
      <Descriptions.Item label="電話">{phone}</Descriptions.Item>
      <Descriptions.Item label="email">{email}</Descriptions.Item>
      <Descriptions.Item label="創建日期">
        {dateFormat(created)}
      </Descriptions.Item>
      <Descriptions.Item label="更新日期">
        {dateFormat(updated)}
      </Descriptions.Item>
      <Descriptions.Item label="is_active">
        {" "}
        <Tag color={is_active ? "green" : "default"}>
          {is_active.toString()}
        </Tag>
      </Descriptions.Item>
      <Descriptions.Item label="帳號">{username}</Descriptions.Item>
    </Descriptions>
  );
};

export default Detail;
