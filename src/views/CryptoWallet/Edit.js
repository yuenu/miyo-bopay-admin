import React, { useEffect, useState } from "react";
import { Card, Form, Input, Space, Button, Select, Switch } from "antd";
import { useParams } from "react-router-dom";
import {
  selectCryptoWallet,
  getCryptoWallet,
  editCryptoWallet,
  activeCryptoWallet,
} from "@/store/slice/cryptoWallet";
import { selectApp, getApps } from "@/store/slice/app";
import { selectCryptoAcct, getCryptoAccts } from "@/store/slice/cryptoAcct";
import { formLayout, Currency, Network } from "@/utils/enum";
import { priceFormat } from "@/utils/format";
import { useList, useDetail } from "@/utils/hook";
import { useHistory } from "react-router-dom";
import Spin from "@/components/Spin";
import EditAcctList from "./EditAcctList";
import SearchSelect from "@/components/SearchSelect";

const { Option } = Select;

const Edit = () => {
  const history = useHistory();
  const { id } = useParams();
  const [walletId, setWalletId] = useState(Number(id));
  useEffect(() => {
    setWalletId(Number(id));
  }, [id]);
  const [form] = Form.useForm();
  const { currentRow, loading, handleEdit } = useDetail(
    { action: getCryptoWallet, id: walletId },
    selectCryptoWallet,
  );
  useEffect(() => {
    form.setFieldsValue({ ...currentRow, apps: currentRow.apps || [] });
  }, [currentRow, form]);

  const handleCancel = () => {
    history.push("/CryptoWallet");
  };
  const handleSubmit = async () => {
    const formModel = form.getFieldsValue();
    const { status, data } = await handleEdit({
      action: editCryptoWallet,
      ...currentRow,
      id,
      ...formModel,
    });
    handleGetList({ wallet_id: walletId });
    status === 200 && form.setFieldsValue({ ...data, apps: data.apps || [] });
  };
  const handleChangeIsActive = async checked => {
    await handleEdit({
      action: activeCryptoWallet,
      id: currentRow.id,
      is_active: checked,
    });
    handleGetList({ wallet_id: walletId });
    setWalletId(null);
    setWalletId(Number(id));
  };
  const {
    res: { list, meta },
    loading: listLoading,
    handleGetList,
    handleChangePage,
  } = useList(getCryptoAccts, selectCryptoAcct, { wallet_id: Number(id) });

  return (
    <Space direction="vertical" className="w-100">
      <Card>
        <Spin spinning={loading}>
          <Form.Item {...formLayout} label="??????" valuePropName="checked">
            <Switch
              checked={currentRow.is_active}
              onChange={handleChangeIsActive}
            />
          </Form.Item>
          <Form form={form} {...formLayout}>
            <Form.Item label="?????????" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="??????">
              {priceFormat({
                val: currentRow.balance,
                currency: currentRow.currency,
              })}
            </Form.Item>
            <Form.Item label="???????????????" name="owner">
              <Input />
            </Form.Item>
            <Form.Item label="????????????" name="address">
              <Input />
            </Form.Item>
            <Form.Item label="?????????" name="network">
              <Select>
                {Object.keys(Network).map(i => (
                  <Option value={Number(i)} key={i}>
                    {Network[i]}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="??????" name="currency">
              <Select>
                {Object.keys(Currency).map(i => (
                  <Option value={Number(i)} key={i}>
                    {Currency[i]}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="apps" label="????????????">
              <SearchSelect
                action={getApps}
                selector={selectApp}
                searchKey="name"
                val="id"
                label={i => `${i.id} ${i.name}`}
                mode="multiple"
              />
            </Form.Item>
            <Form.Item label="??????" name="note">
              <Input />
            </Form.Item>
            <div className="text-right">
              <Space size="small">
                <Button type="primary" onClick={handleSubmit}>
                  ????????????
                </Button>
                <Button onClick={handleCancel}>??????</Button>
              </Space>
            </div>
          </Form>
        </Spin>
      </Card>
      <EditAcctList
        id={id}
        list={list}
        meta={meta}
        loading={listLoading}
        handleGetList={handleGetList}
        handleChangePage={handleChangePage}
      />
    </Space>
  );
};

export default Edit;
