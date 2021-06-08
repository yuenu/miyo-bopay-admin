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
