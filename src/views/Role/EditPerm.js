import { Tree, Card, Space, Spin } from "antd";
import { Perms } from "@/utils/enum";
import { useParams } from "react-router-dom";
import { selectRole, getRole } from "@/store/slice/role";
import { useDetail } from "@/utils/hook";

const EditPerm = () => {
  const { id } = useParams();
  const { currentRow, loading } = useDetail(
    { action: getRole, id },
    selectRole,
  );
  return (
    <Spin spinning={loading}>
      <Space direction="vertical" className="w-100">
        <h2>{currentRow.name}</h2>
        <Card>
          <Tree checkable treeData={Perms} />
        </Card>
      </Space>
    </Spin>
  );
};

export default EditPerm;
