import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getChatHistory, getCurrentChat } from "../../flux/actions/chatAction";

export default function ChatHistory() {
  const dispatch = useDispatch();
  const limit = 10;
  const [offset, setOffset] = useState(0);

  const chats = useSelector((state) => state.chat.chatHistory);
  const user = useSelector((state) => state.user.user);

  const loading = useSelector((state) => state.chat.loading);

  const displayChatName = (chat) => {
    if (chat.sender_id.id === user.id) {
      return chat.receiver_id.first_name + " " + chat.receiver_id.last_name;
    } else {
      return chat.sender_id.first_name + " " + chat.sender_id.last_name;
    }
  };

  useEffect(() => {
    dispatch(getChatHistory(offset, limit));
  }, []);

  return (
    <div className="chatHistory">
      <ul>
        {chats ? (
          chats.map((chat) => (
            <li key={chat.id} onClick={() => dispatch(getCurrentChat(chat.id))}>
              <h4>{displayChatName(chat)}</h4>
              <p>fache ta3mil</p>
            </li>
          ))
        ) : loading ? (
          <h4>loading...</h4>
        ) : (
          <h4 className="error">No Chats</h4>
        )}
      </ul>
    </div>
  );
}
