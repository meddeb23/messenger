import React from "react";
import { MdDone } from "react-icons/md";

export default function CheckCercle({ status, img, isActive }) {
  return status !== "seen" ? (
    <div
      style={{
        backgroundColor:
          status === "delivered"
            ? isActive
              ? "#fff"
              : "#9ca3af"
            : "transparent",
        borderColor: isActive ? "#fff" : "#9ca3af",
        color:
          status === "delivered"
            ? isActive
              ? "#1d4ed8"
              : "#fff"
            : isActive
            ? "#fff"
            : "#9ca3af",
      }}
      className="w-4 h-4 rounded-full flex justify-center items-center border"
    >
      <MdDone size={12} />
    </div>
  ) : (
    <img src={img} className="inline-block w-4 h-4 rounded-full object-cover" />
  );
}
