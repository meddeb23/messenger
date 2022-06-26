import React from "react";
import { useContext } from "react";
import { ChatContext } from "../context";
import Heading from "./Heading";
import { HiDotsHorizontal, HiX } from "react-icons/hi";

export function ChatHeader({ receiver }) {
  const { setChat } = useContext(ChatContext);

  return (
    <div className="h-16 px-4 flex flex-row flex-none justify-between items-center relative mb-2 header_box  ">
      <div className="flex flex-row items-center">
        <div className="w-10 h-10 flex-none rounded-full overflow-hidden">
          <img
            src={receiver.profile_img}
            className="object-cover h-10 w-10"
            alt=""
          />
        </div>
        <div className="ml-2 ">
          <Heading>{receiver.name}</Heading>
          <div className="text-xs text-gray-400">Last seen 1 day ago</div>
        </div>
      </div>
      <div className="space-x-2 flex flex-row items-center">
        <div className="cursor-pointer w-8 h-8 rounded-full border flex items-center justify-center text-gray-500 dark:text-gray-100">
          <HiDotsHorizontal size={16} />
        </div>
        <div
          className="cursor-pointer w-8 h-8 rounded-full border flex items-center justify-center dark:text-gray-100"
          onClick={() => setChat(null)}
        >
          <HiX size={16} />
        </div>
      </div>
    </div>
  );
}
