import React, { useContext } from "react";
import { ChatFooter, ChatHeader, MessageCart } from "../components";
import { UserContext } from "../context";
import ScrollToBottom from "react-scroll-to-bottom";
import { SocketContext } from "../utility/SocketProvider";
import { useEffect } from "react";

export function ChatTemplate({ chat }) {
  const { user } = useContext(UserContext);
  const socket = useContext(SocketContext);
  useEffect(() => {
    const size = chat.messages.length;
    if (size !== 0) {
      const msg = chat.messages[size - 1];
      if (msg.status !== "seen" && msg.sender !== user._id) {
        // console.log("req update status to seen");
        msg.status = "seen";
        socket.emit("update_msg_status", {
          messages: [msg],
          status: "seen",
          _id: user._id,
        });
      }
    }
  }, [chat]);

  return (
    <div className="flex flex-col bg-gray-100 absolute z-40 md:z-20 top-0 left-0 h-full w-full md:w-auto md:relative rounded-md border-none md:border-2 border-gray-200 flex-auto md:h-auto">
      {chat.receiver && <ChatHeader receiver={chat.receiver} />}

      <div
        id="chat_body"
        style={{ height: "calc(100vh - 11rem)" }}
        className=" flex-auto rounded-lg bg-white"
      >
        <ScrollToBottom on className="w-full h-full">
          {/* <div className="w-20 border rounded-full text-center text-sm bg-gray-100 text-gray-500 font-bold py-1 mx-auto my-2">
            18 jun
          </div> */}
          {chat.messages.length !== 0 ? (
            chat.messages.map((msg) => (
              <MessageCart
                key={msg._id}
                user={user}
                receiver={chat.receiver}
                msg={msg}
              />
            ))
          ) : (
            <div className="text-center text-smtext-gray-500 font-bold my-2">
              {`Say hi to ${chat.receiver.name}`}
            </div>
          )}
        </ScrollToBottom>
      </div>

      <ChatFooter />
    </div>
  );
}
