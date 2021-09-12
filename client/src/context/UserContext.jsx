import { createContext } from "react";

export const UserContext = createContext({
  user: {},
  isLoggedin: false,
  isAdmin: false,
  setUser: () => {},
  setIsLoggedin: () => {},
  setIsAdmin: () => {},
});
