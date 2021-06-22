import { notification } from "antd";
/**
 * fields
 * @param {string} type -  [success, info, warning, error]
 * @param {string} title
 * @param {string} message
 */
const NotifFactory = ({ type = "error", title, message }) => {
  notification[type]({
    message: title,
    description: message,
  });
};

export default NotifFactory;
