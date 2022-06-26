import axios from "axios";
import React, { useContext, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { MdSend } from "react-icons/md";
import { ChatContext, UserContext } from "../context";

export function ChatFooter() {
  const [msg, setMsg] = useState("");
  const { chat, setChat, chatList, setChatList } = useContext(ChatContext);
  const { user } = useContext(UserContext);
  const onSendMsg = async (e) => {
    e.preventDefault();
    if (msg.length === 0) return;
    try {
      const obj = {
        _id: "msg" + Math.floor(Math.random() * 10000),
        chat_id: chat._id,
        body: msg,
        sender: user._id,
        send_Date: Date.now(),
        status: "sending",
      };
      // setChat({ ...chat, messages: [...chat.messages, obj] });
      setMsg("");
      const { status, data } = await axios.post("/api/v1/chat/message", obj);
      if (status === 203) {
        const messages = [...chat.messages, data.message];
        // messages[chat.messages.length - 1] = data.message;
        setChat({ ...chat, messages: messages });
        addMessageToChatList(data.message);
        // display the recent chat in the top of the chat history
        // const newChatList = chatList.filter((item) => item._id !== chat._id);
        // const activeChat = chatList.find((item) => item._id === chat._id);
        // activeChat.lastMsg = res.data;
        // newChatList.unshift(activeChat);
        // setChatList(newChatList);
        console.log("msg saved");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addMessageToChatList = (msg) => {
    // display the recent chat in the top of the chat history
    const newChatList = chatList.filter((item) => item._id !== msg.chat);
    const activeChat = chatList.find((item) => item._id === msg.chat);
    activeChat.lastMsg = msg;
    newChatList.unshift(activeChat);
    setChatList(newChatList);
  };

  return (
    <form className="dark:bg-accentdarkgray flex flex-row items-center space-x-4 h-14 px-2 mt-2 _box">
      <div className="hidden md:flex cursor-pointer w-8 h-8 rounded-full border  items-center justify-center">
        <svg
          className="w-4 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <input
        type="text"
        placeholder="write a message"
        className="flex-auto outline-none bg-transparent dark:text-gray-100"
        onChange={(e) => setMsg(e.target.value)}
        value={msg}
      />

      <div className="hidden md:flex  cursor-pointer w-8 h-8 rounded-full border  items-center justify-center">
        <svg
          className="hidden md:block w-4 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
          />
        </svg>
      </div>
      <HiDotsVertical
        size={18}
        className="cursor-pointertext-gray-500 dark:text-gray-50"
      />

      <button
        type="submit"
        style={{ backgroundColor: "#4c60f2" }}
        className="outline-none cursor-pointer w-10 h-10 shadow-lg rounded-full flex flex-none items-center justify-center text-white"
        onClick={(e) => onSendMsg(e)}
      >
        <MdSend size={18} />
      </button>
    </form>
  );
}
