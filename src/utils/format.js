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
    const { unit, rate, tofix } = CurrencyFormat.find(i => i.key === currency);
    return `${unit} ${(val / rate).toLocaleString("en-US", {
      maximumFractionDigits: tofix,
    })}`;
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

export const getRouterDisplayName = path =>
  router.find(i => i.path === path)?.displayName ||
  router.find(i => i.name === path.split("/")[1])?.displayName;

export const getRouter = path =>
  router.find(i => i.path === path) ||
  router.find(i => i.name === path.split("/")[1]);

export const getRouterParam = path => {
  const pathLength = path.split("/").length;
  return pathLength > 2 ? ` - ${path.split("/")[pathLength - 1]}` : "";
};

export const permsToArrayFormat = perms => {
  const permsArr = [];
  perms &&
    Object.keys(perms).forEach(i => {
      if (i.split(".").length <= 1 || !perms[i]) return;
      let name;
      Perms.forEach(j => {
        j.children.forEach(k => {
          k.key === i && (name = k.title);
        });
      });
      permsArr.push({ key: i, name });
    });
  return permsArr;
};

export const getColumns = () => {
  return JSON.parse(localStorage.getItem("columns") || "{}")[
    window.location.pathname
  ];
};
