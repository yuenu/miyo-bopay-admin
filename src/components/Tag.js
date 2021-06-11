import React from "react";
import { Tag } from "antd";
import { isActiveLang } from "@/utils/enum";
const TagC = props => {
  return (
    <Tag color={props.val ? "green" : "default"}>{isActiveLang(props.val)}</Tag>
  );
};

export default React.memo(TagC);
