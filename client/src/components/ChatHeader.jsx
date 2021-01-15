import React from "react";
import { useContext } from "react";
import { ChatContext } from "../context";

export function ChatHeader({ receiver }) {
  const { setChat } = useContext(ChatContext);

  return (
    <div className="h-20 px-4 border-b-2 flex flex-row flex-none justify-between items-center relative">
      <div
        className="absolute top-2 right-2 w-4 h-4"
        onClick={() => setChat(null)}
      >
        <svg
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
      <div className="flex flex-row items-center">
        <div className="w-10 h-10 flex-none rounded-full overflow-hidden">
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
        <div className="ml-2">
          <div className="text-lg font-bold text-gray-600">{receiver.name}</div>
          <div className="text-xs text-gray-400">Last seen 1 day ago</div>
        </div>
      </div>
      <div className="cursor-pointer w-10 h-10 rounded-full border flex items-center justify-center">
        <svg
          className="w-6 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
        </svg>
      </div>
    </div>
  );
}
