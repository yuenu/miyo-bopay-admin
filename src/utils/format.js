import moment from "moment";

export const dateFormat = date => {
  if (!date) return;
  return moment(date).isValid()
    ? moment(date).format("YYYY-MM-DD HH:mm:ss")
    : "is not valid date";
};
