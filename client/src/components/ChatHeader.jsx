import React from "react";
import { useContext } from "react";
import { ChatContext } from "../context";

export function ChatHeader({ receiver }) {
  const { setChat } = useContext(ChatContext);

  return (
    <div className="h-20 px-4 border-b-2 flex flex-row flex-none justify-between items-center relative">
      <div className="flex flex-row items-center">
        <div className="w-10 h-10 flex-none rounded-full overflow-hidden">
          <img
            src={receiver.profile_img}
            className="object-cover h-10 w-10"
            alt=""
          />
        </div>
        <div className="ml-2">
          <div className="text-lg font-bold text-gray-600">{receiver.name}</div>
          <div className="text-xs text-gray-400">Last seen 1 day ago</div>
        </div>
      </div>
      <div className="space-x-2 flex flex-row items-center">
        <div className="cursor-pointer w-8 h-8 rounded-full border flex items-center justify-center">
          <svg
            className="w-5 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
          </svg>
        </div>
        <div
          className="cursor-pointer w-8 h-8 rounded-full border flex items-center justify-center"
          onClick={() => setChat(null)}
        >
          <svg
            className="w-4 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
