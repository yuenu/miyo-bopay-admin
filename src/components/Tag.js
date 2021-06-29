import React from "react";
import { Tag } from "antd";
import { isActiveLang } from "@/utils/enum";
const TagC = ({ val, falseColor, children }) => {
  return (
    <Tag color={val ? "green" : falseColor ?? "default"}>
      {children ?? isActiveLang(val)}
    </Tag>
  );
};
function propsAreEqual(prev, next) {
  return prev.val === next.val;
}
export default React.memo(TagC, propsAreEqual);
