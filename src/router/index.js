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
  {
    path: "/Role",
    component: () => getComponent("Role"),
  },
  {
    path: "/RolePerm/:id",
    component: () => getComponent("Role/EditPerm"),
  },
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
    path: "/Gateway1",
    component: () => getComponent("Gateway/indexType1"),
  },
  {
    path: "/Gateway2",
    component: () => getComponent("Gateway/indexType2"),
  },
  {
    path: "/Gateway3",
    component: () => getComponent("Gateway/indexType3"),
  },
  {
    path: "/SortTable",
    component: () => getComponent("Gateway/SortTable"),
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
