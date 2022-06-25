import React from "react";
import { MdDone } from "react-icons/md";
import { CheckCercle } from "./icons";

export function ChatCard({ user, data, loadChat, isActive }) {
  const timeFormater = (time) => {
    const date = new Date(time);
    return `${date.getHours()}:${date.getMinutes()}`;
  };
  return (
    <div
      className={`${
        isActive ? "bg-blue-700 shadow-md" : "bg-white"
      }  rounded-lg p-2 my-2 cursor-pointer transition-colors`}
      onClick={() => loadChat(data._id)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div
            className={`w-2 h-2 ${
              data.receiver.login ? "bg-red-400" : "bg-transparent"
            } rounded-full`}
          ></div>
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img
              src={data.receiver.profile_img}
              className="object-cover h-8 w-8"
              alt={`${data.receiver.name} profile pic`}
            />
          </div>
          <div>
            <div
              className={`${
                isActive ? "text-white" : "text-gray-600"
              } font-bold `}
            >
              {data.receiver.name}
            </div>
            <div
              className={`${isActive ? "text-white" : "text-gray-400"} text-xs`}
            >
              {data.receiver.login ? "online" : "offline"}
            </div>
          </div>
        </div>
        {data.lastMsg && (
          <div
            className={`${isActive ? "text-white" : "text-gray-400"} text-xs`}
          >
            {timeFormater(data.lastMsg.send_Date)}
          </div>
        )}
      </div>
      <div className="flex flex-row items-start justify-between px-4 py-2">
        <div className={`${isActive ? "text-white" : "text-gray-500"} text-xs`}>
          {data.lastMsg
            ? data.lastMsg.sender === user._id
              ? `You: ${data.lastMsg.body}`
              : data.lastMsg.body
            : `Say hi to ${data.receiver.name}`}
        </div>
        {data.lastMsg && (
          <CheckCercle
            status={data.lastMsg.status}
            img={data.receiver.profile_img}
            isActive={isActive}
          />
        )}
      </div>
    </div>
  );
}
