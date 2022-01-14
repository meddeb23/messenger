import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import io from "socket.io-client";
import { ChatContext } from "../context";

const SocketContext = React.createContext();

// const ENDPOINT = "https://chat-mern-app.herokuapp.com/";
const ENDPOINT = "http://localhost:5005/";

export default function SocketProvider({ user, children }) {
  const [socket, setSocket] = useState();
  const { chat, setChat, chatList, setChatList } = useContext(ChatContext);

  const addMessageToActiveChat = (msg) => {
    // display the msg in the active chat
    if (chat && chat._id === msg.chat) {
      setChat({ ...chat, messages: [...chat.messages, msg] });
    }
  };
  const addMessageToChatList = (msg) => {
    // display the recent chat in the top of the chat history
    const newChatList = chatList.filter((item) => item._id !== msg.chat);
    const activeChat = chatList.find((item) => item._id === msg.chat);
    if (!activeChat) {
      axios
        .get(`/api/v1/chat?limit=0&offset=10`)
        .then((res) => {
          if (res.status === 200) {
            setChatList(res.data);
          }
        })
        .catch((err) => console.log(err));
    } else {
      activeChat.lastMsg = msg;
      newChatList.unshift(activeChat);
      setChatList(newChatList);
    }
  };
  const handleMessageStatusUpdate = (msg) => {
    // display the msg in the active chat
    if (chat && chat._id === msg.chat) {
      let chatMsg = chat.messages;
      chatMsg = chatMsg.filter(
        (i) => !i._id.includes("msg") && i._id !== msg._id
      );
      setChat({ ...chat, messages: [...chatMsg, msg] });
    }
    // display the recent chat in the top of the chat history
    const newChatList = chatList.filter((item) => item._id !== msg.chat);
    const activeChat = chatList.find((item) => item._id === msg.chat);
    if (!activeChat) {
      axios
        .get(`/api/v1/chat?limit=0&offset=10`)
        .then((res) => {
          if (res.status === 200) {
            setChatList(res.data);
          }
        })
        .catch((err) => console.log(err));
    } else {
      activeChat.lastMsg = msg;
      newChatList.unshift(activeChat);
      setChatList(newChatList);
    }
  };
  useEffect(() => {
    console.log("useEffect socket provider");
    if (!user) return;
    console.log("socket connection is ON");
    const newSocket = io(ENDPOINT, { query: { id: user._id, user } });
    setSocket(newSocket);

    return () => {
      console.log("socket connection is OFF");
      newSocket.close();
    };
  }, [user]);
  useEffect(() => {
    if (socket == null) return;
    socket.on("receive_message", (msg) => {
      console.log("receiving a message...");
      addMessageToChatList(msg);
      addMessageToActiveChat(msg);
      socket.emit("update_msg_status", { msg, status: "delivered" });
    });
    socket.on("msg_status_updated", ({ msg }) => {
      console.log(`Update the message status to ${msg.status}`);
      console.log(msg);
      handleMessageStatusUpdate(msg);
    });

    return () => {
      socket.off("receive_message");
      socket.off("msg_status_updated");
    };
  }, [chat, chatList]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
