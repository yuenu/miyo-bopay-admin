import { Descriptions } from "antd";
import Spin from "@/components/Spin";
import { useDetail } from "@/utils/hook";
import { selectOrder, getOrder } from "@/store/slice/order";
import { useParams } from "react-router-dom";
import Colums from "./Columns";
const Detail = () => {
  const { id } = useParams();
  const { currentRow, loading } = useDetail(
    { action: getOrder, id },
    selectOrder,
  );
  return (
    <Spin spinning={loading}>
      <Descriptions
        column={{ xs: 1, sm: 1, md: 2 }}
        bordered
        className="bg-white"
      >
        {Colums.map(i => (
          <Descriptions.Item
            label={i.title}
            key={i.dataIndex}
            span={
              i.dataIndex === "payer_name" || i.dataIndex === "payer_cred"
                ? 2
                : 1
            }
          >
            {i.dRender
              ? i.dRender(currentRow[i.dataIndex], i)
              : i.render
              ? i.render(currentRow[i.dataIndex], i)
              : currentRow[i.dataIndex]}
          </Descriptions.Item>
        ))}
      </Descriptions>
    </Spin>
  );
};

export default Detail;
