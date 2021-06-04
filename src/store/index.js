import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/auth";
import userReducer from "./slice/user";
import developerReducer from "./slice/developer";
import appUserReducer from "./slice/developer";
import orderReducer from "./slice/order";
import cryptoWalletReducer from "./slice/cryptoWallet";
import cardReducer from "./slice/card";
import agentReducer from "./slice/agent";
import loginLogReducer from "./slice/loginLog";

export default configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    developer: developerReducer,
    appUser: appUserReducer,
    order: orderReducer,
    cryptoWallet: cryptoWalletReducer,
    card: cardReducer,
    agent: agentReducer,
    loginLog: loginLogReducer,
  },
});
