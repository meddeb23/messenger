import axios from "axios";
import React, { useRef } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { ChatContext } from "../context";

export default function ScrollToBottom({ children }) {
  const { setChat, chat } = useContext(ChatContext);
  const containerRef = useRef(null);

  const requestMoreMessages = async (e) => {
    if (e.target.scrollTop === 0) {
      console.log("more messages");
      try {
        const { data, status } = await axios.get(
          `/api/v1/chat/${chat._id}?page=${chat.page + 1}`
        );
        if (status === 200) {
          const newChat = { ...data };
          newChat.messages = [...newChat.messages, ...chat.messages];
          setChat(newChat);
        }
      } catch (error) {
        console.log(error.response);
      }
    }
  };

  useEffect(() => {
    console.log("new", containerRef.current);
    containerRef.current.scroll(0, containerRef.current.scrollHeight);
    if (chat.nextPage) {
      containerRef.current.addEventListener("scroll", requestMoreMessages);
    }
    return () => {
      console.log("clearing subs");
      containerRef.current.removeEventListener("scroll", requestMoreMessages);
    };
  }, [chat]);
  return (
    <div
      ref={containerRef}
      style={{ height: "inherit" }}
      className="overflow-x-hidden"
    >
      {children}
    </div>
  );
}
