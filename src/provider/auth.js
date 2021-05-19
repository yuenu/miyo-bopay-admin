import { createContext, useContext, useReducer } from "react";
export const authContext = createContext();
const authReducer = (prevState, action) => {
  switch (action.type) {
    case "login": {
      action.user.remember &&
        localStorage.setItem("user", JSON.stringify({ ...action.user }));
      action.user.remember ||
        sessionStorage.setItem("user", JSON.stringify({ ...action.user }));
      return {
        ...prevState,
        user: {
          ...action.user,
        },
      };
    }
    case "logout": {
      localStorage.removeItem("user");
      sessionStorage.removeItem("user");
      return {
        ...prevState,
        user: {
          token: null,
        },
      };
    }
    default: {
      throw new Error(`unknow auth type ${action.type}`);
    }
  }
};
export const useAuthProvider = () => {
  const [state, dispatch] = useReducer(authReducer, {
    user: JSON.parse(
      localStorage.getItem("user") || sessionStorage.getItem("user") || "{}",
    ),
  });
  return { state, dispatch };
};
export const useAuth = () => {
  return useContext(authContext);
};
