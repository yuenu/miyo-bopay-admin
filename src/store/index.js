import { configureStore } from "@reduxjs/toolkit";
import layoutReducer from "./slice/layout";
import routerTabReducer from "./slice/routerTab";
import authReducer from "./slice/auth";
import userReducer from "./slice/user";
import developerReducer from "./slice/developer";
import appUserReducer from "./slice/appUser";
import orderReducer from "./slice/order";
import cryptoWalletReducer from "./slice/cryptoWallet";
import cryptoAcctReducer from "./slice/cryptoAcct";
import cryptoAcctLogReducer from "./slice/cryptoAcctLog";
import cardReducer from "./slice/card";
import cardAcctReducer from "./slice/cardAcct";
import cardAcctLogReducer from "./slice/cardAcctLog";
import agentReducer from "./slice/agent";
import loginLogReducer from "./slice/loginLog";
import appReducer from "./slice/app";
import appAcctReducer from "./slice/appAcct";
import appAcctLogReducer from "./slice/appAcctLog";
import gatewayReducer from "./slice/gateway";
import auditReducer from "./slice/audit";
import roleReducer from "./slice/role";
import agentDailyReducer from "./slice/agentDaily";
import developerDailyReducer from "./slice/developerDaily";
import orderDailyReducer from "./slice/orderDaily";
import appDailyReducer from "./slice/appDaily";
import transferAppDailyReducer from "./slice/transferAppDaily";
import gatewayDailyReducer from "./slice/gatewayDaily";
import configReducer from "./slice/config";
import transferReducer from "./slice/transfer";
import transfersAppReducer from "./slice/transfersApp";

export default configureStore({
  reducer: {
    layout: layoutReducer,
    routerTab: routerTabReducer,
    auth: authReducer,
    user: userReducer,
    developer: developerReducer,
    appUser: appUserReducer,
    order: orderReducer,
    cryptoWallet: cryptoWalletReducer,
    cryptoAcct: cryptoAcctReducer,
    cryptoAcctLog: cryptoAcctLogReducer,
    card: cardReducer,
    cardAcct: cardAcctReducer,
    cardAcctLog: cardAcctLogReducer,
    agent: agentReducer,
    loginLog: loginLogReducer,
    app: appReducer,
    appAcct: appAcctReducer,
    appAcctLog: appAcctLogReducer,
    gateway: gatewayReducer,
    audit: auditReducer,
    role: roleReducer,
    agentDaily: agentDailyReducer,
    developerDaily: developerDailyReducer,
    orderDaily: orderDailyReducer,
    appDaily: appDailyReducer,
    transferAppDaily: transferAppDailyReducer,
    gatewayDaily: gatewayDailyReducer,
    config: configReducer,
    transfer: transferReducer,
    transfersApp: transfersAppReducer,
  },
});
