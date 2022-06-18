import React, { useState } from "react";
import Routes from "./routes/routes";
import { UserContext } from "./context";
import { ChatContext } from "./context/ChatContext";

import SocketProvider from "./utility/SocketProvider";
function App() {
  const [user, setUser] = useState(null);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  // Active chat
  const [chat, setChat] = useState(null);
  const [receiver, setReceiver] = useState(null);
  const [chatList, setChatList] = useState([]);

  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedin,
        isAdmin,
        setUser,
        setIsLoggedin,
        setIsAdmin,
      }}
    >
      <ChatContext.Provider
        value={{
          chat,
          receiver,
          chatList,
          setChat,
          setReceiver,
          setChatList,
        }}
      >
        <SocketProvider user={user}>
          <Routes />
        </SocketProvider>
      </ChatContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
