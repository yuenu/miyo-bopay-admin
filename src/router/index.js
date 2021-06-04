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
  // {
  //   path: "/AppUser",
  //   component: "AppUser",
  // },
  {
    path: "/Order",
    component: () => getComponent("Order"),
  },
  {
    path: "/CryptoWallet",
    component: () => getComponent("CryptoWallet"),
  },
  // {
  //   path: "/Card",
  //   component: "Card",
  // },
  // {
  //   path: "/Agent",
  //   component: "Agent",
  // },
  // {
  //   path: "/LoginLog",
  //   component: "LoginLog",
  // },
  //   {
  //     path: "/Audit",
  //     component: "Audit",
  //   },
];
export default routes;
