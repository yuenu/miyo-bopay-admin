import axios from "axios";
axios.interceptors.request.use(
  (config) => {
    config = {
      ...config,
      baseURL: process.env.REACT_APP_API_URL,
    };
    console.log(config.baseURL);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    response = {
      ...response,
    };
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

/**
 *
 * @param {url, method, data, params} config
 * data   --> post {}
 */
export const Ajax = async (config) => {
  const params = {
    url: config.url,
    method: config.method,
    ...(config.method === "get"
      ? { params: config.params }
      : { data: config.data }),
  };
  try {
    const { data } = await axios(params);
    return data ?? {};
  } catch (error) {
    if (error.response) {
      console.log("response", error.response);
    } else if (error.request) {
      console.log("request", error.request);
    } else {
      console.log("Error message", error.message);
    }
    return {};
  }
};
