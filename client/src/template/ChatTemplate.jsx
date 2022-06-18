import React, { useContext } from "react";
import { ChatFooter, ChatHeader, MessageCart } from "../components";
import { UserContext } from "../context";
import ScrollToBottom from "react-scroll-to-bottom";

export function ChatTemplate({ chat }) {
  const { user } = useContext(UserContext);

  return (
    <div className="flex flex-col absolute z-40 md:z-20 top-0 left-0 h-full w-full md:w-auto md:relative rounded-md bg-white border-none md:border-2 border-gray-200 flex-auto md:h-auto">
      {chat.receiver && <ChatHeader receiver={chat.receiver} />}

      <div
        id="chat_body"
        style={{ height: "calc(100vh - 11rem)" }}
        className=" flex-auto"
      >
        <ScrollToBottom className="w-full h-full">
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
