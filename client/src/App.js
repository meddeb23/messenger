import React, { useState, useEffect } from "react";
import Routes from "./routes/routes";
import { UserContext } from "./context";
import { ChatContext } from "./context/ChatContext";

// import io from "socket.io-client";
import socket_client from "./socket";

// let socket;
// const ENDPOINT = "http://localhost:5005";

function App() {
  const [user, setUser] = useState(null);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [chat, setChat] = useState(null);
  const [receiver, setReceiver] = useState(null);
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    socket_client.onReceiveMsg(chat, setChat, chatList, setChatList);
  }, [chat, chatList]);
  useEffect(() => {
    if (user) {
      console.log("auth requet");
      socket_client.ioConnection(user._id);
    }
  }, [user]);

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
        <Routes />
      </ChatContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
