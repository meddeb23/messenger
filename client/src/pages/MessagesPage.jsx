import React, { useContext } from "react";
import { NavBar } from "../components";
import { ChatContext } from "../context";
import { ChatHistory, ChatTemplate } from "../template";

export function MessagesPage() {
  const { chat } = useContext(ChatContext);

  return (
    <>
      <NavBar />
      <ChatHistory />
      {chat && <ChatTemplate chat={chat} />}
    </>
  );
}
