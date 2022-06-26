import React from "react";
import { MdCheckCircle, MdCheckCircleOutline } from "react-icons/md";

export default function CheckCercle({ status, img, isActive }) {
  return status !== "seen" ? (
    <div
      style={{
        fontSize: "16px",
        color: isActive ? "#fff" : "#9ca3af",
      }}
    >
      {status === "delivered" ? <MdCheckCircle /> : <MdCheckCircleOutline />}
    </div>
  ) : (
    <img src={img} className="inline-block w-4 h-4 rounded-full object-cover" />
  );
}
