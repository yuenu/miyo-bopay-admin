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
import agentReducer from "./slice/agent";
import loginLogReducer from "./slice/loginLog";
import appReducer from "./slice/app";
import gatewayReducer from "./slice/gateway";
import auditReducer from "./slice/audit";
import roleReducer from "./slice/role";

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
    agent: agentReducer,
    loginLog: loginLogReducer,
    app: appReducer,
    gateway: gatewayReducer,
    audit: auditReducer,
    role: roleReducer,
  },
});
