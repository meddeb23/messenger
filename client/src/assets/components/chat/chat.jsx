import React from "react";

import io from "socket.io-client";

import { useForm } from "../../utility";
import { useSelector } from "react-redux";
import ReceiverInfo from "../receiverInfo/ReceiverInfo";

let socket;

export default function Chat() {
  const ENDPOINT = "http://localhost:5005";

  socket = io(ENDPOINT);

  const [values, setValues] = useForm({ message: "" });
  const receiver = useSelector((state) => state.user.receiver);
  const currentChat = useSelector((state) => state.chat.currentChat);

  const sendMessage = (e) => {
    e.preventDefault();
    if (values.length !== 0 && values !== " ") {
      socket.emit("send_message", {
        message: values.message,
        chat_id: currentChat.chat._id,
      });
    }
    setValues(e, { message: "" });
  };

  return (
    <div className="chatSection">
      {receiver && <ReceiverInfo receiver={receiver} />}

      <div className="chat">
        {currentChat ? (
          currentChat.messages.length !== 0 ? (
            <h4>their is a message</h4>
          ) : (
            <h4>Say hey to {currentChat.chat.sender.name}</h4>
          )
        ) : (
          "NO Chat Selected"
        )}
      </div>
      <div className="chatForm">
        <form onSubmit={(e) => sendMessage(e)}>
          <div className="form-group">
            <input
              onChange={(e) => setValues(e)}
              type="text"
              name="message"
              className="form-control"
              id="search"
              placeholder="Type something to send..."
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
