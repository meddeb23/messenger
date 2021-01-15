import React from "react";

export function ChatCard({ user, data, loadChat }) {
  const timeFormater = (time) => {
    const date = new Date(time);
    return `${date.getHours()}:${date.getMinutes()}`;
  };
  return (
    <div
      className="bg-white rounded-lg p-2 my-2 cursor-pointer"
      onClick={() => loadChat(data._id)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-red-400 rounded-full"></div>
          <div className="w-8 h-8 rounded-full overflow-hidden">
            {/* <img src="./images/person-1.jpg" className="object-cover" alt="" /> */}
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
            <div className="font-bold text-gray-600">{data.receiver.name}</div>
            <div className="text-xs text-gray-400">online</div>
          </div>
        </div>
        {data.lastMsg && (
          <div className="text-xs text-gray-400">
            {timeFormater(data.lastMsg.send_Date)}
          </div>
        )}
      </div>
      <div className="flex flex-row items-start justify-between px-4 py-2">
        <div className="text-xs text-gray-500 ">
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
