import React, { useEffect, useState } from "react";
import Routes from "./routes/routes";
import { UserContext, ChatContext, SocketProvider } from "./context";

import ThemeProvide from "./context/ThemeProvide";
function App() {
  useEffect(() => {
    console.log("hello world");
  }, []);

  const [user, setUser] = useState(null);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  // Active chat
  const [chat, setChat] = useState(null);
  const [chatList, setChatList] = useState([]);

  return (
    <ThemeProvide>
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
            chatList,
            setChat,
            setChatList,
          }}
        >
          <SocketProvider user={user}>
            <Routes />
          </SocketProvider>
        </ChatContext.Provider>
      </UserContext.Provider>
    </ThemeProvide>
  );
}

export default App;
