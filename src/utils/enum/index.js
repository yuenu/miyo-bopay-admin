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
export const mode = {
  add: "添加",
  edit: "编辑",
  approve: "审核",
  deny: "拒绝",
};
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
  3: "表单提交 ",
};

export const PayStatus = {
  3: "待付款",
  4: "已支付",
};

export const AddrRedirect = {
  0: "",
  1: "https://etherscan.io/address",
  2: "https://tronscan.org/#/address",
  3: "",
  4: "",
  5: "",
};
export const TransRedirect = {
  0: "",
  1: "https://etherscan.io/tx",
  2: "https://tronscan.org/#/transaction",
  3: "",
  4: "",
  5: "",
};

export const Currency = {
  0: "RMB",
  1: "USDT_ERC20",
  2: "USDT_TRC20",
  3: "USDT_OMNI",
  4: "BTC",
  5: "ETH",
  6: "TRX",
};

export const CurrencyFormat = [
  { key: 0, unit: "¥", rate: 100, tofix: 2 },
  { key: 1, unit: "$", rate: 1000000, tofix: 6 },
  { key: 2, unit: "$", rate: 1000000, tofix: 6 },
  { key: 3, unit: "$", rate: 1000000, tofix: 6 },
  { key: 4, unit: "", rate: 0, tofix: 0 },
  { key: 5, unit: "", rate: 0, tofix: 0 },
  { key: 6, unit: "", rate: 0, tofix: 0 },
];

export const IsBoolEnum = {
  1: "是",
  0: "否",
};
export const ApprovalStatus = {
  8: "待审核",
  9: "审核通过",
  10: "审核拒绝",
};
export const NotifyStatus = {
  11: "待通知",
  12: "通知中",
  13: "通知成功",
  14: "通知失败",
};

export const Network = {
  0: "TRX 波场",
  1: "ETH 以太坊",
  2: "BTC",
};

export const DeveloperStatus = {
  0: "审核中",
  1: "审核通过",
  2: "拒绝",
};

export const AppStatus = {
  0: "开发中",
  1: "提审中",
  2: "上线运营",
  3: "停用",
};

export const CryptoAcctLogsType = {
  0: "存款",
  1: "提款",
  2: "活动赠送",
  3: "扣罚",
  4: "其它",
};
export const CryptoAcctLogsStatus = {
  0: "交易未确认",
  1: "交易已确认",
  2: "待绑定",
  3: "已绑定订单",
};

export const ContentType = {
  1: "存款订单",
  2: "提款订单",
  3: "活动对象",
};

export const DirType = {
  0: "转入",
  1: "转出",
};

