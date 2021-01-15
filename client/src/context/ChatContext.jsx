import react, { createContext } from "react";

export const ChatContext = createContext({
  chat: {},
  receiver: {},
  chatList: [],
  setChat: () => {},
  setReceiver: () => {},
  setChatList: () => {},
});
