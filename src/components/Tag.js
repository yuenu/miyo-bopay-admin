import React from "react";
import { Tag } from "antd";
import { isActiveLang } from "@/utils/enum";
const TagC = props => {
  return (
    <Tag color={props.val ? "green" : "default"}>{isActiveLang(props.val)}</Tag>
  );
};
function propsAreEqual(prev, next) {
  return prev.val === next.val;
}
export default React.memo(TagC, propsAreEqual);
