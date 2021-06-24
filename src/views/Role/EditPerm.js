import { useState, useEffect } from "react";
import { Tree, Card, Space, Spin, Button, message } from "antd";
import { Perms } from "@/utils/enum";
import { treeToPermsFormat, getDefaultCheckKeys } from "@/utils/format";
import { useParams } from "react-router-dom";
import { selectRole, getRole, editPerms } from "@/store/slice/role";
import { useDetail } from "@/utils/hook";

const EditPerm = () => {
  const { id } = useParams();
  const { currentRow, loading, setLoading } = useDetail(
    { action: getRole, id },
    selectRole,
  );
  const [selectedKeys, setSelectedKeys] = useState([]);
  useEffect(() => {
    currentRow.id && setSelectedKeys(getDefaultCheckKeys(currentRow.perms));
  }, [currentRow]);

  const handleCheck = checkedKeys => {
    setSelectedKeys(checkedKeys);
  };
  const handleOk = async () => {
    const params = treeToPermsFormat(selectedKeys);
    setLoading(true);
    const { status } = await editPerms({ id, perms: params });
    setLoading(false);
    status === 200 && message.success("更新成功！");
  };
  return (
    <Spin spinning={loading}>
      <Space direction="vertical" className="w-100">
        <h2>{currentRow.name}</h2>
        <Card>
          <Tree
            checkable
            treeData={Perms}
            onCheck={handleCheck}
            checkedKeys={selectedKeys}
          />
        </Card>
        <div className="text-right">
          <Button type="primary" onClick={handleOk}>
            储存
          </Button>
        </div>
      </Space>
    </Spin>
  );
};

export default EditPerm;
