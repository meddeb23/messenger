import React from "react";

export function ChatCard({ user, data, loadChat, isActive }) {
  const timeFormater = (time) => {
    const date = new Date(time);
    return `${date.getHours()}:${date.getMinutes()}`;
  };
  return (
    <div
      className={`${
        isActive ? "bg-blue-700" : "bg-white"
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
        <div className="w-4 h-4 text-gray-400">
          {data.lastMsg ? (
            data.lastMsg.status === "sending" ? (
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
                  d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ) : null
          ) : null}
        </div>
      </div>
    </div>
  );
}
