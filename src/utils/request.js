const request = async options => {
  const res = await fetch(process.env.REACT_APP_API_URL + options.url, {
    method: options.method,
    body: JSON.stringify(options.data),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      // "User-Agent":
      //   "Mozilla/5.0 (Linux; Android 8.0.0; SM-G960F Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.84 Mobile Safari/537.36",
      // Origin: "iyes.dev",
    },
    withCredentials: true,
  });

  const resJson = await res.json();
  return resJson;
};
export default request;
