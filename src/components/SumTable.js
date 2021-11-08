import { Descriptions } from "antd";

const SumTable = ({ data = {}, labels = [] }) => {
  return (
    <Descriptions
      bordered
      layout="vertical"
      size="small"
      column={{ xs: 2, sm: 4, md: 8 }}
      style={{ backgroundColor: "#fff" }}
    >
      {labels.map(i => {
        return (
          <Descriptions.Item label={i.title} key={i.dataIndex}>
            {i.render ? i.render(data[i.dataIndex] || 0) : data[i.dataIndex]}
          </Descriptions.Item>
        );
      })}
    </Descriptions>
  );
};

export default SumTable;
