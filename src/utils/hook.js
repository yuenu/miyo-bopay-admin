import { useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { message } from "antd";
import { getColumns } from "@/utils/format";

export const useList = (action, selector, originParams = {}) => {
  const dispatch = useDispatch();
  const states = useSelector(selector);
  const [searchParams, setSearchParams] = useState(null);
  const [sortParams, setSortParams] = useState(null);
  const [pageSize, setPageSize] = useState(states.meta?.pageSize);
  const [current, setCurrent] = useState(states.meta?.current);
  const [loading, setLoading] = useState(false);
  const handleGetList = useCallback(
    async (params = {}) => {
      setLoading(true);
      await dispatch(
        action({
          page: current,
          per_page: pageSize,
          ...originParams,
          ...searchParams,
          ...sortParams,
          ...params,
        }),
      );
      setLoading(false);
    },
    // eslint-disable-next-line
    [dispatch, action, pageSize, current, searchParams, sortParams],
  );
  const handleSearch = formModel => {
    setSearchParams(formModel);
    setCurrent(1);
  };
  const handleChangePage = (page, pageSize) => {
    setCurrent(page);
    setPageSize(pageSize);
  };
  const handleChange = (pagination, filters, sorter) => {
    const order = sorter.order === "ascend" ? "" : "-";
    setSortParams(sorter.order ? { o: order + sorter.field } : null);
  };
  const handleAdd = async ({ action: addAction, ...params }) => {
    setLoading(true);
    const { status } = await addAction(params);
    status === 200 && message.success("新增成功！");
    handleGetList();
  };
  const handleDelete = async ({ action: deleteAction, ...params }) => {
    setLoading(true);
    const { status } = await deleteAction(params);
    status === 200 && message.success("刪除成功！");
    handleGetList();
  };

  useEffect(() => {
    handleGetList();
  }, [handleGetList]);
  return {
    res: { ...states },
    loading,
    handleSearch,
    handleGetList,
    handleChangePage,
    handleChange,
    handleAdd,
    handleDelete,
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
    const { status, data } = await editAction({
      id: editId,
      formModel: params,
    });
    status === 200 && message.success("更新成功！");
    setLoading(false);
    return { status, data };
  };
  useEffect(() => {
    id && handleGetDetail();
  }, [handleGetDetail, id]);
  return { currentRow, loading, setLoading, handleEdit };
};

export const useColumnsSelect = ({ columns, defaultColumns }) => {
  const localDefaultCols = columns.filter(
    i => getColumns()?.indexOf(i.dataIndex) > -1,
  );
  const originDefaultCols = columns.filter(
    i => defaultColumns.indexOf(i.dataIndex) > -1,
  );
  const defaultColumnsAll =
    localDefaultCols.length > 0 ? localDefaultCols : originDefaultCols;
  const [selectedColumns, setSelectedColumns] = useState(defaultColumnsAll);
  const handleSelectedColumnsChange = ({ columns, pathname }) => {
    setSelectedColumns(columns);
    const storageColumns =
      JSON.parse(localStorage.getItem("columns") || "{}") || {};
    localStorage.setItem(
      "columns",
      JSON.stringify({
        ...storageColumns,
        [pathname]: columns.map(i => i.dataIndex),
      }),
    );
  };
  return { selectedColumns, handleSelectedColumnsChange };
};

export const useSearchCache = () => {
  const handleGetSearchCache = () =>
    JSON.parse(localStorage.getItem("searchCache") || "{}") || {};
  const handleSetSearchCache = ({ pathname, formModel }) => {
    const storageSearchCache = handleGetSearchCache();
    localStorage.setItem(
      "searchCache",
      JSON.stringify({
        ...storageSearchCache,
        [pathname]: formModel,
      }),
    );
  };
  const handleResetSearchCache = ({ pathname }) => {
    const storageSearchCache = handleGetSearchCache();
    delete storageSearchCache[pathname];
    localStorage.setItem("searchCache", JSON.stringify(storageSearchCache));
  };
  return { handleGetSearchCache, handleSetSearchCache, handleResetSearchCache };
};
