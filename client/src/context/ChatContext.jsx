import { createContext } from "react";

export const ChatContext = createContext({
  chat: {},
  chatList: [],
  setChat: () => {},
  setChatList: () => {},
});
