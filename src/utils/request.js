import axios from "axios";
import { errorCodeMessage } from "@/utils/enum";
import Notification from "@/components/factory/NotifFactory";
import { logout } from "@/store/slice/auth";
import router from "@/router";
export const interceptor = store => {
  axios.interceptors.request.use(
    config => {
      config = {
        ...config,
        withCredentials: true,
        baseURL: process.env.REACT_APP_API_URL,
      };
      return config;
    },
    function (error) {
      return Promise.reject(error);
    },
  );

  axios.interceptors.response.use(
    response => {
      response = {
        ...response,
      };
      return response;
    },
    function (error) {
      const status = error.response.status;
      if (status === 401) {
        store.dispatch(logout());
        router.push({ name: "Login" });
        Notification({
          title: errorCodeMessage[status] ?? error.message,
          message: error.response?.data?.err,
        });
      } else {
        Notification({
          title:
            error.response.data.message ??
            errorCodeMessage[status] ??
            error.message,
          message: error.response?.data?.err,
        });
      }
      return Promise.reject(error);
    },
  );
};
/**
 *
 * @param {url, method, data, params} config
 * data   --> post {}
 */
const request = async config => {
  const params = {
    url: config.url,
    method: config.method,
    ...(config.method === "get"
      ? { params: config.params }
      : { data: config.data }),
  };
  try {
    const { data, status } = await axios(params);
    return { data, status };
  } catch (error) {
    if (error.response) {
      console.log("response", error.response);
    } else if (error.request) {
      console.log("request", error.request);
    } else {
      console.log("Error message", error.message);
    }
    return { status: error.response.status, data: error.response.data };
  }
};

export default request;
