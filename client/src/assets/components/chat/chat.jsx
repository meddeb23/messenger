import React, { useState } from "react";

import io from "socket.io-client";

import { useSelector, useDispatch } from "react-redux";
import ReceiverInfo from "../receiverInfo/ReceiverInfo";
import { receiveMessage } from "../../flux/actions/chatAction";
import axios from "axios";

let socket;

export default function Chat() {
  const ENDPOINT = "http://localhost:5005";
  const dispatch = useDispatch();
  socket = io(ENDPOINT);

  const [values, setValues] = useState("");
  const currentChatDetail = useSelector(
    (state) => state.chat.currentChatDetail
  );
  const messages = useSelector((state) => state.chat.currentChatMsg);
  const user = useSelector((state) => state.user.user);

  socket.on("message", ({ chat_id, user_id, body }) => {
    dispatch(receiveMessage({ chat_id, user_id, body }));
  });

  const sendMessage = (e) => {
    e.preventDefault();
    if (values.length !== 0 && values !== " ") {
      // Headers
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      // Request body
      const body = JSON.stringify({
        body: values,
        chat_id: currentChatDetail.id,
      });
      axios
        .post(`/api/v1/chat/message`, body, config)
        .then((res) => {
          setValues("");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const displayChatName = (chat) => {
    if (chat.sender_id.id === user.id) {
      return chat.receiver_id.first_name + " " + chat.receiver_id.last_name;
    } else {
      return chat.sender_id.first_name + " " + chat.sender_id.last_name;
    }
  };
  const displayTime = (timeString) => {
    let time = timeString.split("T")[1].split(":");
    let date = timeString.split("T")[0].split("-");
    return `${date[1]}-${date[2]}     ${time[0]}:${time[1]}`;
  };
  return (
    <div className="chatSection">
      {currentChatDetail ? (
        <div className="chat">
          <ReceiverInfo
            receiver={
              currentChatDetail.sender_id.id === user.id
                ? currentChatDetail.receiver_id
                : currentChatDetail.sender_id
            }
          />
          {messages.length !== 0 ? (
            <ul>
              {messages.map((msg) => (
                <li
                  key={msg.id}
                  className={
                    msg.sender_id === user.id ? "msgStyle-1" : "msgStyle-2"
                  }
                >
                  <p className="msg"> {msg.body}</p>
                  <small>{displayTime(msg.created_at)}</small>
                </li>
              ))}
            </ul>
          ) : (
            <h4 className="welcomeMsg">
              Say hey to {displayChatName(currentChatDetail)}
            </h4>
          )}
        </div>
      ) : (
        <div className="No-chat">"NO Chat Selected"</div>
      )}
      <div className="chatForm">
        <form onSubmit={(e) => sendMessage(e)}>
          <div className="form-group">
            <input
              onChange={(e) => setValues(e.target.value)}
              type="text"
              name="message"
              className="form-control"
              id="search"
              placeholder="Type something to send..."
              value={values}
            />
          </div>
          <button>
            <i className="fa fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </div>
  );
}
