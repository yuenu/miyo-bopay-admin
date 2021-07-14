import React, { useEffect, useCallback, useState, useRef } from "react";
import {
  Card,
  Space,
  Form,
  Typography,
  Button,
  InputNumber,
  Switch,
} from "antd";
import { selectConfig, getExchange, editExchange } from "@/store/slice/config";
import { ReloadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import Spin from "@/components/Spin";
import { formLayout } from "@/utils/enum";
import { dateFormat } from "@/utils/format";
const { Text } = Typography;

const USDTExchange = () => {
  const dispatch = useDispatch();
  const { exchange } = useSelector(selectConfig);
  const [loading, setLoading] = useState(false);
  const handleGetExchange = useCallback(async () => {
    setLoading(true);
    await dispatch(getExchange());
    setLoading(false);
  }, [dispatch]);

  const priceRef = useRef(null);
  const handleSubmit = async formModal => {
    const params = {
      token: "USDT",
      currency: "RMB",
      ...exchange,
      ...formModal,
    };
    await editExchange(params);
    handleGetExchange();
  };

  useEffect(() => {
    handleGetExchange();
  }, [handleGetExchange]);
  return (
    <Space direction="vertical" className="w-100">
      <Card>
        <Spin spinning={loading}>
          <Form.Item {...formLayout} label="当前兑人民币实时汇率">
            {exchange.price}
            <Text type="secondary" className="ml-1">
              <small>数据来源: 非小号</small>
            </Text>
            <Button
              className="ml-1"
              type="primary"
              icon={<ReloadOutlined />}
              onClick={handleGetExchange}
            >
              刷新
            </Button>
          </Form.Item>
          <Form.Item {...formLayout} label="调整汇率">
            {loading ? null : (
              <InputNumber
                style={{ width: "auto" }}
                ref={priceRef}
                defaultValue={exchange.price}
              />
            )}
            <Button
              className="ml-1"
              type="primary"
              onClick={() =>
                handleSubmit({ price: Number(priceRef.current.value) })
              }
            >
              保存
            </Button>
          </Form.Item>
          <Form.Item {...formLayout} label="设置是否实时更新">
            <Switch
              checked={exchange.auto}
              onChange={checked => handleSubmit({ auto: checked })}
            />
          </Form.Item>
          <Form.Item {...formLayout} label="更新时间">
            {dateFormat(exchange.updated)}
          </Form.Item>
        </Spin>
      </Card>
    </Space>
  );
};

export default USDTExchange;
