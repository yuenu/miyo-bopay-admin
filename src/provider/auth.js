import { createContext, useContext, useReducer } from "react";
export const authContext = createContext();
const authReducer = (prevState, action) => {
  switch (action.type) {
    case "login":
      return {
        ...prevState,
        token: action.token,
      };
    case "logout":
      return {
        ...prevState,
        token: null,
      };
    default: {
      throw new Error(`unknow auth type ${action.type}`);
    }
  }
};
export const useAuthProvider = () => {
  const [state, dispatch] = useReducer(authReducer, {
    token: null,
  });
  return { state, dispatch };
};
export const useAuth = () => {
  return useContext(authContext);
};
