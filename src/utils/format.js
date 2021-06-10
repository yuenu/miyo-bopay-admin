import moment from "moment";
import { CurrencyFormat } from "@/utils/enum";
export const dateFormat = date => {
  if (!date) return;
  return moment(date).isValid()
    ? moment(date).format("YYYY-MM-DD HH:mm:ss")
    : "is not valid date";
};
export const priceFormat = ({ val, currency }) => {
  try {
    const { unit, rate } = CurrencyFormat.find(i => i.key === currency);

    return `${unit} ${val / rate}`;
  } catch (e) {
    console.log(e);
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
      formModel[i] && (params[i] = rangeDateFormat(formModel[i]));
    } else {
      formModel[i] && (params[i] = formModel[i]);
    }
  });
  return params;
};
