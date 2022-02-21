import { useState, useEffect, useCallback } from "react";
import { Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Spin from "@/components/Spin";
const { Option } = Select;

const SearchSelect = ({
  action,
  params,
  selector,
  searchKey,
  label,
  val,
  onSelect,
  payloadPos,
  selectorMetaKey = "meta",
  ...rest
}) => {
  const dispatch = useDispatch();
  const selectorObj = useSelector(selector);
  const [list, setList] = useState([]);
  const [searchText, setSearchText] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const handleSearch = async input => {
    setPage(1);
    setList([]);
    setSearchText(input);
    const { payload } = await dispatch(
      action({ [`${searchKey}__k`]: input, page, ...params }),
    );
    payloadPos && setList(payload?.[payloadPos]);
    payloadPos || setList(payload?.data?.data);
  };
  const handleInit = useCallback(async () => {
    setLoading(true);
    const { payload } = await dispatch(
      action({ [`${searchKey}__k`]: searchText, page, ...params }),
    );
    payloadPos && setList(payload?.[payloadPos]);
    payloadPos || setList([...list, ...payload?.data?.data]);
    setLoading(false);
    // eslint-disable-next-line
  }, [searchKey, page]);

  const handleScroll = e => {
    const isScrollBottom =
      e.target.scrollHeight - e.target.clientHeight === e.target.scrollTop;
    if (isScrollBottom) {
      selectorObj[selectorMetaKey].pages > page && setPage(page + 1);
    }
  };

  useEffect(() => {
    handleInit();
  }, [handleInit]);

  const handleSelect = value => {
    onSelect && onSelect(list.find(i => i.id === value));
  };
  return (
    <Select
      showSearch
      filterOption={false}
      onSearch={handleSearch}
      onPopupScroll={handleScroll}
      notFoundContent={loading ? <Spin spinning={loading} /> : null}
      onSelect={value => handleSelect(value)}
      {...rest}
    >
      {list &&
        list.map(i => (
          <Option value={i[val]} key={i[val]}>
            {label(i)}
          </Option>
        ))}
    </Select>
  );
};
export default SearchSelect;
