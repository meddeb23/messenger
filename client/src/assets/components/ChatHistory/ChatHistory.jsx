import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getChatHistory, getCurrentChat } from "../../flux/actions/chatAction";

export default function ChatHistory() {
  const dispatch = useDispatch();
  const limit = 10;
  const [offset, setOffset] = useState(0);

  const chats = useSelector((state) => state.chat.chatHistory);
  const loading = useSelector((state) => state.chat.loading);
  useEffect(() => {
    dispatch(getChatHistory(offset, limit));
  }, []);
  return (
    <div className="chatHistory">
      <ul>
        {chats ? (
          chats.map((chat) => (
            <li
              key={chat._id}
              onClick={() => dispatch(getCurrentChat(chat._id))}
            >
              <h4>{chat.receiver.name}</h4>
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
