import React from "react";

export default function Paragraphe({ children, style }) {
  return (
    <p
      style={{ ...style }}
      className="dark:text-gray-300 text-gray-700  text-sm"
    >
      {children}
    </p>
  );
}
