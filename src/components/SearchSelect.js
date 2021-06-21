import { useState, useEffect, useCallback } from "react";
import { Select } from "antd";
import { useSelector, useDispatch } from "react-redux";
import Spin from "@/components/Spin";
const { Option } = Select;

const SearchSelect = ({ action, selector, searchKey, label, val, ...rest }) => {
  const dispatch = useDispatch();
  const { list: searchList } = useSelector(selector);
  const [loading, setLoading] = useState(false);
  const handleSearchOptions = useCallback(
    async input => {
      setLoading(true);
      await dispatch(action({ [`${searchKey}__k`]: input }));
      setLoading(false);
    },
    [dispatch, action, searchKey],
  );
  useEffect(() => {
    handleSearchOptions();
  }, [handleSearchOptions]);
  return (
    <Select
      showSearch
      filterOption={false}
      onSearch={handleSearchOptions}
      notFoundContent={loading ? <Spin spinning={loading} /> : null}
      {...rest}
    >
      {searchList.map(i => (
        <Option value={i[val]} key={i[val]}>
          {label(i)}
        </Option>
      ))}
    </Select>
  );
};
export default SearchSelect;
