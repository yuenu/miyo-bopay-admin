import moment from "moment";
import { CurrencyFormat, Perms } from "@/utils/enum";
import router from "@/router";

export const dateFormat = date => {
  if (!date) return;
  return moment(date).isValid()
    ? moment(date).format("YYYY-MM-DD HH:mm:ss")
    : "is not valid date";
};
export const priceFormat = ({ val, currency }) => {
  try {
    const { unit, rate } = CurrencyFormat.find(i => i.key === currency);
    return `${unit} ${(val / rate).toLocaleString("en-US")}`;
  } catch (e) {
    return "";
  }
};

export const rangeDateFormat = val => {
  if (!val) return;
  return `${val[0]._d.toISOString()}~${val[1]._d.toISOString()}`;
};

export const searchFieldsFormat = ({ fields, formModel }) => {
  let params = {};
  Object.keys(fields).forEach(i => {
    if (fields[i].type === "rangeDate") {
      formModel[i] !== undefined && (params[i] = rangeDateFormat(formModel[i]));
    } else {
      formModel[i] !== undefined && (params[i] = formModel[i]);
    }
  });
  return params;
};

export const metaToPagin = meta => {
  return {
    pageSize: meta.per_page,
    current: meta.page,
    total: meta.total,
    pages: meta.pages,
  };
};

export const treeToPermsFormat = selectedPerms => {
  let formModel = {};
  Perms.forEach(i => {
    i.children.forEach(j => {
      formModel[j.key] = selectedPerms.indexOf(j.key) >= 0;
    });
  });
  return formModel;
};
export const getDefaultCheckKeys = perms => {
  let defaultCheckedKeys = [];
  Object.keys(perms).forEach(i => {
    perms[i] && defaultCheckedKeys.push(i);
  });
  return defaultCheckedKeys;
};

export const getRouterDisplayName = key =>
  router.find(i => i.path === key)?.displayName;
