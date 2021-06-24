import { useState, useEffect, useCallback } from "react";
import { Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Spin from "@/components/Spin";
const { Option } = Select;

const SearchSelect = ({ action, selector, searchKey, label, val, ...rest }) => {
  const dispatch = useDispatch();
  const [list, setList] = useState([]);
  const [searchText, setSearchText] = useState([]);
  const { meta } = useSelector(selector);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const handleSearch = async input => {
    setPage(1);
    setList([]);
    setSearchText(input);
    const { payload } = await dispatch(
      action({ [`${searchKey}__k`]: input, page }),
    );
    setList([...list, ...payload?.data?.data]);
  };

  const handleInit = useCallback(async () => {
    setLoading(true);
    const { payload } = await dispatch(
      action({ [`${searchKey}__k`]: searchText, page }),
    );
    setList([...list, ...payload?.data?.data]);
    setLoading(false);
    // eslint-disable-next-line
  }, [dispatch, action, searchKey, page]);

  const handleScroll = e => {
    const isScrollBottom =
      e.target.scrollHeight - e.target.clientHeight === e.target.scrollTop;
    if (isScrollBottom) {
      meta.pages > page && setPage(page + 1);
    }
  };
  useEffect(() => {
    handleInit();
  }, [handleInit]);
  return (
    <Select
      showSearch
      filterOption={false}
      onSearch={handleSearch}
      onPopupScroll={handleScroll}
      notFoundContent={loading ? <Spin spinning={loading} /> : null}
      {...rest}
    >
      {list.map(i => (
        <Option value={i[val]} key={i[val]}>
          {label(i)}
        </Option>
      ))}
    </Select>
  );
};
export default SearchSelect;
