import { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export const useGetList = (action, selector) => {
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
  return {
    res: { list, currentRow, meta },
    loading,
    handleGetList,
    handleChangePage,
  };
};
