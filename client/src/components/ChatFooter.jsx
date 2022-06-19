import axios from "axios";
import React, { useContext, useState } from "react";
import { ChatContext, UserContext } from "../context";

export function ChatFooter() {
  const [msg, setMsg] = useState("");
  const { chat, setChat } = useContext(ChatContext);
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
      setChat({ ...chat, messages: [...chat.messages, obj] });
      setMsg("");
      const res = await axios.post("/api/v1/chat/message", obj);
      if (res.status === 201) {
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

  return (
    <form className="flex flex-row items-center space-x-4 h-14 px-2 mt-2 _box">
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
        className="flex-auto outline-none bg-transparent"
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
      <svg
        className=" cursor-pointer w-6 text-gray-500"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
      </svg>
      <button
        type="submit"
        style={{ backgroundColor: "#4c60f2" }}
        className="outline-none cursor-pointer w-10 h-10 shadow-lg rounded-full border flex flex-none items-center justify-center"
        onClick={(e) => onSendMsg(e)}
      >
        <svg
          className="w-5 text-white rotate-90 transform"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
        </svg>
      </button>
    </form>
  );
}
