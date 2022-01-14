import React, { useContext } from "react";
import { ChatFooter, ChatHeader } from "../components";
import { UserContext } from "../context";
import ScrollToBottom from "react-scroll-to-bottom";

export function ChatTemplate({ chat }) {
  const { user } = useContext(UserContext);

  const timeFormater = (time) => {
    const date = new Date(time);
    return `${date.getHours()}:${date.getMinutes()}`;
  };

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
              <div
                key={msg._id}
                className={
                  msg.sender === user._id
                    ? `my-2 cursor-pointer flex flex-row-reverse items-start ${
                        msg.status === "sending" && "text-red-500"
                      }`
                    : "my-2 cursor-pointer flex flex-row items-start"
                }
              >
                <div className="w-8 h-8 rounded-full overflow-hidden mx-2">
                  <img
                    src={
                      msg.sender === user._id
                        ? user.profile_img
                        : chat.receiver.profile_img
                    }
                    className="object-cover h-8 w-8"
                    alt=""
                  />
                </div>
                <div>
                  <div
                    className="border rounded-md bg-gray-100 text-gray-400 py-1 px-2 "
                    style={{ maxWidth: "16rem", width: "fit-content" }}
                  >
                    {msg.body}
                  </div>
                  <div
                    className={
                      msg.sender === user._id
                        ? "text-xs text-gray-500 pt-2 text-right"
                        : "text-xs text-gray-500 pt-2"
                    }
                    style={{ display: "none" }}
                  >
                    {timeFormater(msg.send_Date)}
                  </div>
                </div>
              </div>
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
