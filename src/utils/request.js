import axios from "axios";
axios.defaults.withCredentials = true;
const poll = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});
poll.interceptors.request.use(
  config => {
    config = {
      ...config,
    };
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);
poll.interceptors.response.use(
  response => {
    response = {
      ...response,
    };
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);

/**
 *
 * @param {url, method, data, params} config
 * data   --> post {}
 */
const request = async config => {
  const params = {
    url: config.url,
    method: config.method ?? "get",
    ...(config.method === "get"
      ? { params: config.params }
      : { data: config.data }),
    timeout: 5000,
  };
  try {
    const { data } = await poll(params);
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

export default request;
// const request = async params => {
//   const { url, body, ...rest } = params;
//   const res = await fetch(`${process.env.REACT_APP_API_URL}${params.url}`, {
//     ...rest,
//     body: JSON.stringify(body),
//     credentials: "include",
//     headers: {
//       "content-type": "application/json",
//     },
//   });
//   return res.json();
// };
// export default request;