export const Perms = [
  {
    title: "appacctlog管理",
    key: "appacctlog",
    children: [
      {
        title: "新增appacctlog",
        key: "appacctlog.Create",
      },
      {
        title: "查看appacctlog列表",
        key: "appacctlog.List",
      },
      {
        title: "编辑appacctlog",
        key: "appacctlog.Get",
      },
      {
        title: "删除appacctlog",
        key: "appacctlog.Delete",
      },
      {
        title: "更新appacctlog",
        key: "appacctlog.Update",
      },
    ],
  },
  {
    title: "收款帐户管理",
    key: "cryptoacct",
    children: [
      {
        title: "新增收款帐户",
        key: "cryptoacct.Create",
      },
      {
        title: "查看收款帐户列表",
        key: "cryptoacct.List",
      },
      {
        title: "编辑收款帐户",
        key: "cryptoacct.Get",
      },
      {
        title: "删除收款帐户",
        key: "cryptoacct.Delete",
      },
      {
        title: "更新收款帐户",
        key: "cryptoacct.Update",
      },
      {
        title: "停启用收款帐户",
        key: "cryptoacct.SetActive",
      },
    ],
  },
  {
    title: "订单管理",
    key: "order",
    children: [
      {
        title: "新增订单",
        key: "order.Create",
      },
      {
        title: "查看订单列表",
        key: "order.List",
      },
      {
        title: "编辑订单",
        key: "order.Get",
      },
      {
        title: "删除订单",
        key: "order.Delete",
      },
      {
        title: "更新订单",
        key: "order.Update",
      },
      {
        title: "取消订单",
        key: "order.Cancel",
      },
      {
        title: "审核订单",
        key: "order.Approve",
      },
      {
        title: "拒绝订单",
        key: "order.Deny",
      },
      {
        title: "通知订单",
        key: "order.Notify",
      },
      {
        title: "绑定订单",
        key: "order.Bind",
      },
    ],
  },
  {
    title: "角色管理",
    key: "role",
    children: [
      {
        title: "新增",
        key: "role.Create",
      },
      {
        title: "查看角色列表",
        key: "role.List",
      },
      {
        title: "编辑角色",
        key: "role.Get",
      },
      {
        title: "删除角色",
        key: "role.Delete",
      },
      {
        title: "更新角色",
        key: "role.Update",
      },
      {
        title: "UpdatePerms",
        key: "role.UpdatePerms",
      },
      {
        title: "UserList",
        key: "role.UserList",
      },
    ],
  },
  {
    title: "appacct管理",
    key: "appacct",
    children: [
      {
        title: "新增appacct",
        key: "appacct.Create",
      },
      {
        title: "查看appacct列表",
        key: "appacct.List",
      },
      {
        title: "编辑appacct",
        key: "appacct.Get",
      },
      {
        title: "删除appacct",
        key: "appacct.Delete",
      },
      {
        title: "更新appacct",
        key: "appacct.Update",
      },
    ],
  },
  {
    title: "审计日志管理",
    key: "audit",
    children: [
      {
        title: "新增审计日志",
        key: "audit.Create",
      },
      {
        title: "查看审计日志列表",
        key: "audit.List",
      },
      {
        title: "编辑审计日志",
        key: "audit.Get",
      },
      {
        title: "删除审计日志",
        key: "audit.Delete",
      },
      {
        title: "更新审计日志",
        key: "audit.Update",
      },
    ],
  },
  {
    title: "开发者管理",
    key: "developer",
    children: [
      {
        title: "新增开发者",
        key: "developer.Create",
      },
      {
        title: "查看开发者列表",
        key: "developer.List",
      },
      {
        title: "编辑开发者",
        key: "developer.Get",
      },
      {
        title: "删除开发者",
        key: "developer.Delete",
      },
      {
        title: "更新开发者",
        key: "developer.Update",
      },
    ],
  },
  {
    title: "银行卡帐户日志管理",
    key: "cardacctlog",
    children: [
      {
        title: "新增银行卡帐户日志",
        key: "cardacctlog.Create",
      },
      {
        title: "查看银行卡帐户日志列表",
        key: "cardacctlog.List",
      },
      {
        title: "编辑银行卡帐户日志",
        key: "cardacctlog.Get",
      },
      {
        title: "删除银行卡帐户日志",
        key: "cardacctlog.Delete",
      },
      {
        title: "更新银行卡帐户日志",
        key: "cardacctlog.Update",
      },
    ],
  },
  {
    title: "资金动帐纪录管理",
    key: "cryptoacctlog",
    children: [
      {
        title: "新增资金动帐纪录",
        key: "cryptoacctlog.Create",
      },
      {
        title: "查看资金动帐纪录列表",
        key: "cryptoacctlog.List",
      },
      {
        title: "编辑资金动帐纪录",
        key: "cryptoacctlog.Get",
      },
      {
        title: "删除资金动帐纪录",
        key: "cryptoacctlog.Delete",
      },
      {
        title: "更新资金动帐纪录",
        key: "cryptoacctlog.Update",
      },
    ],
  },
  {
    title: "代付",
    key: "transfer",
    children: [
      {
        title: "创建代付",
        key: "transfer.Create",
      },
      {
        title: "查看代付列表",
        key: "transfer.List",
      },
      {
        title: "查看商户提款列表",
        key: "transfer.ListApp",
      },
      {
        title: "查看代付",
        key: "transfer.Get",
      },
      {
        title: "删除代付",
        key: "transfer.Delete",
      },
      {
        title: "更新代付",
        key: "transfer.Update",
      },
      {
        title: "认领代付/提款",
        key: "transfer.PaidClaim",
      },
      {
        title: "取消认领代付/提款",
        key: "transfer.PaidCancel",
      },
      {
        title: "出款",
        key: "transfer.Paid",
      },
      {
        title: "出款成功",
        key: "transfer.Succeeded",
      },
      {
        title: "出款失败",
        key: "transfer.Failed",
      },
      {
        title: "拒绝出款",
        key: "transfer.Deny",
      },
      {
        title: "回调出款",
        key: "transfer.Notify",
      },
      {
        title: "查看出款网关",
        key: "transfer.Gateway",
      },
      {
        title: "查询出款",
        key: "transfer.Query",
      },
    ],
  },
  {
    title: "代理管理",
    key: "agent",
    children: [
      {
        title: "新增代理",
        key: "agent.Create",
      },
      {
        title: "查看代理列表",
        key: "agent.List",
      },
      {
        title: "编辑代理",
        key: "agent.Get",
      },
      {
        title: "删除代理",
        key: "agent.Delete",
      },
      {
        title: "更新代理",
        key: "agent.Update",
      },
    ],
  },
  {
    title: "代理帐户管理",
    key: "agentacct",
    children: [
      {
        title: "新增代理帐户",
        key: "agentacct.Create",
      },
      {
        title: "查看代理帐户列表",
        key: "agentacct.List",
      },
      {
        title: "编辑代理帐户",
        key: "agentacct.Get",
      },
      {
        title: "删除代理帐户",
        key: "agentacct.Delete",
      },
      {
        title: "更新代理帐户",
        key: "agentacct.Update",
      },
    ],
  },
  {
    title: "代理帐户资金纪录管理",
    key: "agentacctlog",
    children: [
      {
        title: "新增代理帐户资金纪录",
        key: "agentacctlog.Create",
      },
      {
        title: "查看代理帐户资金纪录列表",
        key: "agentacctlog.List",
      },
      {
        title: "编辑代理帐户资金纪录",
        key: "agentacctlog.Get",
      },
      {
        title: "删除代理帐户资金纪录",
        key: "agentacctlog.Delete",
      },
      {
        title: "更新代理帐户资金纪录",
        key: "agentacctlog.Update",
      },
    ],
  },
  {
    title: "银行卡帐户管理",
    key: "cardacct",
    children: [
      {
        title: "新增银行卡帐户",
        key: "cardacct.Create",
      },
      {
        title: "查看银行卡帐户列表",
        key: "cardacct.List",
      },
      {
        title: "编辑银行卡帐户",
        key: "cardacct.Get",
      },
      {
        title: "删除银行卡帐户",
        key: "cardacct.Delete",
      },
      {
        title: "更新",
        key: "cardacct.Update",
      },
    ],
  },
  {
    title: "登入日志管理",
    key: "loginlog",
    children: [
      {
        title: "新增登入日志",
        key: "loginlog.Create",
      },
      {
        title: "查看登入日志列表",
        key: "loginlog.List",
      },
      {
        title: "编辑登入日志",
        key: "loginlog.Get",
      },
      {
        title: "删除登入日志",
        key: "loginlog.Delete",
      },
      {
        title: "更新登入日志",
        key: "loginlog.Update",
      },
    ],
  },
  {
    title: "银行卡管理",
    key: "card",
    children: [
      {
        title: "新增银行卡",
        key: "card.Create",
      },
      {
        title: "查看银行卡列表",
        key: "card.List",
      },
      {
        title: "编辑银行卡",
        key: "card.Get",
      },
      {
        title: "删除银行卡",
        key: "card.Delete",
      },
      {
        title: "更新银行卡",
        key: "card.Update",
      },
    ],
  },
  {
    title: "App管理",
    key: "app",
    children: [
      {
        title: "新增App",
        key: "app.Create",
      },
      {
        title: "查看App列表",
        key: "app.List",
      },
      {
        title: "编辑App",
        key: "app.Get",
      },
      {
        title: "删除App",
        key: "app.Delete",
      },
      {
        title: "更新App",
        key: "app.Update",
      },
    ],
  },
  {
    title: "商户管理",
    key: "gateway",
    children: [
      {
        title: "新增商户",
        key: "gateway.Create",
      },
      {
        title: "查看商户列表",
        key: "gateway.List",
      },
      {
        title: "编辑商户",
        key: "gateway.Get",
      },
      {
        title: "删除商户",
        key: "gateway.Delete",
      },
      {
        title: "更新商户",
        key: "gateway.Update",
      },
    ],
  },
  {
    title: "用户管理",
    key: "user",
    children: [
      {
        title: "新增用户",
        key: "user.Create",
      },
      {
        title: "查看用户列表",
        key: "user.List",
      },
      {
        title: "编辑用户",
        key: "user.Get",
      },
      {
        title: "删除用户",
        key: "user.Delete",
      },
      {
        title: "更新用户",
        key: "user.Update",
      },
    ],
  },
  {
    title: "加密钱包管理",
    key: "cryptowallet",
    children: [
      {
        title: "新增加密钱包",
        key: "cryptowallet.Create",
      },
      {
        title: "查看加密钱包列表",
        key: "cryptowallet.List",
      },
      {
        title: "编辑加密钱包",
        key: "cryptowallet.Get",
      },
      {
        title: "删除加密钱包",
        key: "cryptowallet.Delete",
      },
      {
        title: "更新加密钱包",
        key: "cryptowallet.Update",
      },
    ],
  },
  {
    title: "白名单管理",
    key: "whitelist",
    children: [
      {
        title: "新增代理白名单",
        key: "agentwhitelist.Create",
      },
      {
        title: "查看代理白名单列表",
        key: "agentwhitelist.List",
      },
      {
        title: "删除代理白名单",
        key: "agentwhitelist.Delete",
      },
      {
        title: "新增商户白名单",
        key: "developerwhitelist.Create",
      },
      {
        title: "查看商户白名单列表",
        key: "developerwhitelist.List",
      },
      {
        title: "删除商户白名单",
        key: "developerwhitelist.Delete",
      },
    ],
  },
];

