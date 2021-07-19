import Notification from "@/components/factory/NotifFactory";
import { Button } from "antd";
import { priceFormat } from "@/utils/format";
import { generatePath } from "react-router-dom";
import history from "@/utils/history";

const OrderNotif = res => {
  const { type, data } = res;

  const handleDetailClick = () => {
    history.push(generatePath("/OrderDetail/:id", { id: data.id }));
  };

  const wsType = {
    "order.pending": {
      title: `您有一笔新的订单 ${data.id} 需要审核`,
      message: (
        <>
          <div>商户：{data.app_id}</div>
          <div>
            金额：{priceFormat({ val: data.amount, currency: data.currency })}
            <Button size="small" className="ml-1" onClick={handleDetailClick}>
              查看详情
            </Button>
          </div>
        </>
      ),
    },
    "order.notify_failed": {
      title: `订单 ${data.id} 通知失败`,
      message: `失败原因: ${data.failure_msg}`,
    },
    "order.paid": { title: `订单 ${data.id} 付款成功`, message: "" },
  };

  wsType[type] &&
    Notification({
      type: "info",
      title: wsType[type]?.title,
      message: wsType[type]?.message,
    });
};
export default OrderNotif;
