import React, { useEffect, useCallback, useState } from "react";
import { Card, Space, Form, Switch } from "antd";
import { editOpt, selectAuth, getOptStatus } from "@/store/slice/auth";
import { useDispatch, useSelector } from "react-redux";
import Spin from "@/components/Spin";
import { formLayout } from "@/utils/enum";

const SystemSetting = () => {
  const dispatch = useDispatch();
  const { isOpt } = useSelector(selectAuth);
  const [loading, setLoading] = useState(false);
  const handleGetOptStatus = useCallback(async () => {
    setLoading(true);
    await dispatch(getOptStatus());
    setLoading(false);
  }, [dispatch]);

  const handleSubmit = async checked => {
    const params = {
      sw: checked,
    };
    await editOpt(params);
    handleGetOptStatus();
  };

  useEffect(() => {
    handleGetOptStatus();
  }, [handleGetOptStatus]);

  return (
    <Space direction="vertical" className="w-100">
      <Card>
        <Spin spinning={loading}>
          <Form.Item label="谷歌验证码" {...formLayout}>
            <Switch checked={isOpt} onChange={handleSubmit} />
          </Form.Item>
        </Spin>
      </Card>
    </Space>
  );
};

export default SystemSetting;
