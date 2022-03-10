import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Space, Form, Switch } from "antd";
import { selectUser, getUsers } from "@/store/slice/user";
import { configOpt, selectAuth, getOptStatus } from "@/store/slice/auth";
import { configAgent, selectAgent, getConfigAgent } from "@/store/slice/agent";
import Spin from "@/components/Spin";
import SearchSelect from "@/components/SearchSelect";
import { formLayout } from "@/utils/enum";

const SystemSetting = () => {
  const dispatch = useDispatch();
  const { isOpt } = useSelector(selectAuth);
  const { configAgentData } = useSelector(selectAgent);
  const [loading, setLoading] = useState(false);

  // google 驗證
  const handleGetOptStatus = useCallback(async () => {
    setLoading(true);
    await dispatch(getOptStatus());
    setLoading(false);
  }, [dispatch]);

  const handleSubmit = async checked => {
    const params = {
      sw: checked,
    };
    await configOpt(params);
    handleGetOptStatus();
  };
  useEffect(() => {
    handleGetOptStatus();
  }, [handleGetOptStatus]);

  // 預設代理
  const [form] = Form.useForm();
  const handleGetAgentConfig = useCallback(async () => {
    setLoading(true);
    await dispatch(getConfigAgent());
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    handleGetAgentConfig();
  }, [handleGetAgentConfig]);

  const handleAgentSelect = async ({ id, name }) => {
    await configAgent({ user_id: id, name });
    handleGetAgentConfig();
  };
  useEffect(() => {
    configAgentData.user_id && form.setFieldsValue({ ...configAgentData });
  }, [configAgentData, form]);

  return (
    <Space direction="vertical" className="w-100">
      <Card>
        <Spin spinning={loading}>
          <Form.Item label="谷歌验证码" {...formLayout}>
            <Switch checked={isOpt} onChange={handleSubmit} />
          </Form.Item>
        </Spin>
      </Card>
      <Card>
        <Spin spinning={loading}>
          <Form form={form} {...formLayout}>
            <Form.Item name="user_id" label="预设上級代理">
              <SearchSelect
                action={() => getUsers({ is_agent__eq: 1 })}
                selector={selectUser}
                onSelect={handleAgentSelect}
                searchKey="name"
                val="id"
                label={i => `${i.id} ${i.name}`}
              />
            </Form.Item>
          </Form>
        </Spin>
      </Card>
    </Space>
  );
};

export default SystemSetting;
