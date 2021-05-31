const request = async options => {
  const res = await fetch(process.env.REACT_APP_API_URL + options.url, {
    method: options.method,
    body: JSON.stringify(options.data),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const resJson = await res.json();
  return { status: res.status, data: resJson };
};
export default request;
