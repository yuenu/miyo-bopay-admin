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
    component: () => getComponent("User"),
    exact: true,
  },
  //   {
  //     path: "/Permission",
  //     component: "Permission",
  //   },
  {
    path: "/Developer",
    component: () => getComponent("Developer"),
  },
  {
    path: "/AppUser",
    component: () => getComponent("AppUser"),
  },
  {
    path: "/App",
    component: () => getComponent("App"),
  },
  {
    path: "/Gateway",
    component: () => getComponent("Gateway"),
  },
  {
    path: "/Order",
    component: () => getComponent("Order"),
  },
  {
    path: "/CryptoWallet",
    component: () => getComponent("CryptoWallet"),
  },
  {
    path: "/CryptoWalletEdit/:id",
    component: () => getComponent("CryptoWallet/Edit"),
  },
  {
    path: "/CryptoAcct",
    component: () => getComponent("CryptoAcct"),
  },
  {
    path: "/CryptoAcctLog",
    component: () => getComponent("CryptoAcct/CryptoAcctLog"),
  },
  {
    path: "/Card",
    component: () => getComponent("Card"),
  },
  {
    path: "/Agent",
    component: () => getComponent("Agent"),
  },
  {
    path: "/LoginLog",
    component: () => getComponent("LoginLog"),
  },
  {
    path: "/Audit",
    component: () => getComponent("Audit"),
  },
];
export default routes;
