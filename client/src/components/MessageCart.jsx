import React from "react";
import { useState } from "react";
import { timeFormater } from "../utility/fomat";

export default function MessageCart({ msg, user, receiver }) {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <div
      onClick={() => setShowDetails((value) => !value)}
      onMouseLeave={() => setTimeout(() => setShowDetails(false), 1500)}
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
            msg.sender === user._id ? user.profile_img : receiver.profile_img
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
        {showDetails && (
          <div
            className={
              msg.sender === user._id
                ? "text-xs text-gray-500 pt-2 text-right"
                : "text-xs text-gray-500 pt-2"
            }
          >
            {timeFormater(msg.send_Date)}
          </div>
        )}
      </div>
    </div>
  );
}
