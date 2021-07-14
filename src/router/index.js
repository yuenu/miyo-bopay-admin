const getComponent = name => {
  try {
    let cpn = require(`@/views/${name}`);
    return cpn.default();
  } catch (e) {
    console.log(e);
  }
};
const routes = [
  {
    path: "/",
    name: "User",
    component: () => getComponent("User"),
    exact: true,
    displayName: "职员管理",
  },
  {
    path: "/Role",
    name: "Role",
    component: () => getComponent("Role"),
    displayName: "角色管理",
  },
  {
    path: "/RolePerm/:id",
    name: "RolePerm",
    component: () => getComponent("Role/EditPerm"),
    displayName: "权限设置",
  },
  {
    path: "/Developer",
    name: "Developer",
    component: () => getComponent("Developer"),
    displayName: "商户管理",
  },
  {
    path: "/AppUser",
    name: "AppUser",
    component: () => getComponent("AppUser"),
    displayName: "App用户管理",
  },
  {
    path: "/App",
    name: "App",
    component: () => getComponent("App"),
    displayName: "App管理",
  },
  {
    path: "/Gateway",
    name: "Gateway",
    component: () => getComponent("Gateway"),
    displayName: "商户管理",
  },
  {
    path: "/Gateway1",
    name: "Gateway1",
    component: () => getComponent("Gateway/indexType1"),
    displayName: "银行卡管理",
  },
  {
    path: "/Gateway2",
    name: "Gateway2",
    component: () => getComponent("Gateway/indexType2"),
    displayName: "第三方支付",
  },
  {
    path: "/Gateway3",
    name: "Gateway3",
    component: () => getComponent("Gateway/indexType3"),
    displayName: "第三方代付",
  },
  {
    path: "/Gateway4",
    name: "Gateway4",
    component: () => getComponent("Gateway/indexPaytype4"),
    displayName: "加密货币支付",
  },
  {
    path: "/Order",
    name: "Order",
    component: () => getComponent("Order"),
    displayName: "支付订单",
  },
  {
    path: "/CryptoWallet",
    name: "CryptoWallet",
    component: () => getComponent("CryptoWallet"),
    displayName: "钱包管理",
  },
  {
    path: "/CryptoWalletEdit/:id",
    name: "CryptoWalletEdit",
    component: () => getComponent("CryptoWallet/Edit"),
    displayName: "编辑钱包",
  },
  {
    path: "/CryptoAcct",
    name: "CryptoAcct",
    component: () => getComponent("CryptoAcct"),
    displayName: "收款地址管理",
  },
  {
    path: "/CryptoAcctLog",
    name: "CryptoAcctLog",
    component: () => getComponent("CryptoAcct/CryptoAcctLog"),
    displayName: "资金动账记录",
  },
  {
    path: "/Card",
    name: "Card",
    component: () => getComponent("Card"),
    displayName: "银行卡管理",
  },
  {
    path: "/Agent",
    name: "Agent",
    component: () => getComponent("Agent"),
    displayName: "代理管理",
  },
  {
    path: "/LoginLog",
    name: "LoginLog",
    component: () => getComponent("LoginLog"),
    displayName: "登入日志",
  },
  {
    path: "/Audit",
    name: "Audit",
    component: () => getComponent("Audit"),
    displayName: "审计日志",
  },
  {
    path: "/AgentDaily",
    name: "AgentDaily",
    component: () => getComponent("Report/AgentDaily"),
    displayName: "代理日报",
  },
  {
    path: "/DeveloperDaily",
    name: "DeveloperDaily",
    component: () => getComponent("Report/DeveloperDaily"),
    displayName: "开发者日报",
  },
  {
    path: "/OrderDaily",
    name: "OrderDaily",
    component: () => getComponent("Report/OrderDaily"),
    displayName: "订单日报",
  },
  {
    path: "/USDTExchange",
    name: "USDTExchange",
    component: () => getComponent("USDTExchange"),
    displayName: "USDT 汇率设置",
  },
];
export default routes;
