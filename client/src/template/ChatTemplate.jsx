import React, { useContext } from "react";
import { ChatFooter, ChatHeader } from "../components";
import { UserContext } from "../context";

export function ChatTemplate({ chat }) {
  const { user } = useContext(UserContext);

  const timeFormater = (time) => {
    const date = new Date(time);
    return `${date.getHours()}:${date.getMinutes()}`;
  };

  return (
    <div className="flex flex-col absolute top-0 left-0 h-full w-full md:relative rounded-md bg-white border-2 border-gray-200 flex-auto md:h-auto">
      {chat.receiver && <ChatHeader receiver={chat.receiver} />}

      <div id="chat_body" className=" flex-auto overflow-y-auto ">
        <div className="px-2 py-2 w-full flex flex-col justify-end">
          {/* <div className="w-20 border rounded-full text-center text-sm bg-gray-100 text-gray-500 font-bold py-1 mx-auto my-2">
            18 jun
          </div> */}
          {chat.messages.length !== 0 ? (
            chat.messages.map((msg) => (
              <div
                key={msg._id}
                className={
                  msg.sender === user._id
                    ? "cursor-pointer flex flex-row-reverse items-start"
                    : "cursor-pointer flex flex-row items-start"
                }
              >
                <div className="w-8 h-8 rounded-full overflow-hidden mx-2">
                  {/* <img
                    src="./images/person-1.jpg"
                    className="object-cover"
                    alt=""
                  /> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
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
        </div>
      </div>

      <ChatFooter />
    </div>
  );
}
