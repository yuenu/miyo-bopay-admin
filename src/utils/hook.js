import { useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { message } from "antd";

export const useList = (action, selector, originParams = {}) => {
  const dispatch = useDispatch();
  const { list, currentRow, meta } = useSelector(selector);
  const [loading, setLoading] = useState(false);
  const handleGetList = useCallback(
    async (params = {}) => {
      setLoading(true);
      await dispatch(action({ ...originParams, ...params }));
      setLoading(false);
    },
    // eslint-disable-next-line
    [dispatch, action],
  );
  const handleChangePage = (pagination, filters, sorter, extra) => {
    handleGetList({ page: pagination.current });
  };
  const handleAdd = async ({ action: addAction, ...params }) => {
    setLoading(true);
    const { status } = await addAction(params);
    status === 200 && message.success("新增成功！");
    handleGetList();
  };

  useEffect(() => {
    handleGetList();
  }, [handleGetList]);
  return {
    res: { list, currentRow, meta },
    loading,
    handleGetList,
    handleChangePage,
    handleAdd,
    setLoading,
  };
};

export const useDetail = ({ action, id }, selector) => {
  const dispatch = useDispatch();
  const { currentRow } = useSelector(selector);
  const [loading, setLoading] = useState(false);
  const handleGetDetail = useCallback(async () => {
    setLoading(true);
    await dispatch(action(id));
    setLoading(false);
  }, [dispatch, action, id]);

  const handleEdit = async ({ action: editAction, id: editId, ...params }) => {
    setLoading(true);
    const { status } = await editAction({
      id: editId,
      formModel: params,
    });
    status === 200 && message.success("更新成功！");
    setLoading(false);
  };
  useEffect(() => {
    id && handleGetDetail();
  }, [handleGetDetail, id]);
  return { currentRow, loading, setLoading, handleEdit };
};

export const useColumnsSelect = ({ columns, defaultColumns }) => {
  const [selectedColumns, setSelectedColumns] = useState(
    columns.filter(i => defaultColumns.indexOf(i.dataIndex) > -1),
  );
  return { selectedColumns, setSelectedColumns };
};
