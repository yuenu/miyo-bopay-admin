export const errorCodeMessage = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "没有权限。",
  404: "找不到对象。",
  405: "方法不允许。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  429: "请求太频繁了",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。",
};
export const formLayout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } };
export const mode = { add: "添加", edit: "编辑", approve: "审核" };
export const isActiveLang = val => {
  return val ? "是" : "否";
};

export const OrderStatus = {
  0: "初始化",
  1: "新订单",
  2: "待处理",
  3: "待付款",
  4: "已支付",
  5: "失败",
  6: "过期",
  7: "取消",
  8: "待审核",
  9: "审核通过",
  10: "审核拒绝",
  11: "待通知",
  12: "通知中",
  13: "通知成功",
  14: "通知失败",
  15: "成功",
};

export const WXPayType = {
  0: "微信",
  1: "支付宝",
  2: "网银转账",
  3: "银行卡转账",
  4: "加密货币",
};

export const PayMethod = {
  0: "redirect 跳转收银台",
  1: "qrcode 二维码",
  2: "转账 ",
};

export const Currency = {
  0: "RMB",
  1: "USDT_ERC20",
  2: "USDT_TRC20",
  3: "USDT_OMNI",
  4: "BTC",
  5: "ETH",
};
export const CurrencyFormat = [
  { key: 0, unit: "¥", rate: 100, tofix: 2 },
  { key: 1, unit: "$", rate: 1000000, tofix: 6 },
  { key: 2, unit: "$", rate: 1000000, tofix: 6 },
  { key: 3, unit: "$", rate: 1000000, tofix: 6 },
  { key: 4, unit: "", rate: 0, tofix: 0 },
  { key: 5, unit: "", rate: 0, tofix: 0 },
];
export const isBoolEnum = {
  1: "是",
  0: "否",
};
