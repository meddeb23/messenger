import React from "react";
import { MdDone } from "react-icons/md";

export default function CheckCercle({ status }) {
  return (
    status !== "seen" && (
      <div
        className={`${
          status === "delivered" ? "bg-gray-400 text-white" : "text-gray-400"
        } w-4 h-4 rounded-full flex justify-center items-center border`}
      >
        <MdDone size={12} />
      </div>
    )
  );
}