export const transferStatus = {
  0: "初始化代付",
  1: "下单失败",
  2: "待认领",
  3: "已认领待审核",
  4: "代付审核中",
  5: "代付已审核",
  6: "代付审核拒绝",
  7: "已经认领待出款",
  8: "出款中",
  9: "出款成功",
  10: "出款失败",
  11: "出款订单过期",
  12: "出款订单取消",
  13: "出款待回调",
  14: "出款回调中",
  15: "出款回调成功",
  16: "出款回调失败",
  17: "第三方代付失败",
};

export const CardStatus = {
  0: "审核中",
  1: "启用中",
  2: "冻结",
  3: "已达到当日上限制",
};

export const CardDirection = { 0: "收入", 1: "支出" };

export const AmountType = {
  0: "任意金额",
  1: "固定金额",
};
export const TransfersCategory = {
  0: "用户代付订单",
  1: "商户提款订单",
};

export const AppAcctLogType = {
  0: "用户存款",
  1: "申请提款",
  2: "提款成功",
  3: "提款失败",
  4: "其他",
};

export const AgentAcctLogType = {
  0: "其他",
  1: "代付出帐",
  2: "代付入帐",
  3: "代付手续费",
  4: "代收入帐",
  5: "代收出帐",
  6: "代收分润",
};
