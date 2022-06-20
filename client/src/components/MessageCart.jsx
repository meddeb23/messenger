import React from "react";
import { useState } from "react";
import { timeFormater } from "../utility/fomat";

export default function MessageCart({ msg, user, receiver }) {
  const [showDetails, setShowDetails] = useState(false);
  const isUserMessage = msg.sender === user._id;
  return (
    <div
      onClick={() => setShowDetails((value) => !value)}
      onMouseLeave={() => setTimeout(() => setShowDetails(false), 1500)}
      className={
        isUserMessage
          ? `my-2 cursor-pointer flex flex-row-reverse items-start ${
              msg.status === "sending" && "text-red-500"
            }`
          : "my-2 cursor-pointer flex flex-row items-start"
      }
    >
      <div className="w-8 h-8 rounded-full overflow-hidden mx-2">
        <img
          src={isUserMessage ? user.profile_img : receiver.profile_img}
          className="object-cover h-8 w-8"
          alt=""
        />
      </div>
      <div>
        <div
          className={`${
            isUserMessage ? "text-white" : "text-gray-600"
          } rounded-md bg-gray-100 py-1 px-2 `}
          style={{
            background: isUserMessage ? "#4c60f2" : null,
            maxWidth: "16rem",
            width: "fit-content",
          }}
        >
          {msg.body}
        </div>
        {showDetails && (
          <div
            className={
              isUserMessage
                ? "text-xs text-gray-500 pt-2 text-right"
                : "text-xs text-gray-500 pt-2"
            }
          >
            {timeFormater(msg.send_Date)} {msg.status}
          </div>
        )}
      </div>
    </div>
  );
}
