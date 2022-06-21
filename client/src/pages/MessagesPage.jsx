import React, { useContext } from "react";
import { NavBar } from "../components";
import { ChatContext } from "../context";
import { ChatHistory, ChatTemplate } from "../template";
import UserProfileInfo from "../template/UserProfileInfo";

export function MessagesPage() {
  const { chat } = useContext(ChatContext);

  return (
    <>
      <NavBar />
      <ChatHistory />
      {chat && <ChatTemplate chat={chat} />}
      {chat && chat.receiver && <UserProfileInfo receiver={chat.receiver} />}
    </>
  );
}
