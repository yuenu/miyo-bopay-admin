import { useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { message } from "antd";

export const useList = (action, selector) => {
  const dispatch = useDispatch();
  const { list, currentRow, meta } = useSelector(selector);
  const [loading, setLoading] = useState(false);
  const handleGetList = useCallback(
    async (params = {}) => {
      setLoading(true);
      await dispatch(action(params));
      setLoading(false);
    },
    [dispatch, action],
  );
  const handleChangePage = (pagination, filters, sorter, extra) => {
    handleGetList({ page: pagination.current });
  };
  useEffect(() => {
    handleGetList();
  }, [handleGetList]);
  return {
    res: { list, currentRow, meta },
    loading,
    handleGetList,
    handleChangePage,
  };
};

export const useDetail = (ac, selector, id) => {
  const dispatch = useDispatch();
  const { currentRow } = useSelector(selector);
  const [loading, setLoading] = useState(false);
  const handleGetDetail = useCallback(async () => {
    setLoading(true);
    await dispatch(ac(id));
    setLoading(false);
  }, [dispatch, ac, id]);

  const handleEdit = async ({ action, id: editId, ...params }) => {
    setLoading(true);
    const { status } = await action({
      id: editId,
      formModel: params,
    });
    status === 200 && message.success("更新成功！");
    setLoading(false);
  };
  useEffect(() => {
    id && handleGetDetail();
  }, [handleGetDetail, id]);
  return { currentRow, loading, handleEdit };
};
